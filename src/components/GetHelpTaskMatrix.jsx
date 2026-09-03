import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DualCTA from "./DualCTA";

const taskMatrix = [
  "General Cleaning",
  "TV Mounting",
  "Electrical Services",
  "IKEA Assembly",
  "Light Moving",
  "House Cleaning",
  "Yardwork",
  "Trash Removal",
  "Lawn Care",
  "Heavy Lifting",
  "Furniture Moving",
  "Drilling",
  "Interior Painting",
  "Event Staffing",
  "On-Demand Driver",
  "Baby Sitting",
  "AC Repair",
  "Locksmith",
  "Office Moving",
  "Plumbing Fix"
];

export default function GetHelpTaskMatrix() {
  const navigate = useNavigate();

  const handlePillClick = (task) => {
    navigate(`/register?role=client&q=${encodeURIComponent(task)}`);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-200 space-y-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-8">
        
        {/* Heading */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
            Get help Today
          </h2>
          <p className="text-gray-500 text-sm">
            Select a task to get matched with verified local service providers immediately.
          </p>
        </div>

        {/* Task Pill Matrix */}
        <div className="flex flex-wrap gap-2.5">
          {taskMatrix.map((task) => (
            <button
              key={task}
              type="button"
              onClick={() => handlePillClick(task)}
              className="px-4 py-2.5 bg-gray-50 hover:bg-[#FFF0E6] hover:border-[#FF6B00] hover:text-[#FF6B00] border border-gray-200 text-gray-700 text-xs font-semibold rounded-full shadow-2xs transition-all cursor-pointer"
            >
              {task}
            </button>
          ))}
        </div>

      </div>

      {/* Dual CTA Marketplace Section */}
      <DualCTA />
    </section>
  );
}
