"use client";

import { Tabs } from "@/components/ui/tabs";
import ArtisanInfo from "./ArtisanInfo";
import ProductReviews from "./ProductReviews";
import { Review } from "@/types/product";

const ReviewArtisanTabs: React.FC = () => {
    const artisan = {
        _id: "60d21b4667d0d8992e610c85",
        fullName: "John Doe",
        description: "John is a skilled artisan with over 20 years of experience in crafting beautiful handmade items.",
        profilePic: "https://example.com/profile-pic.jpg",
        slug: "john-doe",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        __v: 0,
    };

    const reviews = {
        _id: "60d21b4667d0d8992e610c86",
        productId: "60d21b4667d0d8992e610c87",
        user: "Jane Smith",
        rating: 4.5,
        comment: "This product is amazing! The quality is top-notch and the craftsmanship is evident.",
        createdAt: "2023-01-02T00:00:00.000Z",
        updatedAt: "2023-01-02T00:00:00.000Z",
    };

    const tabs = [
        {
            title: "Artisan",
            value: "artisan",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-lg md:text-xl font-semibold text-gray-900 bg-gradient-to-br from-white to-gray-100">
                    <ArtisanInfo artisan={artisan} />
                </div>
            ),
        },
        {
            title: "Reviews",
            value: "reviews",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-6 md:p-10 text-lg md:text-xl font-semibold text-gray-900 bg-gradient-to-br from-white to-gray-100">
                    <p className="text-xl font-bold mb-4">User Reviews</p>
                    <ProductReviews reviews={[reviews] as Review[]} />
                </div>
            ),
        },
    ];

    return (
        <div className="h-auto md:h-[40rem] flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-8 md:my-20 px-4 md:px-0">
            <Tabs tabs={tabs} />
        </div>
    );
};

export default ReviewArtisanTabs;
