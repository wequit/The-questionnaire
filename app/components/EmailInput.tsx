export default function EmailInput({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <div className="mb-4 transition-all duration-500 ease-in-out">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Электронная почта
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <button
        type="button"
        onClick={onNext}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        Далее
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
      >
        Назад
      </button>
    </div>
  );
}
