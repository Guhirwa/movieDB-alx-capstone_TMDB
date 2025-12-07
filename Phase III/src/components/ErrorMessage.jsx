const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <span className="text-6xl mb-4">😞</span>
      <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Oops! Something went wrong
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        {message || 'Please try again later'}
      </p>
    </div>
  );
};

export default ErrorMessage;
