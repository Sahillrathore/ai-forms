import React from 'react';
import Image from 'next/image';
import { 
  Sprout, 
  FlaskConical, 
  Sparkles, 
  SquareUser, 
  Building2, 
  Smile 
} from 'lucide-react';

// Data for the grid to keep JSX clean
const categories = [
  {
    id: 1,
    title: "Creators",
    icon: Sprout,
    items: ["Sell products online", "Grow your newsletter", "Receive contact form messages"]
  },
  {
    id: 2,
    title: "Product",
    icon: FlaskConical,
    items: ["Gather audience feedback", "Receive feature requests", "Conduct user research"]
  },
  {
    id: 3,
    title: "Marketing",
    icon: Sparkles,
    items: ["Generate leads", "Register users", "Measure customer satisfaction"]
  },
  {
    id: 4,
    title: "HR",
    icon: SquareUser,
    items: ["Evaluate employee engagement", "Receive job applications", "Create exit surveys"]
  },
  {
    id: 5,
    title: "Office",
    icon: Building2,
    items: ["Organize team events", "Receive help desk tickets", "Collect internal suggestions"]
  },
  {
    id: 6,
    title: "Personal",
    icon: Smile,
    items: ["Create an online quiz", "Send an RSVP form", "Organize a volunteer signup"]
  }
];

export default function TemplateSection() {
  return (
    <section className="w-full mx-auto px-0 py-20 mt-16 relative">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 text-start">
            Designed for{' '}
            <span className="relative inline-block">
              you
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3 text-pink-500" 
                viewBox="0 0 100 15" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0 10 Q 50 20 100 5" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-110 text-start">
            Start from scratch or explore templates created by our community.
          </p>
        </div>

        {/* Floating Doodle Image (Top Right) */}
        {/* Replace src with your specific doodle image */}
        <div className="hidden md:block absolute -top-10 right-0 w-72 h-fit pointer-events-none">
           <Image 
            src="/designed-for-you.png" 
            alt="Person doodle" 
            width={300} 
            height={200}
            className="object-contain"
           />
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-xl relative z-10 shadow-sm border border-gray-200 p-8 md:p-12">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col items-start">
              {/* Icon */}
              <div className="mb-4 text-pink-500">
                <cat.icon size={28} strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-black mb-1.5">
                {cat.title}
              </h3>
              
              {/* List Items */}
              <ul className="space-y-2">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="text-gray-600 text-[15px] leading-relaxed flex items-start">
                    <span className="mr-2 text-gray-400">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-12">
          <button className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm">
            Browse templates
          </button>
        </div>
        
      </div>
    </section>
  );
}