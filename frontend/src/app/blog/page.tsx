import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const BlogPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto p-6 rounded-lg">
        <h1 className="text-5xl font-extrabold text-center text-yellow-600 mb-8">
          Ethiopian Crafts Blog
        </h1>
        <p className="text-lg text-center text-gray-700 leading-relaxed mb-12">
          Discover the vibrant traditions and stories behind Ethiopian crafts and artisans.
          Dive into cultural practices, festivals, artisan highlights, and hands-on tutorials to explore the richness of Ethiopian heritage.
        </p>
{/* 
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-yellow-600 text-center mb-6">
            Explore by Category
          </h2>
          <ul className="flex flex-wrap justify-center gap-6">
            <li className="bg-yellow-100 hover:bg-yellow-200 transition-all duration-300 shadow-md rounded-lg px-6 py-3 text-yellow-800 text-lg font-medium cursor-pointer">
              Traditions
            </li>
            <li className="bg-yellow-100 hover:bg-yellow-200 transition-all duration-300 shadow-md rounded-lg px-6 py-3 text-yellow-800 text-lg font-medium cursor-pointer">
              Festivals
            </li>
            <li className="bg-yellow-100 hover:bg-yellow-200 transition-all duration-300 shadow-md rounded-lg px-6 py-3 text-yellow-800 text-lg font-medium cursor-pointer">
              Artisans
            </li>
            <li className="bg-yellow-100 hover:bg-yellow-200 transition-all duration-300 shadow-md rounded-lg px-6 py-3 text-yellow-800 text-lg font-medium cursor-pointer">
              Tutorials
            </li>
          </ul>
        </div> */}
      </div>
      <BentoGrid className="max-w-4xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            imageSrc={item.imageSrc}
            slug={item.slug}
            icon={item.icon}
            className={i !== 0 && i % 3 === 0 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);


const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg",
    slug: "dawn-of-innovation",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    slug: "digital-revolution",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg",
    slug: "art-of-design",
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    slug: "power-of-communication",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg",
    slug: "pursuit-of-knowledge",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    slug: "joy-of-creation",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg",
    slug: "spirit-of-adventure",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg",
    slug: "pursuit-of-knowledge",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309773/painting_atkfcf.jpg",
    slug: "joy-of-creation",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    imageSrc: "https://res.cloudinary.com/dso7gnmps/image/upload/v1733309755/jewlery_fektgf.jpg",
    slug: "spirit-of-adventure",
  },
];



export default BlogPage;