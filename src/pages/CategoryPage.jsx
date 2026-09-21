import { useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ClipboardList, Users } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryRequestForm from "../components/CategoryRequestForm";
import CategoryWorkers from "../components/CategoryWorkers";
import { CATEGORY_ICONS } from "../components/Categories";
import { useClientData } from "../context/ClientDataContext";
import { findCategory } from "../constants/hiring";

const TABS = [
  { id: "request", label: "Post a request", icon: ClipboardList },
  { id: "workers", label: "Browse workers", icon: Users },
];

// Opened from a category card on the home page: goes straight to the request form,
// with the option to look at the category's workers and hire one directly.
export default function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const { workers } = useClientData();
  const [view, setView] = useState(() => (searchParams.get("view") === "workers" ? "workers" : "request"));

  const category = findCategory(categorySlug);

  // /categories/childcare and /categories/elder_care now live at /categories/caregiving.
  if (category && categorySlug !== category.value) {
    return <Navigate to={`/categories/${category.value}`} replace />;
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white font-sans text-[#0A0A0A] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto py-24 px-6 text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-[#0A0A0A]">Category Not Found</h1>
          <p className="text-gray-500">The requested category could not be found.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] text-white font-bold rounded-xl"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComp = CATEGORY_ICONS[category.value];
  const workerCount = workers.filter((w) => w.category === category.label).length;

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-[#0A0A0A] flex flex-col justify-between">
      <div>
        <Navbar />

        <section className="bg-white border-b border-gray-200 py-10 px-6 sm:px-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500! hover:text-[#FF6B00]! transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to all categories</span>
            </Link>

            <div className="flex items-center gap-4">
              {IconComp && (
                <div className="w-16 h-16 rounded-2xl bg-[#FFF0E6] text-[#FF6B00] flex items-center justify-center shadow-xs border border-[#FF6B00]/20 flex-shrink-0">
                  <IconComp size={32} />
                </div>
              )}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
                  {category.label}: what do you need?
                </h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1">
                  Tell us about the job and workers will apply, or pick a {category.label.toLowerCase()} worker and hire them directly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 px-6 sm:px-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div role="tablist" aria-label="How would you like to hire?" className="grid grid-cols-2 gap-1 p-1 bg-gray-200/70 rounded-2xl">
              {TABS.map(({ id, label, icon: Icon }) => {
                const selected = view === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setView(id)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      selected ? "bg-white text-[#FF6B00] shadow-sm" : "text-gray-600 hover:text-[#0A0A0A]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {id === "workers" && (
                      <span className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${selected ? "bg-[#FF6B00] text-white" : "bg-white text-gray-500"}`}>
                        {workerCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div role="tabpanel">
              {view === "request" ? (
                <CategoryRequestForm key={category.value} category={category} onBrowseWorkers={() => setView("workers")} />
              ) : (
                <CategoryWorkers key={category.value} category={category} onPostRequest={() => setView("request")} />
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
