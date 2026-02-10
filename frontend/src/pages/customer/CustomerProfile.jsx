import React from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Button,
  Stack,
  Tabs,
  Tab,
  Table,
  Form,
  Badge
} from "react-bootstrap";

import {
  FaPhone,
  FaCommentDots,
  FaVideo,
  FaCalendarAlt,
  FaTint,
  FaHeartbeat,
  FaLungs,
  FaThermometerHalf,
  FaUser,
  FaEnvelope
} from "react-icons/fa";

import { BsThreeDotsVertical, BsFilter } from "react-icons/bs";

/* ---------------- DATA ---------------- */

const appointments = [
  {
    date: "30 Apr 2025 - 09:30 AM",
    doctor: "Dr. Mick Thompson",
    role: "Cardiologist",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    mode: "In-person",
    status: "Checked Out",
    variant: "primary",
  },
  {
    date: "15 Apr 2025 - 11:20 AM",
    doctor: "Dr. Sarah Johnson",
    role: "Orthopedic Surgeon",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    mode: "Online",
    status: "Checked In",
    variant: "warning",
  },
];

const transactions = [
  {
    id: "#TNX0025",
    desc: "General Consultation",
    date: "30 Apr 2025",
    method: "PayPal",
    amount: "$800",
    status: "Completed",
    variant: "success",
  },
  {
    id: "#TNX0024",
    desc: "Dental Cleaning",
    date: "15 Apr 2025",
    method: "Debit Card",
    amount: "$930",
    status: "Pending",
    variant: "primary",
  },
];

/* ---------------- COMPONENT ---------------- */

