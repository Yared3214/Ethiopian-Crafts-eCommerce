"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";

type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
};

const demoSaved: Product[] = [
  {
    id: "P-1",
    title: "Handmade Pottery Vase",
    price: "ETB 980",
    image:
      "https://www.themudplace.com/cdn/shop/files/preview_images/2f4e88d9033c4b55a07b500bf6b80950.thumbnail.0000000000_1200x1200.jpg?v=1691106391",
    category: "Pottery",
  },
  {
    id: "P-2",
    title: "Silk Scarf - Traditional Pattern",
    price: "ETB 650",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUeCSQx8_vMRdlRco9cSwzzovIeAeneVfA_Q&s",
    category: "Textiles",
  },
  {
    id: "P-3",
    title: "Hand-Carved Wooden Tray",
    price: "ETB 720",
    image:
      "https://m.media-amazon.com/images/I/71XUE33UcGL._AC_UF894,1000_QL80_.jpg",
    category: "Woodwork",
  },
];

export default function SavedProducts() {
  const [savedItems, setSavedItems] = useState(demoSaved);

  const toggleSave = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {savedItems.map((item) => (
        <Card
          key={item.id}
          className="group border bg-white/95 backdrop-blur-xl rounded-xl shadow-sm hover:shadow-xl transition-all"
        >
          {/* Image */}
          <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Heart button */}
            <button
              onClick={() => toggleSave(item.id)}
              className="absolute top-3 right-3 bg-white rounded-full p-1 shadow hover:scale-105 transition"
            >
              <IconHeartFilled
                className="text-rose-500 group-hover:animate-pulse"
                size={18}
              />
            </button>
          </div>

          {/* Content */}
          <CardContent className="p-4 space-y-3">
            <Badge className="bg-amber-100 text-amber-800 font-medium">
              {item.category}
            </Badge>

            <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>

            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-700">{item.price}</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {savedItems.length === 0 && (
        <div className="text-center text-gray-500 col-span-full py-20">
          <IconHeart size={36} className="mx-auto mb-3 text-gray-400" />
          <p className="text-lg font-medium">No saved items yet</p>
          <p className="text-sm text-gray-400">Start adding favorites ❤️</p>
        </div>
      )}
    </div>
    </div>
  );
}
