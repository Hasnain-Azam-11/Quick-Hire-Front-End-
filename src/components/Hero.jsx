import { Link } from "react-router-dom";
import { Typography, Button, Space } from "antd";
import { SafetyOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const trustPoints = ["Verified Workers", "Secure Payments", "24/7 Support"];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <Title style={{ color: "#fff", fontSize: 56, marginBottom: 24 }}>
            Find Trusted Workers — By Day, Week, or Event
          </Title>
          <Paragraph style={{ color: "#d1d5db", fontSize: 20, marginBottom: 32 }}>
            Pakistan's leading platform for short-term labor hiring. Connect with
            verified workers for domestic help, events, construction, and more.
          </Paragraph>

          <Space size="middle" style={{ marginBottom: 48 }}>
            <Link to="/register?role=client">
              <Button type="primary" size="large">
                Post a Job
              </Button>
            </Link>
            <Link to="/register?role=worker">
              <Button
                size="large"
                style={{
                  background: "transparent",
                  borderColor: "#fff",
                  color: "#fff",
                }}
              >
                I'm a Worker
              </Button>
            </Link>
          </Space>

          <div className="trust-points">
            {trustPoints.map((point) => (
              <div key={point} className="trust-point">
                <SafetyOutlined style={{ color: "var(--brand)" }} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}