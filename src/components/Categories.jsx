import { Link } from "react-router-dom";
import { Typography, Card } from "antd";
import {
  Home,
  Baby,
  Users,
  Sparkles,
  ChefHat,
  Car,
  Construction,
  Shield,
  Flower2,
  GraduationCap,
  Hammer,
  Package,
  Building2,
} from "lucide-react";

const { Title, Paragraph } = Typography;

const categories = [
  { slug: "domestic", label: "Domestic Help", icon: Home },
  { slug: "childcare", label: "Childcare", icon: Baby },
  { slug: "elder-care", label: "Elder Care", icon: Users },
  { slug: "events", label: "Event Staffing", icon: Sparkles },
  { slug: "cooking", label: "Cooking", icon: ChefHat },
  { slug: "driving", label: "Driving", icon: Car },
  { slug: "construction", label: "Construction", icon: Construction },
  { slug: "security", label: "Security", icon: Shield },
  { slug: "gardening", label: "Gardening", icon: Flower2 },
  { slug: "tutoring", label: "Tutoring", icon: GraduationCap },
  { slug: "beauty", label: "Beauty", icon: Sparkles },
  { slug: "handyman", label: "Handyman", icon: Hammer },
  { slug: "moving", label: "Moving", icon: Package },
  { slug: "office", label: "Office Support", icon: Building2 },
];

export default function Categories() {
  return (
    <section className="section">
      <div className="container">
        <Title level={2} className="section-title">
          Browse by Category
        </Title>
        <div className="scroll-row">
          {categories.map(({ slug, label, icon: Icon }) => (
            <Link key={slug} to={`/browse-workers?category=${slug}`}>
              <Card className="category-card" variant="outlined">
                <div className="category-icon">
                  <Icon size={24} />
                </div>
                <Paragraph style={{ margin: 0, fontSize: 14 }}>{label}</Paragraph>
              </Card>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}