const PatientProfile = () => {
  return (
    <>
      <Row className="p-3 bg-light">

        {/* ================= HEADER ================= */}
        <Col xs={12}>
          <Card className="mb-3">
            <Card.Body>
              <Row className="align-items-center">

                <Col xs="auto">
                  <Image
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    rounded
                    width={100}
                    height={100}
                  />
                </Col>

                <Col>
                  <div className="text-primary fw-semibold">#PT0025</div>
                  <h5 className="mb-1 fw-bold">Alberto Ripley</h5>
                  <div className="text-muted">
                    4150 Hiney Road, Las Vegas, NV 89109
                  </div>

                  <Stack direction="horizontal" gap={4} className="mt-2">
                    <div className="text-muted">
                      <FaPhone className="me-1"/>
                      Phone : +1 54546 45648
                    </div>

                    <div className="text-muted">
                      <FaCalendarAlt className="me-1"/>
                      Last Visited : 30 Apr 2025
                    </div>
                  </Stack>
                </Col>

                <Col xs={12} md="auto">
                  <Stack gap={2} className="align-items-md-end">

                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="justify-content-start justify-content-md-end"
                    >
                      <Button variant="light" className="rounded-circle border d-flex align-items-center justify-content-center p-2">
                        <FaPhone/>
                      </Button>

                      <Button variant="light" className="rounded-circle border d-flex align-items-center justify-content-center p-2">
                        <FaCommentDots/>
                      </Button>

                      <Button variant="light" className="rounded-circle border d-flex align-items-center justify-content-center p-2">
                        <FaVideo/>
                      </Button>
                    </Stack>

                    <Button
                      variant="primary"
                      size="sm"
                      className="mt-3 align-self-start align-self-md-end"
                    >
                      Book Appointment
                    </Button>

                  </Stack>
                </Col>

              </Row>
            </Card.Body>
          </Card>
        </Col>


        {/* ================= ABOUT + VITAL ================= */}
        <Col xs={12}>
          <Row className="align-items-stretch">

            {/* About */}
            <Col md={5} className="d-flex">
              <Card className="h-100 w-100">
                <Card.Header className="fw-bold">About</Card.Header>

                <Card.Body>
                  <Row className="g-3">

                    <Col xs={6}>
                      <Stack direction="horizontal" gap={2}>
                        <Button variant="light"><FaCalendarAlt/></Button>
                        <div>
                          <div className="fw-semibold small">DOB</div>
                          <div className="text-muted small">25 Jan 1990</div>
                        </div>
                      </Stack>
                    </Col>

                    <Col xs={6}>
                      <Stack direction="horizontal" gap={2}>
                        <Button variant="light"><FaTint/></Button>
                        <div>
                          <div className="fw-semibold small">Blood Group</div>
                          <div className="text-muted small">O +ve</div>
                        </div>
                      </Stack>
                    </Col>

                    <Col xs={6}>
                      <Stack direction="horizontal" gap={2}>
                        <Button variant="light"><FaUser/></Button>
                        <div>
                          <div className="fw-semibold small">Gender</div>
                          <div className="text-muted small">Male</div>
                        </div>
                      </Stack>
                    </Col>

                    <Col xs={6}>
                      <Stack direction="horizontal" gap={2}>
                        <Button variant="light"><FaEnvelope/></Button>
                        <div>
                          <div className="fw-semibold small">Email</div>
                          <div className="text-muted small">alberto@example.com</div>
                        </div>
                      </Stack>
                    </Col>

                  </Row>
                </Card.Body>
              </Card>
            </Col>


            {/* Vital Signs */}
            <Col md={7} className="d-flex">
              <Card className="h-100 w-100">
                <Card.Header className="fw-bold">Vital Signs</Card.Header>

                <Card.Body>
                  <Row className="g-3">

                    {[
                      ["Blood Pressure","100/67 mmHg",<FaTint/>],
                      ["Heart Rate","89 Bpm",<FaHeartbeat/>],
                      ["SPO2","98 %",<FaLungs/>],
                      ["Temperature","101 C",<FaThermometerHalf/>],
                      ["Respiratory Rate","24 rpm",<FaLungs/>],
                      ["Weight","100 kg",<FaUser/>],
                    ].map((v,i)=>(
                      <Col md={4} key={i}>
                        <Stack direction="horizontal" gap={2}>
                          <Button variant="light">{v[2]}</Button>
                          <div>
                            <div className="fw-semibold small">{v[0]}</div>
                            <div className="small">{v[1]}</div>
                          </div>
                        </Stack>
                      </Col>
                    ))}

                  </Row>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Col>


        {/* ================= TABLE SECTION ================= */}
        <Col xs={12} className="mt-3">

          <Card>
            <Card.Body>

              <Tabs defaultActiveKey="appointments">

                {/* Appointments */}
                <Tab eventKey="appointments" title="Appointments">

                  <Row className=" g-2 align-items-center">
                    <Col md={4}>
                      <Form.Control placeholder="Search"/>
                    </Col>

                    <Col md="auto">
                      <Form.Control defaultValue="2026/02/04 - 2026/02/10"/>
                    </Col>

                    <Col className="text-md-end">
                      <Button variant="light">
                        <BsFilter className="me-1"/>Filters
                      </Button>
                    </Col>
                  </Row>

                  <Table hover responsive>
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Mode</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {appointments.map((a,i)=>(
                        <tr key={i}>
                          <td>{a.date}</td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <Image src={a.img} roundedCircle width={36}/>
                              <div>
                                <div className="fw-semibold">{a.doctor}</div>
                                <small className="text-muted">{a.role}</small>
                              </div>
                            </div>
                          </td>

                          <td>{a.mode}</td>

                          <td>
                            <Badge bg={a.variant}>{a.status}</Badge>
                          </td>

                          <td className="text-end">
                            <Button size="sm" variant="light">
                              <BsThreeDotsVertical/>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                </Tab>


                {/* Transactions */}
                <Tab eventKey="transactions" title="Transactions">

                  <Table hover responsive className="mt-1">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.map((t,i)=>(
                        <tr key={i}>
                          <td>{t.id}</td>
                          <td>{t.desc}</td>
                          <td>{t.date}</td>
                          <td>{t.method}</td>
                          <td>{t.amount}</td>
                          <td>
                            <Badge bg={t.variant}>{t.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                </Tab>

              </Tabs>

            </Card.Body>
          </Card>

        </Col>

      </Row>
    </>
  );
};

export default PatientProfile;
