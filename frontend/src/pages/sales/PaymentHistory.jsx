import React, { useState, useMemo } from 'react';
import { Table, Dropdown, Badge, InputGroup, Form, Button, Card } from 'react-bootstrap';
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiMoreHorizontal
} from 'react-icons/fi';

const PaymentHistory = () => {

  // Payment Data
  const [payments] = useState([
    { id: 1, txn: 'TXN-1001', payer: 'Alberto Ripley', method: 'Card', amount: '$120', date: '02 May 2025', status: 'Success' },
    { id: 2, txn: 'TXN-1002', payer: 'Susan Babin', method: 'UPI', amount: '$85', date: '28 Apr 2025', status: 'Pending' },
    { id: 3, txn: 'TXN-1003', payer: 'Carol Lam', method: 'Cash', amount: '$40', date: '20 Apr 2025', status: 'Success' },
    { id: 4, txn: 'TXN-1004', payer: 'Marsha Noland', method: 'Card', amount: '$210', date: '18 Apr 2025', status: 'Failed' },
    { id: 5, txn: 'TXN-1005', payer: 'Irma Armstrong', method: 'UPI', amount: '$90', date: '10 Apr 2025', status: 'Success' },
    { id: 6, txn: 'TXN-1006', payer: 'Jesus Adams', method: 'Card', amount: '$60', date: '05 Apr 2025', status: 'Pending' },
    { id: 7, txn: 'TXN-1007', payer: 'Ezra Belcher', method: 'Cash', amount: '$140', date: '29 Mar 2025', status: 'Success' },
    { id: 8, txn: 'TXN-1008', payer: 'Glen Lentz', method: 'UPI', amount: '$50', date: '21 Mar 2025', status: 'Failed' },
  ]);

  const [filter, setFilter] = useState({ search: '', status: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtering
  const filteredPayments = useMemo(() => {
    return payments.filter(p =>
      p.txn.toLowerCase().includes(filter.search.toLowerCase()) &&
      (!filter.status.length || filter.status.includes(p.status))
    );
  }, [payments, filter]);

  const totalPages = Math.ceil(filteredPayments.length / rowsPerPage);
  const paginated = filteredPayments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const resetFilters = () => setFilter({ search: '', status: [] });

  const statusColor = (status) => {
    if (status === 'Success') return 'success';
    if (status === 'Pending') return 'warning';
    return 'danger';
  };

  return (
    <div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">Payment History</h5>
          <Badge bg="primary" className="rounded-pill">
            Total Transactions: {payments.length}
          </Badge>
        </div>

        <Button size="sm" className="d-flex align-items-center gap-1">
          <FiPlus size={16} /> Record Payment
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
              placeholder="Search Transaction"
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
            {['Success', 'Pending', 'Failed'].map(status => (
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
              <th>Transaction</th>
              <th>Payer</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((pay) => (
              <tr key={pay.id}>
                <td className="fw-semibold">{pay.txn}</td>
                <td>{pay.payer}</td>
                <td>{pay.method}</td>
                <td>{pay.amount}</td>
                <td>{pay.date}</td>

                <td>
                  <Badge bg={statusColor(pay.status)} className="rounded-pill">
                    {pay.status}
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
                      <Dropdown.Item>View Receipt</Dropdown.Item>
                      <Dropdown.Item>Download</Dropdown.Item>
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

export default PaymentHistory;
