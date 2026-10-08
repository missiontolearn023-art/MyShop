import { Sparkles } from "lucide-react";

interface BannerProps {
  onShopClick: () => void;
  title?: string;
  subtitle?: string;
  label?: string;
  buttonText?: string;
  imageUrl?: string;
}




export function Banner({
  onShopClick,
  title = "खास ऑफर",
  subtitle = "आपके लिए शानदार ऑफर",
  label = "सीमित समय",
  buttonText = "अभी खरीदें",
  imageUrl,
}: BannerProps) {
  return (
    <div
   className="
  relative overflow-hidden rounded-2xl
  flex-none shrink-0
  w-[320px]
  sm:w-[450px]
  md:w-[550px]
  lg:w-[650px]
"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/70 to-yellow-700/50" />
      </div>

      {/* Content */}
      <div className="relative px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-300" />

          <span className="text-yellow-200 text-xs font-semibold uppercase tracking-wider">
            {label}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-yellow-100">
          {subtitle}
        </p>

        <button
          onClick={onShopClick}
          className="
            mt-2 inline-flex items-center gap-2
            bg-white text-orange-700 font-semibold
            px-5 py-2.5 rounded-xl
            hover:bg-yellow-50
            active:scale-95
            transition-all text-sm shadow-lg
          "
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}