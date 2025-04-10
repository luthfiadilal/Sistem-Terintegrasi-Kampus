import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function DropdownProduct() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 top-full w-screen bg-white shadow-lg border-t border-gray-200"
    >
      <div className="container mx-auto p-6 grid grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700">Hardware</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><Link href="/product/laptop" className="hover:text-blue-600">Laptops</Link></li>
            <li><Link href="/product/phone" className="hover:text-blue-600">Phones</Link></li>
            <li><Link href="/product/accessories" className="hover:text-blue-600">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Software</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><Link href="/product/app" className="hover:text-blue-600">Mobile Apps</Link></li>
            <li><Link href="/product/desktop" className="hover:text-blue-600">Desktop Software</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Cloud & AI</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><Link href="/product/cloud" className="hover:text-blue-600">Cloud Solutions</Link></li>
            <li><Link href="/product/ai" className="hover:text-blue-600">AI & Machine Learning</Link></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
