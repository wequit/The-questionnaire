import Cookies from "js-cookie";

const API_URL = "https://opros.pythonanywhere.com/api/v1";

const username = process.env.NEXT_PUBLIC_API_USERNAME;
const password = process.env.NEXT_PUBLIC_API_PASSWORD;

export interface AuthCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: AuthCredentials): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Ошибка авторизации");
    }

    const data = await response.json();
    const { access, refresh } = data;

    if (access && refresh) {
      Cookies.set("accessToken", access, { expires: 1, sameSite: "Lax" });
      Cookies.set("refreshToken", refresh, { expires: 1, sameSite: "Lax" });
    } else {
      console.error("Не удалось получить токены. Ответ от сервера не содержит access или refresh.");
      throw new Error("Не удалось получить токены");
    }
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
};

export const getAccessToken = (): string | undefined => {
  const token = Cookies.get("accessToken");
  return token;
};

export const getRefreshToken = (): string | undefined => {
  const token = Cookies.get("refreshToken");
  return token;
};

export const clearTokens = (): void => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error("Нет refresh токена для обновления.");
    throw new Error("Нет refresh токена для обновления.");
  }

  try {
    const response = await fetch(`${API_URL}/token/refresh/`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      console.error("Ошибка при обновлении токена. Статус:", response.status);
      throw new Error("Ошибка обновления токена");
    }

    const data = await response.json();
    const { access } = data;

    if (access) {
      Cookies.set("accessToken", access, { expires: 1 });
      return access;
    } else {
      console.error("Ответ сервера не содержит новый access токен.");
      throw new Error("Не удалось обновить токен");
    }
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    return null;
  }
};

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  let accessToken = getAccessToken();

  if (!accessToken) {
    console.warn("Токен не найден, пытаемся выполнить вход...");
    
    const credentials: AuthCredentials = {
      username: process.env.NEXT_PUBLIC_API_USERNAME!,
      password: process.env.NEXT_PUBLIC_API_PASSWORD!,
    };
    
    await login(credentials);
    accessToken = getAccessToken();
  }

  if (!accessToken) {
    console.error("Не удалось получить токен после попытки входа.");
    throw new Error("Не удалось получить токен.");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    console.warn("Токен истек, повторно выполняем вход...");
    const credentials: AuthCredentials = {
      username: process.env.NEXT_PUBLIC_API_USERNAME!,
      password: process.env.NEXT_PUBLIC_API_PASSWORD!,
    };
    await login(credentials);
    accessToken = getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, { ...options, headers });
    } else {
      console.error("Не удалось обновить токен.");
      throw new Error("Не удалось обновить токен.");
    }
  }

  return response;
};
