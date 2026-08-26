import { Link } from "react-router-dom";
import { Button, Space } from "antd";

const links = [
  { to: "/browse-workers", label: "Find Workers" },
  { to: "/browse-jobs", label: "Find Work" },
  { to: "/how-it-works", label: "How It Works" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-badge">Q</span>
          <span>QuickHire</span>
        </Link>

        <nav className="nav-links">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Space>
          <Link to="/sign-in">
            <Button type="text" style={{ color: "#fff" }}>
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button type="primary">Get Started</Button>
          </Link>
        </Space>
      </div>
    </header>
  );
}