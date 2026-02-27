import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const Storage = () => {
  const [localStorageEnabled, setLocalStorageEnabled] = useState(true);
  const [awsEnabled, setAwsEnabled] = useState(true);

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header">
          <h5 className="mb-0 fw-bold">Storage</h5>
        </div>

        <hr />

        {/* Content */}
        <div className="p-3">
          <Row className="g-4">

            {/* Local Storage */}
            <Col md={6}>
              <div className="saas-storage-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      Local Storage
                    </h6>
                    <small className="text-muted">
                      Store files directly on server.
                    </small>
                  </div>

                  <Form.Check
                    type="switch"
                    id="local-storage-switch"
                    checked={localStorageEnabled}
                    onChange={() =>
                      setLocalStorageEnabled(!localStorageEnabled)
                    }
                  />
                </div>
              </div>
            </Col>

            {/* AWS Storage */}
            <Col md={6}>
              <div className="saas-storage-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-semibold mb-1">
                      AWS Storage
                    </h6>
                    <small className="text-muted">
                      Store files securely on AWS cloud.
                    </small>
                  </div>

                  <Form.Check
                    type="switch"
                    id="aws-storage-switch"
                    checked={awsEnabled}
                    onChange={() =>
                      setAwsEnabled(!awsEnabled)
                    }
                  />
                </div>
              </div>
            </Col>

          </Row>
        </div>

      </div>
    </Container>
  );
};

export default Storage;