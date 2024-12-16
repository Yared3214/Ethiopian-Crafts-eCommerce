import { cn } from "@/lib/utils";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  imageSrc,
  slug,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  imageSrc?: string;
  slug?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {/* {header} */}
      {imageSrc && (
        <div
          className={cn(
            "relative w-full h-40 rounded-lg overflow-hidden",
            className
          )}
        >
          <img
            src={imageSrc}
            alt={typeof title === "string" ? title : "Bento Grid Item"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <Link href={`/blog/${slug}`}>
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold line-clamp-1 text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal line-clamp-2 text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
      </Link>
    </div>
  );
};
