import { Link } from "react-router-dom";
import { Row, Col, Typography, Space, Divider } from "antd";

const { Text, Title } = Typography;

const footerColumns = [
  {
    heading: "For Clients",
    links: [
      { label: "Find Workers", to: "/browse-workers" },
      { label: "Post a Job", to: "/post-job" },
      { label: "How It Works", to: "/how-it-works" },
    ],
  },
  {
    heading: "For Workers",
    links: [
      { label: "Find Jobs", to: "/browse-jobs" },
      { label: "Sign Up", to: "/register?role=worker" },
      { label: "Get Verified", to: "/verification" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Admin Login", to: "/admin-dashboard" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
          <Col xs={24} md={6}>
            <Space align="center" style={{ marginBottom: 16 }}>
              <span className="logo-badge">Q</span>
              <Title level={4} style={{ color: "#fff", margin: 0 }}>
                QuickHire
              </Title>
            </Space>
            <Text style={{ color: "#9ca3af", fontSize: 14 }}>
              Pakistan's trusted platform for short-term labor hiring.
            </Text>
          </Col>

          {footerColumns.map((column) => (
            <Col xs={24} md={6} key={column.heading}>
              <Title level={5} style={{ color: "#fff", marginBottom: 16 }}>
                {column.heading}
              </Title>
              <Space orientation="vertical" size={8}>
                {column.links.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </Space>
            </Col>
          ))}
        </Row>
        <Divider style={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <div style={{ textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
          © 2026 QuickHire. All rights reserved.
        </div>
      </div>
    </footer>
  );
}