import React, { useState, useMemo } from 'react';
import { Table, Dropdown, Badge, InputGroup, Form, Button, Card } from 'react-bootstrap';
import { 
  FiPlus, FiFilter, FiSearch, FiChevronDown, FiMoreHorizontal
} from 'react-icons/fi';

const PrescriptionList = () => {
  const [prescriptions] = useState([
    { id: 1, patient: 'Alberto Ripley', details: '26, Male', phone: '+1 41245 54132', doctor: 'Dr. Mick Thompson', department: 'Cardiologist', medicine: 'Atorvastatin 10mg', date: '30 Apr 2025', status: 'Active' },
    { id: 2, patient: 'Susan Babin', details: '21, Female', phone: '+1 54554 54789', doctor: 'Dr. Sarah Johnson', department: 'Orthopedic', medicine: 'Ibuprofen 200mg', date: '15 Apr 2025', status: 'Completed' },
    { id: 3, patient: 'Carol Lam', details: '28, Female', phone: '+1 43554 54985', doctor: 'Dr. Emily Carter', department: 'Pediatrician', medicine: 'Amoxicillin 500mg', date: '02 Apr 2025', status: 'Active' },
    { id: 4, patient: 'Marsha Noland', details: '25, Female', phone: '+1 47554 54257', doctor: 'Dr. David Lee', department: 'Gynecologist', medicine: 'Folic Acid', date: '27 Mar 2025', status: 'Completed' },
    { id: 5, patient: 'Irma Armstrong', details: '32, Female', phone: '+1 54114 57526', doctor: 'Dr. Anna Kim', department: 'Psychiatrist', medicine: 'Sertraline', date: '12 Mar 2025', status: 'Active' },
    { id: 6, patient: 'Jesus Adams', details: '27, Male', phone: '+1 51247 56574', doctor: 'Dr. John Smith', department: 'Neurosurgeon', medicine: 'Gabapentin', date: '05 Mar 2025', status: 'Completed' },
    { id: 7, patient: 'Ezra Belcher', details: '28, Male', phone: '+1 41452 25741', doctor: 'Dr. Lisa White', department: 'Oncologist', medicine: 'Tamoxifen', date: '24 Feb 2025', status: 'Active' },
    { id: 8, patient: 'Glen Lentz', details: '22, Male', phone: '+1 51425 21498', doctor: 'Dr. Patricia Brown', department: 'Pulmonologist', medicine: 'Salbutamol', date: '16 Feb 2025', status: 'Completed' },
  ]);

  const [filter, setFilter] = useState({ search: '', status: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    return prescriptions.filter(p => 
      p.patient.toLowerCase().includes(filter.search.toLowerCase()) &&
      (!filter.status.length || filter.status.includes(p.status))
    );
  }, [prescriptions, filter]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const resetFilters = () => setFilter({ search: '', status: [] });

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-semibold">Prescription List</h5>
          <Badge bg="primary" className="rounded-pill">
            Total Prescriptions: {prescriptions.length}
          </Badge>
        </div>

        <div className="d-flex gap-2">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              Export <FiChevronDown size={14} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Export PDF</Dropdown.Item>
              <Dropdown.Item>Export Excel</Dropdown.Item>
              <Dropdown.Item>Export CSV</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Button variant="primary" size="sm">
            <FiPlus /> New Prescription
          </Button>
        </div>
      </div>

      {/* Search / Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ width: '250px' }}>
          <InputGroup size="sm">
            <InputGroup.Text className="bg-white border-end-0">
              <FiSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search Patient"
              className="border-start-0"
              value={filter.search}
              onChange={(e)=>setFilter({...filter, search:e.target.value})}
            />
          </InputGroup>
        </div>

        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" size="sm">
            <FiFilter /> Filters
          </Dropdown.Toggle>

          <Dropdown.Menu className="p-3">
            <Form.Check
              label="Active"
              checked={filter.status.includes('Active')}
              onChange={(e)=>{
                const s = e.target.checked
                  ? [...filter.status,'Active']
                  : filter.status.filter(x=>x!=='Active');
                setFilter({...filter,status:s});
              }}
            />
            <Form.Check
              label="Completed"
              checked={filter.status.includes('Completed')}
              onChange={(e)=>{
                const s = e.target.checked
                  ? [...filter.status,'Completed']
                  : filter.status.filter(x=>x!=='Completed');
                setFilter({...filter,status:s});
              }}
            />
            <Button size="sm" className="mt-2 w-100" onClick={resetFilters}>
              Reset
            </Button>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Table */}
      <Card className="border shadow-lg">
        <Table hover responsive className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>Patient</th>
              <th>Phone</th>
              <th>Doctor</th>
              <th>Medicine</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={`https://i.pravatar.cc/32?img=${p.id}`}
                      className="rounded-circle"
                      alt=""
                    />
                    <div>
                      <div className="fw-semibold">{p.patient}</div>
                      <small className="text-muted">{p.details}</small>
                    </div>
                  </div>
                </td>

                <td>{p.phone}</td>

                <td>
                  <div>
                    <div className="fw-semibold">{p.doctor}</div>
                    <small className="text-muted">{p.department}</small>
                  </div>
                </td>

                <td>{p.medicine}</td>
                <td>{p.date}</td>

                <td>
                  <Badge bg={p.status === 'Active' ? 'success':'secondary'}>
                    {p.status}
                  </Badge>
                </td>

                <td>
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="light" size="sm">
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
          <div>
            <small>Rows per page </small>
            <Form.Select
              size="sm"
              value={rowsPerPage}
              onChange={(e)=>setRowsPerPage(Number(e.target.value))}
              style={{width:'80px',display:'inline'}}
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </Form.Select>
          </div>

          <div>
            <Button size="sm" disabled={currentPage===1}
              onClick={()=>setCurrentPage(currentPage-1)}>
              &lt;
            </Button>
            <Button size="sm" className="mx-2">{currentPage}</Button>
            <Button size="sm" disabled={currentPage===totalPages}
              onClick={()=>setCurrentPage(currentPage+1)}>
              &gt;
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionList;
