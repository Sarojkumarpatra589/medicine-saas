import { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import "./style.css";
import { FiPlus } from "react-icons/fi";

export default function MedicineAdd() {
  const [formData, setFormData] = useState({
    medicineName: "",
    genericName: "",
    category: "",
    manufacturer: "",
    batchNo: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
    expiryDate: "",
    mfgDate: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="add-medicine-page">
      
      {/* Heading */}
       {/* Header Section */}
            <div className="box_shadow mb-3 p-3  bg-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Add Medicine</h5>
                <Button size="sm" className="button" >
                  <FiPlus className="me-1" /> Add Medicine
                </Button>
              </div>
            </div>

      {/* Form Card */}
      <Card className="border-0 box_shadow">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              
              <Col md={6} className="mb-3">
                <Form.Label>Medicine Name</Form.Label>
                <Form.Control
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleChange}
                  placeholder="Enter medicine name"
                />
              </Col>

              <Col md={6} className="mb-3">
                <Form.Label>Generic Name</Form.Label>
                <Form.Control
                  type="text"
                  name="genericName"
                  value={formData.genericName}
                  onChange={handleChange}
                  placeholder="Enter generic name"
                />
              </Col>

              <Col md={6} className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option>Tablet</option>
                  <option>Capsule</option>
                  <option>Syrup</option>
                  <option>Injection</option>
                  <option>Ointment</option>
                </Form.Select>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="Enter manufacturer name"
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label>Batch No</Form.Label>
                <Form.Control
                  type="text"
                  name="batchNo"
                  value={formData.batchNo}
                  onChange={handleChange}
                  placeholder="Batch number"
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label>Purchase Price</Form.Label>
                <Form.Control
                  type="number"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  placeholder="₹ Purchase price"
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  placeholder="₹ Selling price"
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label>Manufacturing Date</Form.Label>
                <Form.Control
                  type="date"
                  name="mfgDate"
                  value={formData.mfgDate}
                  onChange={handleChange}
                />
              </Col>

              <Col md={4} className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />
              </Col>

              <Col md={12} className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional notes about medicine"
                />
              </Col>

            </Row>

            <div className="text-end">
              <Button variant="light" className="me-2 border">
                Cancel
              </Button>
              <Button className="button" type="submit">
                Save Medicine
              </Button>
            </div>

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}