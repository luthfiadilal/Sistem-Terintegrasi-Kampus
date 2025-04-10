import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function DropdownPartner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 top-full w-screen bg-white shadow-lg border-t border-gray-200"
    >
      <div className="container mx-auto p-6 grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700">For Businesses</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><Link href="/partner/startup" className="hover:text-blue-600">Startup Partnership</Link></li>
            <li><Link href="/partner/enterprise" className="hover:text-blue-600">Enterprise Solutions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">For Developers</h3>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li><Link href="/partner/api" className="hover:text-blue-600">API Integration</Link></li>
            <li><Link href="/partner/tools" className="hover:text-blue-600">Developer Tools</Link></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
