import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-[#1877f2] tracking-widest">
        404
      </h1>
      <div className="bg-[#f0f2f5] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <div className="mt-8">
        <p className="text-2xl font-semibold md:text-3xl text-slate-800">
          Oops! This page doesn't exist.
        </p>
        <p className="mt-4 mb-8 text-slate-500">
          The link you followed may be broken, or the page may have been
          removed.
        </p>

        <Link
          to="/"
          className="px-8 py-3 font-bold text-white bg-[#1877f2] rounded-lg hover:bg-[#166fe5] transition-all shadow-md active:scale-95 inline-block"
        >
          Go to Home Feed
        </Link>

        <p className="mt-4 text-xs text-slate-400">
          Redirecting to home in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default NotFound;
