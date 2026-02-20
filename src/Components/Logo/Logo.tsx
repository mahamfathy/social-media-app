export const Logo = ({
  textColor = "text-white",
  bgColor = "bg-white/40",
  borderColor = "border-white/30",
}) => {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`size-10 md:size-12 text-lg font-bold flex justify-center items-center rounded-xl backdrop-blur-md border ${bgColor} ${borderColor} ${textColor}`}
      >
        S
      </span>
      <span className={`text-2xl font-bold tracking-tight ${textColor}`}>
        SocialHub
      </span>
    </div>
  );
};
