'use client'

// Import React and Framer Motion
import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScissors, faCoffee, faRing, faBasketShopping } from '@fortawesome/free-solid-svg-icons'; // Import alternative icons
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import AppleCardsCarousel from '@/components/Carousel/carousel'
import { HeroParallax } from "@/components/ui/hero-parallax";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";



const Home: React.FC = () => {


  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);

  const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cursor.png",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/rogue.png",
    },

    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editorially.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/editrix.png",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
    },

    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
    },

    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/invoker.png",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
    },
  ];

  const testimonials = [
    {
      name: "Handwoven Textiles",
      title: "Traditional Ethiopian Weavings",
      image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/ukBdpjyMRidArq0arvhLI.jpg", // Replace with actual image URL
      description:
        "Beautifully handwoven fabrics, showcasing intricate patterns and vibrant colors, representing the diverse cultures across Ethiopia.",
    },
    {
      name: "Ethiopian Pottery",
      title: "Handcrafted Ceramics",
      image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/ukBdpjyMRidArq0arvhLI.jpg", // Replace with actual image URL
      description:
        "Authentic, handmade pottery, each piece uniquely designed, often inspired by traditional Ethiopian motifs and natural elements.",
    },
    {
      name: "Beaded Jewelry",
      title: "Traditional Ethiopian Jewelry",
      image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/ukBdpjyMRidArq0arvhLI.jpg", // Replace with actual image URL
      description:
        "Exquisite beaded jewelry crafted by artisans, representing Ethiopia’s rich cultural heritage, with designs passed down through generations.",
    },
    {
      name: "Ethiopian Carvings",
      title: "Wooden Sculptures and Carvings",
      image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/wGZH4ULoQZthoq3ANZ_b-.jpg", // Replace with actual image URL
      description:
        "Hand-carved wooden sculptures, ranging from religious figures to symbolic animals, showcasing the artistic craftsmanship of Ethiopian artisans.",
    },
    {
      name: "Ethiopian Basketry",
      title: "Handcrafted Baskets",
      image: "https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/wGZH4ULoQZthoq3ANZ_b-.jpg", // Replace with actual image URL
      description:
        "Crafted from natural fibers, these traditional Ethiopian baskets are both functional and decorative, often used in daily life or as home decor.",
    },
  ];



  return (


    <div>
      {/* Hero Section */}

      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Celebrate Ethiopian artistry and cultural heritage.
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Authentic Ethiopian Artistry
          </div>
          <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Shop now
          </button>
        </motion.div>
      </AuroraBackground>


      {/* <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/BMYV5xTrAe_b5ae6vN-1p.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>

        <div className="relative z-10 flex flex-col ml-8 sm:ml-16 md:ml-24 lg:ml-32 pt-12 sm:pt-24 md:pt-32 lg:pt-36 text-white">
          <motion.h1
            className="text-5xl md:text-7xl max-w-2xl mb-4"
            whileInView={{ opacity: [0, 1], y: [-50, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Celebrate Ethiopian Artistry
          </motion.h1>

          <motion.p
            className="max-w-2xl mb-8"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Explore a rich selection of hand-crafted Ethiopian artifacts, made by local artisans, and inspired by centuries of culture and tradition.
          </motion.p>

          <motion.div
            className="flex space-x-4"
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md">
              Shop Now
            </button>
            <button className="bg-transparent border border-white hover:bg-white hover:text-black text-white font-bold py-2 px-6 rounded-md">
              Learn More
            </button>
          </motion.div>
        </div>
      </div> */}

      <HeroParallax products={products} />;


      <div className='mt-10'>
        <AppleCardsCarousel />
      </div>
      {/* 
      <div className="flex flex-col md:flex-row items-center justify-center py-16 bg-[#f8ede3]">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img
            src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/liy3fUWyThnmn-k07Pc_e.jpg"
            alt="Ethiopian Art"
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>

        <motion.div className="w-full md:w-1/2 md:pl-12 pl-10 text-[#5C3D2E] pt-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#8B4513] font-serif">
            Explore Ethiopian Culture
          </h2>

          <ol className="space-y-10 py-8">
            <motion.li
              className="flex items-start"
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex-shrink-0 bg-[#f5e5c1] border border-[#8B4513] text-[#8B4513] font-bold w-10 h-10 flex items-center justify-center rounded-full mr-4">
                1
              </div>
              <div className="flex flex-col">
                <strong className="mb-2 text-lg">Handmade Artifacts</strong>
                <p className="text-base">
                  Beautifully crafted items inspired by rich cultural traditions.
                </p>
              </div>
            </motion.li>

            <motion.li
              className="flex items-start"
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex-shrink-0 bg-[#f5e5c1] border border-[#8B4513] text-[#8B4513] font-bold w-10 h-10 flex items-center justify-center rounded-full mr-4">
                2
              </div>
              <div className="flex flex-col">
                <strong className="mb-2 text-lg">Unique Designs</strong>
                <p className="text-base">
                  Each piece is one of a kind, reflecting the heritage of Ethiopian artisans.
                </p>
              </div>
            </motion.li>

            <motion.li
              className="flex items-start"
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex-shrink-0 bg-[#f5e5c1] border border-[#8B4513] text-[#8B4513] font-bold w-10 h-10 flex items-center justify-center rounded-full mr-4">
                3
              </div>
              <div className="flex flex-col">
                <strong className="mb-2 text-lg">Sustainable Materials</strong>
                <p className="text-base">
                  Eco-friendly products made from locally sourced materials.
                </p>
              </div>
            </motion.li>

            <motion.li
              className="flex items-start"
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex-shrink-0 bg-[#f5e5c1] border border-[#8B4513] text-[#8B4513] font-bold w-10 h-10 flex items-center justify-center rounded-full mr-4">
                4
              </div>
              <div className="flex flex-col">
                <strong className="mb-2 text-lg">Support Local Artisans</strong>
                <p className="text-base">
                  Every purchase directly supports skilled craftsmen and women in Ethiopia.
                </p>
              </div>
            </motion.li>
          </ol>
        </motion.div>
      </div> */}






      {/* <div className="flex justify-center items-center flex-col">
        <h2 className="text-4xl py-4 md:text-5xl text-center font-bold font-serif text-[#5C3D2E]">
          Handmade Treasures: Unique Artisanal Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-lg dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-80 h-auto rounded-lg p-4 border">
              <CardItem
                translateZ="50"
                className="text-lg font-semibold text-neutral-600 dark:text-white"
              >
                Textiles
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-xs mt-2 dark:text-neutral-300"
              >
                Intricate weavings, bold patterns, and soft cotton fabrics.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/ukBdpjyMRidArq0arvhLI.jpg"
                  height="500"
                  width="500"
                  className="h-40 w-full object-cover rounded-lg group-hover/card:shadow-lg"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-lg dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-80 h-auto rounded-lg p-4 border">
              <CardItem
                translateZ="50"
                className="text-lg font-semibold text-neutral-600 dark:text-white"
              >
                Pottery
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-xs mt-2 dark:text-neutral-300"
              >
                Beautifully glazed ceramics, from delicate vases to rustic tableware.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/wGZH4ULoQZthoq3ANZ_b-.jpg"
                  height="500"
                  width="500"
                  className="h-40 w-full object-cover rounded-lg group-hover/card:shadow-lg"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-lg dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-80 h-auto rounded-lg p-4 border">
              <CardItem
                translateZ="50"
                className="text-lg font-semibold text-neutral-600 dark:text-white"
              >
                Jewelry
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-xs mt-2 dark:text-neutral-300"
              >
                Unique metal and beaded designs, crafted with ancient techniques.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <Image
                  src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg"
                  height="500"
                  width="500"
                  className="h-40 w-full object-cover rounded-lg group-hover/card:shadow-lg"
                  alt="thumbnail"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div> */}


      {/* <div className="py-10 ">
        <h2 className="text-4xl py-4 md:text-5xl text-center font-bold mb-10 font-serif text-[#5C3D2E]">
          Handmade Treasures: Unique Artisanal Products
        </h2>

        <div className="flex flex-wrap justify-around space-y-10 sm:space-y-0">
          <motion.div
            className="rounded-lg shadow-lg md:max-w-xs w-full p-6 bg-white border-2 border-[#D09E30] flex flex-col"
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <strong className="text-xl mb-2 font-serif text-[#5C3D2E]">Textiles</strong>
            <p className="text-base font-light italic text-[#5C3D2E] pb-3">
              Intricate weavings, bold patterns, and soft cotton fabrics.
            </p>
            <img
              src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/ukBdpjyMRidArq0arvhLI.jpg"
              alt="Textiles"
              className="w-full h-40 object-cover rounded-md"
            />
          </motion.div>

          <motion.div
            className="rounded-lg shadow-lg md:max-w-xs w-full p-6 bg-white border-2 border-[#D09E30] flex flex-col"
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <strong className="text-xl mb-2 font-serif text-[#5C3D2E]">Pottery</strong>
            <p className="text-base font-light italic text-[#5C3D2E] pb-3">
              Beautifully glazed ceramics, from delicate vases to rustic tableware.
            </p>
            <img
              src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/wGZH4ULoQZthoq3ANZ_b-.jpg"
              alt="Pottery"
              className="w-full h-40 object-cover rounded-md"
            />
          </motion.div>

          <motion.div
            className="rounded-lg shadow-lg md:max-w-xs w-full p-6 bg-white border-2 border-[#D09E30] flex flex-col"
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <strong className="text-xl mb-2 font-serif text-[#5C3D2E]">Jewelry</strong>
            <p className="text-base font-light italic text-[#5C3D2E] pb-3">
              Unique metal and beaded designs, crafted with ancient techniques.
            </p>
            <img
              src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/-pnWGG6HoRihzcI_ywwk-.jpg"
              alt="Jewelry"
              className="w-full h-40 object-cover rounded-md"
            />
          </motion.div>
        </div>
      </div> */}

    <div className="flex -mt-48 flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Celebrate
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Ethiopian artistry.
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/BMYV5xTrAe_b5ae6vN-1p.jpg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div className="h-[40rem] -mt-52 rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
        <h2 className="text-4xl py-4 md:text-5xl text-center font-bold mb-10 font-serif text-[#5C3D2E]">
          Handmade Treasures: Unique Artisanal Products
        </h2>

        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>



      {/* <div className="py-20 text-[#5C3D2E]">
        <h2 className="text-4xl py-4 md:text-5xl text-center font-bold mb-10 font-serif text-[#5C3D2E]">
          Meet the Talented Ethiopian Artisans
        </h2>

        <div className="flex flex-wrap justify-around space-y-10 sm:space-y-0">
          <motion.div
            className="rounded-lg shadow-lg md:max-w-xs w-full p-6 bg-white border-2 border-[#D09E30] flex flex-col items-center"
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FontAwesomeIcon icon={faScissors} size="3x" className="mb-4 text-[#D09E30]" />
            <strong className="text-2xl mb-2 font-serif text-[#5C3D2E]">Master Weavers</strong>
            <p className="text-base text-center font-light italic text-[#5C3D2E] pb-3">
              Keeping vibrant textile traditions alive.
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg shadow-lg md:max-w-xs w-full p-6 bg-white border-2 border-[#D09E30] flex flex-col items-center"
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FontAwesomeIcon icon={faCoffee} size="3x" className="mb-4 text-[#D09E30]" />
            <strong className="text-2xl mb-2 font-serif text-[#5C3D2E]">Skilled Potters</strong>
            <p className="text-base text-center font-light italic text-[#5C3D2E] pb-3">
              Creating functional and artistic ceramics.
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg shadow-lg md:max-w-xs w-full p-6 bg-white border-2 border-[#D09E30] flex flex-col items-center"
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FontAwesomeIcon icon={faRing} size="3x" className="mb-4 text-[#D09E30]" />
            <strong className="text-2xl mb-2 font-serif text-[#5C3D2E]">Jewelry Artisans</strong>
            <p className="text-base text-center font-light italic text-[#5C3D2E] pb-3">
              Crafting unique, handmade adornments.
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg shadow-lg md:max-w-xs w-full p-6 bg-white border-2 border-[#D09E30] flex flex-col items-center"
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <FontAwesomeIcon icon={faBasketShopping} size="3x" className="mb-4 text-[#D09E30]" />
            <strong className="text-2xl mb-2 font-serif text-[#5C3D2E]">Basket Weavers</strong>
            <p className="text-base text-center font-light italic text-[#5C3D2E] pb-3">
              Preserving ancient basketry techniques.
            </p>
          </motion.div>
        </div>
      </div> */}



      <div className="flex flex-col md:flex-row items-center justify-center py-16"> {/* Adjusted padding */}
        <motion.div
          className="w-full md:w-1/2 md:pl-12 pl-10 text-[#5C3D2E] pt-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Secure and Seamless E-commerce Experience
          </h2>

          {/* Numbered list */}
          <ol className="space-y-10 py-8">
            {/* Item 1 */}
            <motion.li
              className="flex items-start"
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Number with border */}
              <div className="flex-shrink-0 bg-white border border-[#5C3D2E] text-[#5C3D2E] font-bold w-10 h-10 flex items-center justify-center rounded-md mr-4">
                1
              </div>
              {/* Content */}
              <div className="flex flex-col">
                <strong className="mb-2">Safe Payments
                </strong>
                <p className="text-base text-[#5C3D2E]">
                  Enjoy worry-free transactions with our secure payment gateway.
                </p>
              </div>
            </motion.li>

            {/* Item 2 */}
            <motion.li
              className="flex items-start"
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex-shrink-0 bg-white border border-[#5C3D2E] text-[#5C3D2E] font-bold w-10 h-10 flex items-center justify-center rounded-md mr-4">
                2
              </div>
              <div className="flex flex-col">
                <strong className="mb-2">Reliable Shipping
                </strong>
                <p className="text-base text-[#5C3D2E]">
                  We deliver your purchases safely and efficiently worldwide.
                </p>
              </div>
            </motion.li>

            {/* Item 3 */}
            <motion.li
              className="flex items-start"
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex-shrink-0 bg-white border border-[#5C3D2E] text-[#5C3D2E] font-bold w-10 h-10 flex items-center justify-center rounded-md mr-4">
                3
              </div>
              <div className="flex flex-col">
                <strong className="mb-2">User-friendly Platform
                </strong>
                <p className="text-base text-[#5C3D2E]">
                  Browse and shop with ease on our intuitive, visually appealing interface.
                </p>
              </div>
            </motion.li>

          </ol>
        </motion.div>

        <div
          className="w-full md:w-1/2 mb-8  md:mb-0"
        >
          <img
            src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/7NqdB8vojwt2nzi684dKU.jpg"
            alt="Ethiopian Art"
            className="rounded-lg shadow-lg  w-full md:w-[500px] md:h-[700px] h-1/2 object-cover"
          />
        </div>
      </div>


      <div className="max-w-4xl md:my-20 mx-auto bg-white my-8 text-[#5C3D2E] shadow-lg rounded-lg overflow-hidden">
        {/* Card Container */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Image */}
          <div className="md:w-1/3 w-full">
            <img
              src="https://cdn.gamma.app/m3rdunp6aj4a2ph/generated-images/1S-ZmgumCk6WP_0DjVqEw.jpg" // Replace with your image
              alt="FAQ Image"
              className="object-cover w-full h-64 md:h-full"
            />
          </div>

          {/* Right Content - FAQ */}
          <div className="md:w-2/3 w-full p-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Immerse Yourself in the Culture of Ethiopia
            </h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold  text-[#b57a5c] hover:text-[#5C3D2E] transition duration-200">
                  Discover the Unique Stories Behind the Crafts
                </AccordionTrigger>
                <AccordionContent className="text-[#5c3d2eab]  font-serif mt-2 text-sm">
                  Each handmade piece reflects the rich cultural heritage and traditions of Ethiopia. Dive deeper into the history and symbolism of these artisanal creations.                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-[#b57a5c] hover:text-[#5C3D2E] transition duration-200">
                  Explore the Diverse Regions of Ethiopia
                </AccordionTrigger>
                <AccordionContent className="text-[#5c3d2eab] font-serif mt-2 text-sm">
                  Explore the ancient rock-hewn churches of Lalibela,
                  Marvel at the stunning landscapes of the Simien Mountains,
                  Experience the vibrant energy of Addis Ababa, the bustling capital   ,
                </AccordionContent>
              </AccordionItem>

            </Accordion>

          </div>
        </div>
      </div>


    </div>
  );
};

export default Home;
