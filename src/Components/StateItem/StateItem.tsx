import type { ReactNode } from "react";

interface State {
  icon: ReactNode;
  value: string;
  label: string;
}
const StatItem = ({ icon, value, label }: State) => (
  <li className="space-y-1">
    <div className="flex gap-2 items-center">
      <span className="text-cyan-300">{icon}</span>
      <span className="text-2xl font-extrabold tracking-tight">{value}</span>
    </div>
    <p className="text-xs opacity-70 font-medium uppercase tracking-widest">
      {label}
    </p>
  </li>
);
export default StatItem;
