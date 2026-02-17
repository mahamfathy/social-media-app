import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
}
const FeatureItem = ({ icon, title, desc }: Feature) => {
  return (
    <>
      <li className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 hover:bg-white/20 transition-all duration-200 group">
        <div className="size-10 flex justify-center items-center rounded-xl bg-white/10 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-sm leading-none">{title}</h4>
          <span className="text-[11px] opacity-70 uppercase tracking-wider">
            {desc}
          </span>
        </div>
      </li>
    </>
  );
};
export default FeatureItem;
