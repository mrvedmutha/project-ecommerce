export default function ErrorPage({
  status,
  message,
}: {
  status: number;
  message: string;
}) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center bg-white text-black dark:bg-[#111] dark:text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-200">
          {status}
        </h1>
        <div className="border-l h-6 border-gray-300 dark:border-gray-600" />
        <p className="text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}
