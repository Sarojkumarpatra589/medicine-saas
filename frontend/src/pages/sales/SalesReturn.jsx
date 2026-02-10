import React, { useState, useMemo } from 'react';
import { Table, Dropdown, Badge, InputGroup, Form, Button, Card } from 'react-bootstrap';
import {
  FiPlus,
  FiFilter,
  FiSearch,
  FiMoreHorizontal
} from 'react-icons/fi';

const SalesReturn = () => {

  // Sample Return Data
  const [returns] = useState([
    { id: 1, returnNo: 'RET-1001', orderNo: 'ORD-1001', customer: 'Alberto Ripley', product: 'BP Monitor', qty: 1, amount: '$75', date: '05 May 2025', status: 'Approved' },
    { id: 2, returnNo: 'RET-1002', orderNo: 'ORD-1004', customer: 'Susan Babin', product: 'Thermometer', qty: 2, amount: '$50', date: '03 May 2025', status: 'Pending' },
    { id: 3, returnNo: 'RET-1003', orderNo: 'ORD-1006', customer: 'Carol Lam', product: 'Glucose Meter', qty: 1, amount: '$60', date: '01 May 2025', status: 'Rejected' },
    { id: 4, returnNo: 'RET-1004', orderNo: 'ORD-1007', customer: 'Marsha Noland', product: 'Wheelchair', qty: 1, amount: '$210', date: '30 Apr 2025', status: 'Approved' },
    { id: 5, returnNo: 'RET-1005', orderNo: 'ORD-1010', customer: 'Irma Armstrong', product: 'First Aid Kit', qty: 1, amount: '$30', date: '28 Apr 2025', status: 'Pending' },
    { id: 6, returnNo: 'RET-1006', orderNo: 'ORD-1012', customer: 'Jesus Adams', product: 'Oxygen Mask', qty: 3, amount: '$105', date: '26 Apr 2025', status: 'Approved' },
  ]);

  const [filter, setFilter] = useState({ search: '', status: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter logic
  const filteredReturns = useMemo(() => {
    return returns.filter(r =>
      r.returnNo.toLowerCase().includes(filter.search.toLowerCase()) &&
      (!filter.status.length || filter.status.includes(r.status))
    );
  }, [returns, filter]);

  const totalPages = Math.ceil(filteredReturns.length / rowsPerPage);
  const paginated = filteredReturns.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const resetFilters = () => setFilter({ search: '', status: [] });

  const statusColor = (status) => {
    if (status === 'Approved') return 'success';
    if (status === 'Pending') return 'warning';
    return 'danger';
  };

  return (
    <div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">Sales Return</h5>
          <Badge bg="primary" className="rounded-pill">
            Total Returns: {returns.length}
          </Badge>
        </div>

        <Button size="sm" className="d-flex align-items-center gap-1">
          <FiPlus size={16}/> New Return
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <div style={{ width: '250px' }}>
          <InputGroup size="sm">
            <InputGroup.Text className="bg-white border-end-0">
              <FiSearch size={14}/>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search Return"
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
            <FiFilter size={14}/> Filters
          </Dropdown.Toggle>

          <Dropdown.Menu className="p-3">
            {['Approved', 'Pending', 'Rejected'].map(status => (
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
              <th>Return No</th>
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
            {paginated.map((ret) => (
              <tr key={ret.id}>
                <td className="fw-semibold">{ret.returnNo}</td>
                <td>{ret.orderNo}</td>
                <td>{ret.customer}</td>
                <td>{ret.product}</td>
                <td>{ret.qty}</td>
                <td>{ret.amount}</td>
                <td>{ret.date}</td>

                <td>
                  <Badge bg={statusColor(ret.status)} className="rounded-pill">
                    {ret.status}
                  </Badge>
                </td>

                <td className="text-end">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="light"
                      size="sm"
                      className="border-0"
                    >
                      <FiMoreHorizontal/>
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

export default SalesReturn;
