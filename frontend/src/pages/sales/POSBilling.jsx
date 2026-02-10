import React, { useState, useMemo } from 'react';
import { Table, Dropdown, Badge, InputGroup, Form, Button, Card } from 'react-bootstrap';
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiMoreHorizontal
} from 'react-icons/fi';

const POSBilling = () => {

  // Sample Billing Items
  const [bills] = useState([
    { id: 1, billNo: 'POS-1001', customer: 'Walk-in', items: 3, total: '$120', method: 'Cash', date: '02 May 2025', status: 'Paid' },
    { id: 2, billNo: 'POS-1002', customer: 'Susan Babin', items: 2, total: '$75', method: 'Card', date: '01 May 2025', status: 'Paid' },
    { id: 3, billNo: 'POS-1003', customer: 'Carol Lam', items: 4, total: '$210', method: 'UPI', date: '30 Apr 2025', status: 'Pending' },
    { id: 4, billNo: 'POS-1004', customer: 'Marsha Noland', items: 1, total: '$40', method: 'Cash', date: '29 Apr 2025', status: 'Cancelled' },
    { id: 5, billNo: 'POS-1005', customer: 'Irma Armstrong', items: 5, total: '$300', method: 'Card', date: '28 Apr 2025', status: 'Paid' },
    { id: 6, billNo: 'POS-1006', customer: 'Jesus Adams', items: 2, total: '$95', method: 'UPI', date: '27 Apr 2025', status: 'Pending' },
  ]);

  const [filter, setFilter] = useState({ search: '', status: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter logic
  const filteredBills = useMemo(() => {
    return bills.filter(b =>
      b.billNo.toLowerCase().includes(filter.search.toLowerCase()) &&
      (!filter.status.length || filter.status.includes(b.status))
    );
  }, [bills, filter]);

  const totalPages = Math.ceil(filteredBills.length / rowsPerPage);
  const paginated = filteredBills.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const resetFilters = () => setFilter({ search: '', status: [] });

  const statusColor = (status) => {
    if (status === 'Paid') return 'success';
    if (status === 'Pending') return 'warning';
    return 'danger';
  };

  return (
    <div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">POS Billing</h5>
          <Badge bg="primary" className="rounded-pill">
            Total Bills: {bills.length}
          </Badge>
        </div>

        <Button size="sm" className="d-flex align-items-center gap-1">
          <FiPlus size={16}/> New Bill
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
              placeholder="Search Bill"
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
            {['Paid', 'Pending', 'Cancelled'].map(status => (
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
              <th>Bill No</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((bill) => (
              <tr key={bill.id}>
                <td className="fw-semibold">{bill.billNo}</td>
                <td>{bill.customer}</td>
                <td>{bill.items}</td>
                <td>{bill.total}</td>
                <td>{bill.method}</td>
                <td>{bill.date}</td>

                <td>
                  <Badge bg={statusColor(bill.status)} className="rounded-pill">
                    {bill.status}
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
                      <Dropdown.Item>Print</Dropdown.Item>
                      <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
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
            <Button size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
              &lt;
            </Button>
            <Button size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
              &gt;
            </Button>
          </div>
        </div>
      </Card>

    </div>
  );
};

export default POSBilling;
 