import React, { useState, useMemo } from "react";
import {
  Table,
  Dropdown,
  Badge,
  Button,
  InputGroup,
  Form,
  Row,
  Col,
  Stack
} from "react-bootstrap";
import { FiPlus, FiMoreVertical, FiSearch } from "react-icons/fi";
import "./style.css";

function MedicineList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [expiryFilter, setExpiryFilter] = useState("All");

  const [medicines, setMedicines] = useState([
    { id: 1, code: "MED-001", name: "Paracetamol", category: "Tablet", price: 40, stock: 120, expiry: "12/2026", status: "Active" },
    { id: 2, code: "MED-002", name: "Amoxicillin", category: "Capsule", price: 90, stock: 20, expiry: "08/2026", status: "Active" },
    { id: 3, code: "MED-003", name: "Cough Syrup", category: "Syrup", price: 120, stock: 5, expiry: "03/2026", status: "Inactive" },
    { id: 4, code: "MED-004", name: "Ibuprofen", category: "Tablet", price: 60, stock: 15, expiry: "10/2026", status: "Active" },
    { id: 5, code: "MED-005", name: "Vitamin D", category: "Capsule", price: 150, stock: 50, expiry: "01/2027", status: "Active" },
    { id: 6, code: "MED-006", name: "Aspirin", category: "Tablet", price: 35, stock: 8, expiry: "09/2026", status: "Active" },
    { id: 7, code: "MED-007", name: "Cough Drops", category: "Syrup", price: 25, stock: 18, expiry: "05/2026", status: "Inactive" },
  ]);

  const handleAddMedicine = () => console.log("Add medicine clicked");

  const handleMenuAction = (id, action) => {
    if (action === "delete") setMedicines(prev => prev.filter(item => item.id !== id));
    if (action === "activate" || action === "deactivate") {
      setMedicines(prev =>
        prev.map(item =>
          item.id === id ? { ...item, status: action === "activate" ? "Active" : "Inactive" } : item
        )
      );
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setStockFilter("All");
    setCurrentPage(1);
  };

  // Filter + Sort
  const filtered = useMemo(() => {
    let data = medicines.filter(item =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
     // Expiry Filter
if (expiryFilter !== "All") {
  const today = new Date();

  data = data.filter(item => {
    const [month, year] = item.expiry.split("/");
    const expiryDate = new Date(year, month - 1);

    const diffTime = expiryDate - today;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (expiryFilter === "Expired") return expiryDate < today;
    if (expiryFilter === "ExpiringSoon") return diffDays > 0 && diffDays <= 30;
    if (expiryFilter === "Valid") return expiryDate > today;

    return true;
  });
}
    if (statusFilter !== "All") data = data.filter(item => item.status === statusFilter);
    if (categoryFilter !== "All") data = data.filter(item => item.category === categoryFilter);
    if (stockFilter !== "All") {
      data = data.filter(item => {
        if (stockFilter === "Low") return item.stock < 20;
        if (stockFilter === "Medium") return item.stock >= 20 && item.stock <= 50;
        if (stockFilter === "High") return item.stock > 50;
        return true;
      });
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [medicines, search, statusFilter, categoryFilter, stockFilter, sortConfig]);

  // Pagination
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / rowsPerPage);

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getStockBadge = stock => {
    if (stock <= 5) return <Badge bg="danger">Low</Badge>;
    if (stock <= 20) return <Badge bg="warning">Medium</Badge>;
    return <Badge bg="success">High</Badge>;
  };

  return (
    <div className="container my-4 px-4">

      {/* Header */}
      <div className="box_shadow mb-3 p-3 bg-white d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0">Medicine List</h5>
        <Button size="sm" className="button" onClick={handleAddMedicine}>
          <FiPlus className="me-1" /> Add Medicine
        </Button>
      </div>

    

      {/* Table */}
      <div className="box_shadow p-3 bg-white table-responsive">
         {/* Filter Section */}
<div className="mb-4">
  <Row className="g-3 align-items-center">

    {/* Search Input */}
    <Col lg={3} md={6}>
      <InputGroup>
        <InputGroup.Text><FiSearch /></InputGroup.Text>
        <Form.Control
          placeholder="Search name, code..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </InputGroup>
    </Col>

    {/* Category */}
    <Col lg={2} md={6}>
      <Form.Select
        value={categoryFilter}
        onChange={e => setCategoryFilter(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Tablet">Tablet</option>
        <option value="Capsule">Capsule</option>
        <option value="Syrup">Syrup</option>
      </Form.Select>
    </Col>

    {/* Status */}
    <Col lg={2} md={6}>
      <Form.Select
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </Form.Select>
    </Col>

    {/* Stock */}
    <Col lg={2} md={6}>
      <Form.Select
        value={stockFilter}
        onChange={e => setStockFilter(e.target.value)}
      >
        <option value="All">All Stock</option>
        <option value="Low">Low (&lt;20)</option>
        <option value="Medium">Medium (20-50)</option>
        <option value="High">High (&gt;50)</option>
      </Form.Select>
    </Col>

    {/* Buttons */}
    <Col lg={3} md={12}>
      <div className="d-flex gap-2">
        <Button
          className="button flex-fill"
          onClick={() => setCurrentPage(1)}
        >
          Search
        </Button>

        <Button
          variant="outline-secondary"
          className="flex-fill"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </div>
    </Col>

  </Row>
</div>
<hr/>
        <Table hover className="align-middle saas-table mb-0">
          <thead>
            <tr>
              <th onClick={() => handleSort("code")} style={{ cursor: "pointer" }}>Code</th>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>Name</th>
              <th>Category</th>
              <th onClick={() => handleSort("price")} style={{ cursor: "pointer" }}>Price (₹)</th>
              <th onClick={() => handleSort("stock")} style={{ cursor: "pointer" }}>Stock</th>
              <th>Expiry</th>
              <th>Status</th>
              <th className="text-end"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id}>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.stock} {getStockBadge(item.stock)}</td>
                <td className="text-muted small">{item.expiry}</td>
                <td><Badge bg={item.status === "Active" ? "success" : "secondary"}>{item.status}</Badge></td>
                <td className="text-end">
                  <Dropdown align="end">
                    <Dropdown.Toggle as="button" className="saas-dot-btn">
                      <FiMoreVertical size={16} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleMenuAction(item.id, item.status === "Active" ? "deactivate" : "activate")
                        }
                      >
                        {item.status === "Active" ? "Deactivate" : "Activate"}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="text-danger" onClick={() => handleMenuAction(item.id, "delete")}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}

            {currentData.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-muted">No medicines found</td>
              </tr>
            )}
          </tbody>

         {/* Advanced Pagination */}
{totalPages > 0 && (
  <tfoot>
    <tr>
      <td colSpan="8">
        <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
          
          {/* Showing X–Y of Z */}
          <small className="text-muted">
            Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–
            {Math.min(indexOfLast, filtered.length)} of {filtered.length} medicines
          </small>

          <Stack direction="horizontal" gap={2}>
  <Button
    size="sm"
    variant="outline-primary"
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
  >
    Prev
  </Button>

  {[...Array(totalPages)].map((_, index) => {
    const pageNumber = index + 1;
    return (
      <Button
        key={pageNumber}
        size="sm"
        variant={currentPage === pageNumber ? "primary" : "outline-primary"}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </Button>
    );
  })}

  <Button
    size="sm"
    variant="outline-primary"
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
  >
    Next
  </Button>
</Stack>
        </div>
      </td>
    </tr>
  </tfoot>
)}
        </Table>
      </div>
    </div>
  );
}

export default MedicineList;