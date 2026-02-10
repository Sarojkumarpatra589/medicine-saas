import React, { useState, useMemo } from 'react';
import { Table, Dropdown, Badge, InputGroup, Form, Button, Card } from 'react-bootstrap';
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiMoreHorizontal
} from 'react-icons/fi';

const SalesList = () => {

  // Sales Data
  const [sales] = useState([
    { id: 1, orderNo: 'ORD-1001', customer: 'Alberto Ripley', product: 'Blood Test Kit', qty: 2, amount: '$120', date: '02 May 2025', status: 'Completed' },
    { id: 2, orderNo: 'ORD-1002', customer: 'Susan Babin', product: 'Thermometer', qty: 1, amount: '$25', date: '28 Apr 2025', status: 'Pending' },
    { id: 3, orderNo: 'ORD-1003', customer: 'Carol Lam', product: 'BP Monitor', qty: 1, amount: '$75', date: '20 Apr 2025', status: 'Completed' },
    { id: 4, orderNo: 'ORD-1004', customer: 'Marsha Noland', product: 'Wheelchair', qty: 1, amount: '$210', date: '18 Apr 2025', status: 'Cancelled' },
    { id: 5, orderNo: 'ORD-1005', customer: 'Irma Armstrong', product: 'First Aid Kit', qty: 3, amount: '$90', date: '10 Apr 2025', status: 'Completed' },
    { id: 6, orderNo: 'ORD-1006', customer: 'Jesus Adams', product: 'Glucose Meter', qty: 1, amount: '$60', date: '05 Apr 2025', status: 'Pending' },
    { id: 7, orderNo: 'ORD-1007', customer: 'Ezra Belcher', product: 'Oxygen Mask', qty: 4, amount: '$140', date: '29 Mar 2025', status: 'Completed' },
    { id: 8, orderNo: 'ORD-1008', customer: 'Glen Lentz', product: 'Syringe Pack', qty: 5, amount: '$50', date: '21 Mar 2025', status: 'Cancelled' },
  ]);

  const [filter, setFilter] = useState({ search: '', status: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter
  const filteredSales = useMemo(() => {
    return sales.filter(s =>
      s.orderNo.toLowerCase().includes(filter.search.toLowerCase()) &&
      (!filter.status.length || filter.status.includes(s.status))
    );
  }, [sales, filter]);

  const totalPages = Math.ceil(filteredSales.length / rowsPerPage);
  const paginated = filteredSales.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const resetFilters = () => setFilter({ search: '', status: [] });

  const statusColor = (status) => {
    if (status === 'Completed') return 'success';
    if (status === 'Pending') return 'warning';
    return 'danger';
  };

  return (
    <div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">Sales List</h5>
          <Badge bg="primary" className="rounded-pill">
            Total Sales: {sales.length}
          </Badge>
        </div>

        <Button size="sm" className="d-flex align-items-center gap-1">
          <FiPlus size={16} /> New Sale
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div style={{ width: '250px' }}>
          <InputGroup size="sm">
            <InputGroup.Text className="bg-white border-end-0">
              <FiSearch size={14} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search Order"
              className="border-start-0"
              value={filter.search}
              onChange={(e) =>
                setFilter({ ...filter, search: e.target.value })
              }
            />
          </InputGroup>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center gap-1"
          >
            <FiFilter size={14} /> Filters
          </Dropdown.Toggle>

          <Dropdown.Menu className="p-3">
            {['Completed', 'Pending', 'Cancelled'].map(status => (
              <Form.Check
                key={status}
                type="checkbox"
                label={status}
                checked={filter.status.includes(status)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filter.status, status]
                    : filter.status.filter(s => s !== status);
                  setFilter({ ...filter, status: updated });
                }}
              />
            ))}

            <div className="mt-2">
              <Button size="sm" variant="outline-secondary" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </Dropdown.Menu>
        </Dropdown>

      </div>

      {/* Table */}
      <Card className="border shadow-lg">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((sale) => (
              <tr key={sale.id}>
                <td className="fw-semibold">{sale.orderNo}</td>
                <td>{sale.customer}</td>
                <td>{sale.product}</td>
                <td>{sale.qty}</td>
                <td>{sale.amount}</td>
                <td>{sale.date}</td>

                <td>
                  <Badge bg={statusColor(sale.status)} className="rounded-pill">
                    {sale.status}
                  </Badge>
                </td>

                <td className="text-end">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      size="sm"
                      className="border-0"
                    >
                      <FiMoreHorizontal />
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

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top bg-light">
          <small>Page {currentPage} of {totalPages || 1}</small>

          <div className="d-flex gap-2">
            <Button
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              &lt;
            </Button>
            <Button
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              &gt;
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SalesList;
