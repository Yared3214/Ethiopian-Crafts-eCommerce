import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5C3D2E] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-sm">
            We are a marketplace dedicated to promoting Ethiopian culture, art, and craftsmanship. Our platform connects local artisans with a global community, offering unique handmade products that tell a story of tradition and creativity.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="/shop" className="hover:underline">Shop</a>
            </li>
            <li className="mb-2">
              <a href="/about" className="hover:underline">About Us</a>
            </li>
            <li className="mb-2">
              <a href="/contact" className="hover:underline">Contact Us</a>
            </li>
            <li className="mb-2">
              <a href="/blog" className="hover:underline">Blog</a>
            </li>
            <li className="mb-2">
              <a href="/faq" className="hover:underline">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
          <p className="text-sm mb-4">Subscribe to get the latest news, offers, and updates on Ethiopian artistry.</p>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 w-full rounded-md text-black"
            />
            <button className="mt-2 w-full bg-[#D9A14E] text-white py-2 rounded-md hover:bg-[#c08c3f]">
              Subscribe
            </button>
          </form>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-sm">
            <strong>Address:</strong> Addis Ababa, Ethiopia
          </p>
          <p className="text-sm">
            <strong>Email:</strong> info@ethiopianartistry.com
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +251 123 456 789
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-[#D9A14E]">
              <img src="/icons/facebook.svg" alt="Facebook" className="w-6" />
            </a>
            <a href="#" className="hover:text-[#D9A14E]">
              <img src="/icons/instagram.svg" alt="Instagram" className="w-6" />
            </a>
            <a href="#" className="hover:text-[#D9A14E]">
              <img src="/icons/twitter.svg" alt="Twitter" className="w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-6">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Ethiopian Artistry. All rights reserved.
        </p>
        <p className="text-center text-sm mt-2">
          Powered by <a href="#" className="hover:underline">Your Brand</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
