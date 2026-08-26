import { Row, Col, Statistic } from "antd";

const stats = [
  { value: "50K+", label: "Verified Workers" },
  { value: "200K+", label: "Jobs Completed" },
  { value: "4.8★", label: "Average Rating" },
  { value: "30+", label: "Cities Covered" },
];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <Row gutter={[32, 32]}>
          {stats.map((stat) => (
            <Col xs={12} md={6} key={stat.label} style={{ textAlign: "center" }}>
              <Statistic
                value={stat.value}
                styles={{ content: { color: "var(--brand)", fontSize: 36 } }}
              />
              <div style={{ color: "#9ca3af", marginTop: 4 }}>{stat.label}</div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}