import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CATEGORY_CHOICES,
  SUBCATEGORIES_MAP,
  SUBCATEGORY_ICONS_MAP
} from "../constants/categories";
import { CATEGORY_ICONS } from "../components/Categories";
import { ArrowLeft, ArrowRight, ShieldCheck, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  // Find category metadata
  const categoryObj = CATEGORY_CHOICES.find(
    (c) => c.value.toLowerCase() === (categorySlug || "").toLowerCase()
  );

  const categoryLabel = categoryObj ? categoryObj.label : categorySlug;
  const IconComp = categoryObj ? CATEGORY_ICONS[categoryObj.value] : null;

  // Find subcategories list
  const subcategories = categoryObj ? SUBCATEGORIES_MAP[categoryObj.value] || [] : [];

  const handleSubcategoryClick = (subName) => {
    const targetCategory = categoryObj ? categoryObj.value : categorySlug;
    if (isAuthenticated && role === "client") {
      navigate(`/client/workers?category=${encodeURIComponent(targetCategory)}&sub=${encodeURIComponent(subName)}`);
    } else {
      navigate(`/browse-workers?category=${encodeURIComponent(targetCategory)}&sub=${encodeURIComponent(subName)}`);
    }
  };

  if (!categoryObj) {
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

  return (
    <div className="min-h-screen bg-[#FAFBFD] font-sans text-[#0A0A0A] flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Category Header Hero */}
        <section className="bg-white border-b border-gray-200 py-12 px-6 sm:px-12">
          <div className="max-w-5xl mx-auto space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#FF6B00] transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to All Categories</span>
            </Link>

            <div className="flex items-center gap-4">
              {IconComp && (
                <div className="w-16 h-16 rounded-2xl bg-[#FFF0E6] text-[#FF6B00] flex items-center justify-center shadow-xs border border-[#FF6B00]/20">
                  <IconComp size={32} />
                </div>
              )}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
                  {categoryLabel} Services
                </h1>
                <p className="text-gray-500 text-sm sm:text-base mt-1">
                  Browse specialized subcategories to find background-checked local professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories Section */}
        <section className="py-12 px-6 sm:px-12">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A0A0A]">
                Available Subcategories ({subcategories.length})
              </h2>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <ShieldCheck size={16} />
                <span>100% Verified Workers</span>
              </div>
            </div>

            {/* Grid of Subcategory Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subcategories.map((subName) => {
                const emoji = SUBCATEGORY_ICONS_MAP[subName] || "📌";
                return (
                  <div
                    key={subName}
                    onClick={() => handleSubcategoryClick(subName)}
                    className="bg-white hover:bg-[#FFF0E6] border border-gray-200 hover:border-[#FF6B00] rounded-2xl p-6 transition-all duration-200 shadow-2xs hover:shadow-lg cursor-pointer group flex items-start justify-between"
                  >
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#F5F5F5] group-hover:bg-white text-2xl flex items-center justify-center transition-colors shadow-2xs">
                        <span>{emoji}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#0A0A0A] group-hover:text-[#FF6B00] transition-colors">
                          {subName}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Find top-rated {subName.toLowerCase()} experts near you
                        </p>
                      </div>
                    </div>

                    <div className="text-gray-300 group-hover:text-[#FF6B00] transition-colors pt-2">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
