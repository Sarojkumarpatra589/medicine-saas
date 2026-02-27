import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
} from "react-bootstrap";

const Sitemap = () => {
  const [sitemaps] = useState([
    {
      id: 1,
      url: "https://localhost/Preclinic",
      filename: "sitemap18725604.xml",
    },
  ]);

  return (
    <Container fluid>
      <div className="saas-card">

        {/* Header */}
        <div className="saas-card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold">Sitemap</h5>

          <Button className="button">
            + Generate Sitemap
          </Button>
        </div>

        <hr />

        {/* Table */}
        <div className="saas-table-wrapper">
          <Row>
            <Col>
              <Table
                hover
                responsive
                className="align-middle saas-table mb-0"
              >
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Filename</th>
                  </tr>
                </thead>

                <tbody>
                  {sitemaps.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="fw-medium text-decoration-none"
                        >
                          {item.url}
                        </a>
                      </td>

                      <td>
                        <a
                          href={`${item.url}/${item.filename}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary fw-semibold text-decoration-none"
                        >
                          {item.filename}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>

      </div>
    </Container>
  );
};

export default Sitemap;