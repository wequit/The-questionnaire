module.exports = {
    parser: "@typescript-eslint/parser", // Используем парсер для TypeScript
    parserOptions: {
      ecmaVersion: 2021, // Версия ECMAScript
      sourceType: "module", // Используем модули ES
      ecmaFeatures: {
        jsx: true, // Поддержка JSX
      },
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    settings: {
      react: {
        version: "detect", // Автоматическое определение версии React
      },
    },
    plugins: ["@typescript-eslint", "react", "react-hooks", "import", "jsx-a11y"],
    extends: [
      "eslint:recommended", // Базовые правила ESLint
      "plugin:@typescript-eslint/recommended", // Рекомендации для TypeScript
      "plugin:react/recommended", // Рекомендации для React
      "plugin:react-hooks/recommended", // Рекомендации для хуков React
      "plugin:jsx-a11y/recommended", // Доступность
      "plugin:import/recommended", // Импорты
      "plugin:import/typescript", // Импорты TypeScript
      "prettier", // Конфликтующие правила заменяются на Prettier
    ],
    rules: {
      // Пример кастомных правил
      "react/prop-types": "off", // Отключаем, если используете TypeScript
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Игнорируем неиспользуемые переменные, начинающиеся с "_"
      "react/react-in-jsx-scope": "off", // Не требуется в новых версиях React
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  };
  