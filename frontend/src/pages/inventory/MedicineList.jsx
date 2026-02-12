import React, { useState, useMemo } from "react";
import {
  Table,
  Dropdown,
  Badge,
  InputGroup,
  Form,
  Button,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import {
  FiSearch,
  FiPlus,
  FiMoreVertical,
} from "react-icons/fi";

const MedicineList = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [medicines] = useState([
    {
      id: "MED-001",
      name: "Paracetamol",
      category: "Tablet",
      price: 40,
      stock: 120,
      expiry: "12/2026",
    },
    {
      id: "MED-002",
      name: "Amoxicillin",
      category: "Capsule",
      price: 90,
      stock: 20,
      expiry: "08/2026",
    },
    {
      id: "MED-003",
      name: "Cough Syrup",
      category: "Syrup",
      price: 120,
      stock: 5,
      expiry: "03/2026",
    },
  ]);

  // Filtering
  const filteredData = useMemo(() => {
    return medicines.filter((m) => {
      const matchSearch = Object.values(m)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        categoryFilter === "All" ||
        m.category === categoryFilter;

      return matchSearch && matchCategory;
    });
  }, [search, categoryFilter, medicines]);

  // Stock badge
  const stockVariant = (stock) => {
    if (stock > 50) return "success";
    if (stock > 10) return "warning";
    return "danger";
  };

  const stockText = (stock) => {
    if (stock > 50) return "In Stock";
    if (stock > 10) return "Low";
    return "Critical";
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body>

        {/* Header */}
        <Row className="align-items-center mb-3">
          <Col xs={12} md={9}>
            <h4 className="mb-2 mb-md-0">Medicine List</h4>
          </Col>

          <Col xs={12} md={3} className="text-md-end">
            <Button className="w-100 w-md-auto">
              <FiPlus /> Add Medicine
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="g-2 mb-3">
          <Col xs={12} md={6} lg={4}>
            <InputGroup>
              <InputGroup.Text>
                <FiSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col xs={12} md={6} lg={3}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>Tablet</option>
              <option>Capsule</option>
              <option>Syrup</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Table */}
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Expiry</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((m, index) => (
                <tr key={index}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.category}</td>
                  <td>₹{m.price}</td>
                  <td>{m.stock}</td>

                  <td>
                    <Badge bg={stockVariant(m.stock)}>
                      {stockText(m.stock)}
                    </Badge>
                  </td>

                  <td>{m.expiry}</td>

                  <td>
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        variant="light"
                        size="sm"
                      >
                        <FiMoreVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>View</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Item className="text-danger">
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      </Card.Body>
    </Card>
  );
};

export default MedicineList;
