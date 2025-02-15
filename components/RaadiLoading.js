function RaadiLoading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
            Loading, please wait...
          </p>
        </div>
      );
}

export default RaadiLoading