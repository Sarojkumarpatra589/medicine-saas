import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function ProfileTab() {
  return (
    <div className="profile-wrapper">
      <h5 className="fw-bold mb-0">Basic Information</h5>
      <hr />

      <Row className="align-items-center mb-4">
        <Col md={3}>
          <label>
            Profile Image <span className="required">*</span>
          </label>
        </Col>

        <Col md={9}>
          <div className="profile-upload">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="profile"
            />
          </div>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                First Name <span className="required">*</span>
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                Last Name <span className="required">*</span>
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Contact Information */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                Email <span className="required">*</span>
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control type="email" />
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">
                Phone Number <span className="required">*</span>
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control type="tel" />
            </Col>
          </Row>
        </Col>
      </Row>

      <hr />

      <h5 className=" mb-3">Address Information</h5>

      {/* Address Lines */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Address Line 1</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Address Line 2</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Country / State */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Country</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Select>
                <option>Select</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">State</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Select>
                <option>Select</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* City / Pincode */}
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">City</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Select>
                <option>Select</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Label className="mb-0">Pincode</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control />
            </Col>
          </Row>
        </Col>
      </Row>

      <hr />

      <div className="profile-actions d-flex justify-content-end gap-2">
        <Button variant="light">Cancel</Button>
        <Button className="save-btn">Save Changes</Button>
      </div>
    </div>
  );
}

export default ProfileTab;
