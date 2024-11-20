"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const AppleCardsCarousel: React.FC = () => {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    
    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Explore Ethiopian Culture.
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

export default AppleCardsCarousel;

const DummyContent = () => {
    return (
        <>
            {
                [...new Array(3).fill(1)].map((_, index) => {
                    return (
                        <div
                            key={"dummy-content" + index}
                            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                        >
                            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                                Ethiopia is a land of diverse cultures, languages, and traditions. Explore its rich history, ancient art forms, and the beauty of its landscapes.
                                </p>
                            <Image
                                src="https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg"
                                alt="Ethiopian culture mockup"
                                height="300" // Reduced height
                                width="500"
                                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                            />
                        </div>
                    );
                })}
        </>
    );
};

const data = [
    {
        category: "Traditional Art",
        title: "Ethiopian Handwoven Textiles",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent />,
    },
    {
        category: "Music & Dance",
        title: "Traditional Ethiopian Music",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent />,
    },
    {
        category: "Cuisine",
        title: "Taste of Ethiopian Cuisine",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent />,
    },
    {
        category: "History & Heritage",
        title: "The Ancient Ruins of Aksum",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent />,
    },
    {
        category: "Crafts & Artifacts",
        title: "Ethiopian Traditional Artifacts",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent />,
    },
    {
        category: "Festivals",
        title: "Timkat: Ethiopian Epiphany",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent />,
    },
    {
        category: "Architecture",
        title: "Lalibela Rock-Hewn Churches",
        src: "https://www.ephremtube.com/assets/images/ethiopiawinsim/ethiopiawinsim_14.jpg",
        content: <DummyContent />,
    },
];
