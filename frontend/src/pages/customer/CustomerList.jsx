import React, { useState, useMemo } from 'react';
import { Table, Dropdown, Badge, InputGroup, Form, Button, Card, ButtonGroup } from 'react-bootstrap';
import { 
  FiPlus, FiFilter, FiSearch, FiCalendar, FiChevronDown, FiMoreHorizontal, FiList, FiGrid
} from 'react-icons/fi';

const CustomerList = () => {
  const [customers] = useState([
    { id: 1, name: 'Alberto Ripley', ageGender: '26, Male', phone: '+1 41245 54132', assignedTo: 'Dr. Mick Thompson', department: 'Cardiologist', address: 'Miami, Florida', lastVisit: '30 Apr 2025', status: 'Available' },
    { id: 2, name: 'Susan Babin', ageGender: '21, Female', phone: '+1 54554 54789', assignedTo: 'Dr. Sarah Johnson', department: 'Orthopedic Surgeon', address: 'Austin, Texas', lastVisit: '15 Apr 2025', status: 'Unavailable' },
    { id: 3, name: 'Carol Lam', ageGender: '28, Female', phone: '+1 43554 54985', assignedTo: 'Dr. Emily Carter', department: 'Pediatrician', address: 'Seattle, Washington', lastVisit: '02 Apr 2025', status: 'Available' },
    { id: 4, name: 'Marsha Noland', ageGender: '25, Female', phone: '+1 47554 54257', assignedTo: 'Dr. David Lee', department: 'Gynecologist', address: 'Chicago, Illinois', lastVisit: '27 Mar 2025', status: 'Unavailable' },
    { id: 5, name: 'Irma Armstrong', ageGender: '32, Female', phone: '+1 54114 57526', assignedTo: 'Dr. Anna Kim', department: 'Psychiatrist', address: 'Phoenix, Arizona', lastVisit: '12 Mar 2025', status: 'Available' },
    { id: 6, name: 'Jesus Adams', ageGender: '27, Male', phone: '+1 51247 56574', assignedTo: 'Dr. John Smith', department: 'Neurosurgeon', address: 'Atlanta, Georgia', lastVisit: '05 Mar 2025', status: 'Unavailable' },
    { id: 7, name: 'Ezra Belcher', ageGender: '28, Male', phone: '+1 41452 25741', assignedTo: 'Dr. Lisa White', department: 'Oncologist', address: 'San Diego, California', lastVisit: '24 Feb 2025', status: 'Available' },
    { id: 8, name: 'Glen Lentz', ageGender: '22, Male', phone: '+1 51425 21498', assignedTo: 'Dr. Patricia Brown', department: 'Pulmonologist', address: 'Denver, Colorado', lastVisit: '16 Feb 2025', status: 'Unavailable' },
    { id: 9, name: 'Bernard Griffith', ageGender: '34, Male', phone: '+1 45214 98741', assignedTo: 'Dr. Rachel Green', department: 'Urologist', address: 'Boston, Massachusetts', lastVisit: '01 Feb 2025', status: 'Available' },
    { id: 10, name: 'John Elsass', ageGender: '23, Male', phone: '+1 41245 32540', assignedTo: 'Dr. Michael Smith', department: 'Cardiologist', address: 'Orlando, Florida', lastVisit: '25 Jan 2025', status: 'Unavailable' },
  ]);

  const [filter, setFilter] = useState({ search: '', status: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(filter.search.toLowerCase()) &&
      (!filter.status.length || filter.status.includes(c.status))
    );
  }, [customers, filter]);

  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const paginated = filteredCustomers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setFilter({ search: '', status: [] });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">Customers List</h5>
          <Badge bg="primary" className="rounded-pill">Total Customers: 565</Badge>
        </div>
        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
              Export <FiChevronDown size={14} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Export as PDF</Dropdown.Item>
              <Dropdown.Item>Export as Excel</Dropdown.Item>
              <Dropdown.Item>Export as CSV</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>



          <Button variant="primary" size="sm" className="d-flex align-items-center gap-1">
            <FiPlus size={16} /> New Patient
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ width: '250px' }}>
          <InputGroup size="sm">
            <InputGroup.Text className="bg-white border-end-0">
              <FiSearch size={14} />
            </InputGroup.Text>
            <Form.Control 
              type="search" 
              placeholder="Search" 
              className="border-start-0"
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
            />
          </InputGroup>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
              <FiFilter size={14} /> Filters
            </Dropdown.Toggle>
            <Dropdown.Menu className="p-3" style={{ minWidth: '200px' }}>
              <h6 className="mb-2" style={{ fontSize: '14px' }}>Filter by Status</h6>
              <Form.Check 
                type="checkbox"
                label="Available"
                id="filter-available"
                className="mb-2"
                checked={filter.status.includes('Available')}
                onChange={(e) => {
                  const newStatus = e.target.checked 
                    ? [...filter.status, 'Available'] 
                    : filter.status.filter(s => s !== 'Available');
                  setFilter({...filter, status: newStatus});
                }}
              />
              <Form.Check 
                type="checkbox"
                label="Unavailable"
                id="filter-unavailable"
                className="mb-3"
                checked={filter.status.includes('Unavailable')}
                onChange={(e) => {
                  const newStatus = e.target.checked 
                    ? [...filter.status, 'Unavailable'] 
                    : filter.status.filter(s => s !== 'Unavailable');
                  setFilter({...filter, status: newStatus});
                }}
              />
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" onClick={resetFilters} className="flex-fill">
                  Reset
                </Button>
                <Button variant="primary" size="sm" className="flex-fill">
                  Apply
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm" className="d-flex align-items-center gap-1">
              Sort By : Recent <FiChevronDown size={14} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Recent</Dropdown.Item>
              <Dropdown.Item>Oldest</Dropdown.Item>
              <Dropdown.Item>Name (A-Z)</Dropdown.Item>
              <Dropdown.Item>Name (Z-A)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* Table */}
      <Card className="border shadow-lg">
        <Table hover responsive className="mb-0" style={{ fontSize: '14px' }}>
          <thead className="bg-light">
            <tr>
              <th className="text-secondary fw-normal py-3 border-bottom" style={{ fontSize: '13px' }}>
                Patient <FiChevronDown size={12} className="ms-1" />
              </th>
              <th className="text-secondary fw-normal py-3 border-bottom" style={{ fontSize: '13px' }}>
                Phone <FiChevronDown size={12} className="ms-1" />
              </th>
              <th className="text-secondary fw-normal py-3 border-bottom" style={{ fontSize: '13px' }}>
                Doctor <FiChevronDown size={12} className="ms-1" />
              </th>
              <th className="text-secondary fw-normal py-3 border-bottom" style={{ fontSize: '13px' }}>
                Address <FiChevronDown size={12} className="ms-1" />
              </th>
              <th className="text-secondary fw-normal py-3 border-bottom" style={{ fontSize: '13px' }}>
                Last Visit <FiChevronDown size={12} className="ms-1" />
              </th>
              <th className="text-secondary fw-normal py-3 border-bottom" style={{ fontSize: '13px' }}>
                Status <FiChevronDown size={12} className="ms-1" />
              </th>
              <th className="text-secondary fw-normal py-3 border-bottom" style={{ fontSize: '13px' }}></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((customer) => (
              <tr key={customer.id}>
                <td className="align-middle py-3">
                  <div className="d-flex align-items-center gap-2">
                    <img 
                      src={`https://i.pravatar.cc/32?img=${customer.id}`} 
                      alt={customer.name}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="fw-semibold" style={{ fontSize: '14px' }}>{customer.name}</div>
                      <small className="text-muted" style={{ fontSize: '12px' }}>{customer.ageGender}</small>
                    </div>
                  </div>
                </td>
                <td className="align-middle py-3 text-muted">{customer.phone}</td>
                <td className="align-middle py-3">
                  <div className="d-flex align-items-center gap-2">
                    <img 
                      src={`https://i.pravatar.cc/28?img=${customer.id + 20}`} 
                      alt={customer.assignedTo}
                      className="rounded-circle"
                      style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="fw-semibold" style={{ fontSize: '13px' }}>{customer.assignedTo}</div>
                      <small className="text-muted" style={{ fontSize: '12px' }}>{customer.department}</small>
                    </div>
                  </div>
                </td>
                <td className="align-middle py-3 text-muted">{customer.address}</td>
                <td className="align-middle py-3 text-muted">{customer.lastVisit}</td>
                <td className="align-middle py-3">
                  <Badge 
                    bg={customer.status === 'Available' ? 'success' : 'danger'}
                    className="rounded-pill"
                    style={{ 
                      fontSize: '12px',
                      fontWeight: '500',
                      padding: '4px 12px'
                    }}
                  >
                    {customer.status}
                  </Badge>
                </td>
                <td className="align-middle py-3">
                  <div className="d-flex align-items-center justify-content-end gap-1">
                  
                    <Dropdown align="end">
                      <Dropdown.Toggle 
                        variant="light" 
                        size="sm"
                        className="border-0 p-1"
                        style={{ width: '28px', height: '28px' }}
                      >
                        <FiMoreHorizontal size={14} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>View Details</Dropdown.Item>
                        <Dropdown.Item>Edit</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Footer */}
        <div className="d-flex justify-content-between align-items-center px-3 py-2 border-top bg-light">
          <div className="d-flex align-items-center gap-2">
            <small className="text-muted">Rows per page:</small>
            <Form.Select 
              size="sm" 
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              style={{ width: 'auto', fontSize: '13px' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Form.Select>
            <small className="text-muted">of {filteredCustomers.length} Entries</small>
          </div>
          
          <div className="d-flex align-items-center gap-2">
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>
            <Button 
              variant="primary" 
              size="sm"
            >
              {currentPage}
            </Button>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CustomerList;