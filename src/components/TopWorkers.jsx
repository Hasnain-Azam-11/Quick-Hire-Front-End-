import { Typography, Card, Avatar, Tag, Space } from "antd";
import { StarFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

// NOTE: static placeholder data matching the original mockup.
// Once the Django API is ready, replace this with a fetch to
// something like GET /api/workers/top/ and map over the response instead.
const topWorkers = [
  { initials: "FA", name: "Fatima Ahmed", category: "Domestic Help", rating: 4.9, jobs: 127 },
  { initials: "AH", name: "Ali Hassan", category: "Driving", rating: 4.8, jobs: 93 },
  { initials: "AK", name: "Ayesha Khan", category: "Childcare", rating: 5.0, jobs: 156 },
  { initials: "MR", name: "Muhammad Raza", category: "Construction", rating: 4.7, jobs: 84 },
];

export default function TopWorkers() {
  return (
    <section className="section">
      <div className="container">
        <Title level={2} className="section-title">
          Top Rated Workers
        </Title>
        <div className="scroll-row">
          {topWorkers.map((worker) => (
            <Card key={worker.name} className="worker-card" variant="outlined">
              <Avatar size={80} className="worker-avatar">
                {worker.initials}
              </Avatar>
              <Title level={5} style={{ marginBottom: 8 }}>
                {worker.name}
              </Title>
              <Tag color="#FF6B00" style={{ marginBottom: 12 }}>
                {worker.category}
              </Tag>
              <div>
                <Space size={6}>
                  <StarFilled style={{ color: "var(--brand)" }} />
                  <Text>{worker.rating}</Text>
                  <Text type="secondary">({worker.jobs} jobs)</Text>
                </Space>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}