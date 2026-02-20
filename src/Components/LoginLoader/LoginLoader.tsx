import { Loader2 } from "lucide-react";
export const LoginLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-100 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/50 shadow-xl border border-white/20">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 stroke-[1.5px]" />

        <div className="space-y-1 text-center">
          <p className="text-lg font-semibold text-gray-900">Please wait</p>
          <p className="text-sm text-muted-foreground animate-pulse">
            Authenticating your credentials...
          </p>
        </div>
      </div>
    </div>
  );
};
