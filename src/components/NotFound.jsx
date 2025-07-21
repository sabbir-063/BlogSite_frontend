function NotFound() {
  return (
    <div
      className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 relative"
      style={{ minHeight: 'calc(100vh - 65px)' }}
    >
      <h1 className="text-8xl md:text-9xl font-extrabold text-gray-800 drop-shadow-lg mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-2 text-center">Page Not Found</h2>
      <p className="text-lg md:text-xl text-gray-500 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 font-semibold"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;