import { Typography, Row, Col, Card } from "antd";

const { Title, Paragraph } = Typography;

const steps = [
  {
    number: 1,
    title: "Post Your Job",
    description: "Describe the work you need done and your requirements",
  },
  {
    number: 2,
    title: "Get AI-Matched Workers",
    description: "Our AI finds the best workers based on your needs",
  },
  {
    number: 3,
    title: "Hire & Pay Securely",
    description: "Book workers and pay safely through our platform",
  },
];

export default function HowItWorks() {
  return (
    <section className="section" style={{ background: "#f5f5f5" }}>
      <div className="container">
        <Title level={2} className="section-title" style={{ marginBottom: 48 }}>
          How It Works
        </Title>
        <Row gutter={[32, 32]}>
          {steps.map((step) => (
            <Col xs={24} md={8} key={step.number}>
              <Card variant="borderless" style={{ height: "100%" }}>
                <div className="step-badge">{step.number}</div>
                <Title level={4} style={{ marginBottom: 12 }}>
                  {step.title}
                </Title>
                <Paragraph style={{ color: "#4b5563", margin: 0 }}>
                  {step.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}