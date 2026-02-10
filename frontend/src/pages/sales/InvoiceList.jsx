import React, { useState, useMemo } from 'react';
import { Table, Dropdown, Badge, InputGroup, Form, Button, Card } from 'react-bootstrap';
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiMoreHorizontal
} from 'react-icons/fi';

const InvoiceList = () => {

  // Invoice Data
  const [invoices] = useState([
    { id: 1, invoiceNo: 'INV-1001', client: 'Alberto Ripley', amount: '$520', date: '02 May 2025', due: '12 May 2025', status: 'Paid' },
    { id: 2, invoiceNo: 'INV-1002', client: 'Susan Babin', amount: '$860', date: '28 Apr 2025', due: '10 May 2025', status: 'Pending' },
    { id: 3, invoiceNo: 'INV-1003', client: 'Carol Lam', amount: '$240', date: '20 Apr 2025', due: '30 Apr 2025', status: 'Overdue' },
    { id: 4, invoiceNo: 'INV-1004', client: 'Marsha Noland', amount: '$920', date: '18 Apr 2025', due: '01 May 2025', status: 'Paid' },
    { id: 5, invoiceNo: 'INV-1005', client: 'Irma Armstrong', amount: '$150', date: '10 Apr 2025', due: '22 Apr 2025', status: 'Pending' },
    { id: 6, invoiceNo: 'INV-1006', client: 'Jesus Adams', amount: '$430', date: '05 Apr 2025', due: '18 Apr 2025', status: 'Paid' },
    { id: 7, invoiceNo: 'INV-1007', client: 'Ezra Belcher', amount: '$720', date: '29 Mar 2025', due: '10 Apr 2025', status: 'Overdue' },
    { id: 8, invoiceNo: 'INV-1008', client: 'Glen Lentz', amount: '$300', date: '21 Mar 2025', due: '01 Apr 2025', status: 'Paid' },
  ]);

  const [filter, setFilter] = useState({ search: '', status: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter Logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter(i =>
      i.invoiceNo.toLowerCase().includes(filter.search.toLowerCase()) &&
      (!filter.status.length || filter.status.includes(i.status))
    );
  }, [invoices, filter]);

  const totalPages = Math.ceil(filteredInvoices.length / rowsPerPage);
  const paginated = filteredInvoices.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const resetFilters = () => setFilter({ search: '', status: [] });

  // Status color
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
          <h5 className="mb-0 fw-semibold">Invoice List</h5>
          <Badge bg="primary" className="rounded-pill">
            Total Invoices: {invoices.length}
          </Badge>
        </div>

        <Button size="sm" className="d-flex align-items-center gap-1">
          <FiPlus size={16} /> New Invoice
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div style={{ width: '250px' }}>
          <InputGroup size="sm">
            <InputGroup.Text className="bg-white border-end-0">
              <FiSearch size={14} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search Invoice"
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
            <Form.Check
              type="checkbox"
              label="Paid"
              checked={filter.status.includes('Paid')}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filter.status, 'Paid']
                  : filter.status.filter(s => s !== 'Paid');
                setFilter({ ...filter, status: updated });
              }}
            />
            <Form.Check
              type="checkbox"
              label="Pending"
              checked={filter.status.includes('Pending')}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filter.status, 'Pending']
                  : filter.status.filter(s => s !== 'Pending');
                setFilter({ ...filter, status: updated });
              }}
            />
            <Form.Check
              type="checkbox"
              label="Overdue"
              checked={filter.status.includes('Overdue')}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...filter.status, 'Overdue']
                  : filter.status.filter(s => s !== 'Overdue');
                setFilter({ ...filter, status: updated });
              }}
            />

            <div className="d-flex gap-2 mt-2">
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
              <th>Invoice</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((inv) => (
              <tr key={inv.id}>
                <td className="fw-semibold">{inv.invoiceNo}</td>
                <td>{inv.client}</td>
                <td>{inv.amount}</td>
                <td>{inv.date}</td>
                <td>{inv.due}</td>
                <td>
                  <Badge bg={statusColor(inv.status)} className="rounded-pill">
                    {inv.status}
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

export default InvoiceList;
