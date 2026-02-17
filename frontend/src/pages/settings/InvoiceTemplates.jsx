import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const InvoiceTemplates = () => {
  const [templates] = useState([
    { id: 1, name: "General Invoice 1" },
    { id: 2, name: "General Invoice 2" },
    { id: 3, name: "General Invoice 3" },
    { id: 4, name: "General Invoice 4" },
  ]);

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h5 className="fw-bold">Invoice Template</h5>
          <hr />
        </Col>
      </Row>

      {/* Template Grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {templates.map((template) => (
          <Col key={template.id}>
            {/* Template Card */}
            <div
              className="p-3 bg-white rounded shadow-sm"
              style={{
                cursor: "pointer",
                transition: "0.25s",
                transform:
                  hoveredCard === template.id
                    ? "translateY(-5px)"
                    : "none",
              }}
              onMouseEnter={() => setHoveredCard(template.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Preview Area */}
              <div
                className="d-flex align-items-center justify-content-center mb-3 rounded bg-light"
                style={{ height: "200px" }}
              >
                <span style={{ fontSize: "48px" }}>📄</span>
              </div>

              {/* Footer */}
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">{template.name}</h6>

                <button
                  className="btn btn-link text-secondary p-0"
                  style={{ fontSize: "20px" }}
                >
                  ☆
                </button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InvoiceTemplates;
