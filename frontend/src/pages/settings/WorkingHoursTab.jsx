import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { FiPlus, FiTrash2, FiEdit2, FiClock } from "react-icons/fi";

function WorkingHoursTab() {
  const [productiveTime, setProductiveTime] = useState("");

  const [workingDays, setWorkingDays] = useState({
    monday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    tuesday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    wednesday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    thursday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    friday: { enabled: true, startTime: "09:30 AM", endTime: "09:30 AM" },
    saturday: { enabled: false, startTime: "", endTime: "" },
    sunday: { enabled: false, startTime: "", endTime: "" },
  });

  const [breakHours, setBreakHours] = useState([
    {
      id: 1,
      label: "Morning Break",
      startTime: "09:30 AM",
      endTime: "09:30 AM",
    },
  ]);

  const [lunchBreak, setLunchBreak] = useState({
    duration: "45 Mins",
    time: "01:00 PM",
  });

  const toggleDay = (day) => {
    setWorkingDays({
      ...workingDays,
      [day]: { ...workingDays[day], enabled: !workingDays[day].enabled },
    });
  };

  const updateDayTime = (day, field, value) => {
    setWorkingDays({
      ...workingDays,
      [day]: { ...workingDays[day], [field]: value },
    });
  };

  const addBreakHour = () => {
    setBreakHours([
      ...breakHours,
      {
        id: Date.now(),
        label: "New Break",
        startTime: "09:30 AM",
        endTime: "09:30 AM",
      },
    ]);
  };

  const deleteBreakHour = (id) => {
    setBreakHours(breakHours.filter((brk) => brk.id !== id));
  };

  const dayNames = [
    { key: "monday", label: "Monday", color: "#4c5fce" },
    { key: "tuesday", label: "Tuesday", color: "#4c5fce" },
    { key: "wednesday", label: "Wednesday", color: "#4c5fce" },
    { key: "thursday", label: "Thursday", color: "#4c5fce" },
    { key: "friday", label: "Friday", color: "#4c5fce" },
    { key: "saturday", label: "Saturday", color: "#6c757d" },
    { key: "sunday", label: "Sunday", color: "#6c757d" },
  ];

  return (
    <div  style={{ backgroundColor: "#ffffff" }}>
      {/* Working Hours */}
      <h5 className="fw-bold ">Working Hours</h5>
      <hr className="mb-4" />

      <Row className="align-items-center mb-4">
        <Col md={3}>
          <Form.Label>
            Expected Productive Time <span className="text-danger">*</span>
          </Form.Label>
        </Col>

        <Col md={6}>
          <Form.Control
            size="sm"
            value={productiveTime}
            onChange={(e) => setProductiveTime(e.target.value)}
          />
        </Col>

        <Col md={3} className="text-end text-muted small">
          <FiClock className="me-1" /> Hours / Day
        </Col>
      </Row>

      {/* Working Days */}
      <h5 className="fw-bold mt-5 mb-3">Working Days</h5>
      <hr />

      {dayNames.map(({ key, label, color }) => (
        <Row key={key} className="align-items-center mb-3">
          <Col md={2}>
            <Form.Check
              type="switch"
              label={<span style={{ color }}>{label}</span>}
              checked={workingDays[key].enabled}
              onChange={() => toggleDay(key)}
            />
          </Col>

          <Col md={3}>
            <Form.Control
              size="sm"
              value={workingDays[key].startTime}
              disabled={!workingDays[key].enabled}
              onChange={(e) =>
                updateDayTime(key, "startTime", e.target.value)
              }
            />
          </Col>

          <Col md="auto">to</Col>

          <Col md={3}>
            <Form.Control
              size="sm"
              value={workingDays[key].endTime}
              disabled={!workingDays[key].enabled}
              onChange={(e) => updateDayTime(key, "endTime", e.target.value)}
            />
          </Col>
        </Row>
      ))}

      {/* Break Hours */}
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h5 className="fw-bold">Break Hours</h5>

        <Button variant="link" onClick={addBreakHour}>
          <FiPlus /> Add New
        </Button>
      </div>

      <hr />

      {breakHours.map((brk, index) => (
        <Row key={brk.id} className="align-items-center mb-3">
          <Col md={2}>
            <Form.Label>{brk.label}</Form.Label>
          </Col>

          <Col md={3}>
            <Form.Control
              size="sm"
              value={brk.startTime}
              onChange={(e) => {
                const updated = [...breakHours];
                updated[index].startTime = e.target.value;
                setBreakHours(updated);
              }}
            />
          </Col>

          <Col md="auto">to</Col>

          <Col md={3}>
            <Form.Control
              size="sm"
              value={brk.endTime}
              onChange={(e) => {
                const updated = [...breakHours];
                updated[index].endTime = e.target.value;
                setBreakHours(updated);
              }}
            />
          </Col>

          <Col md="auto">
            <Button variant="link">
              <FiEdit2 />
            </Button>
          </Col>

          <Col md="auto">
            <Button variant="link" onClick={() => deleteBreakHour(brk.id)}>
              <FiTrash2 />
            </Button>
          </Col>
        </Row>
      ))}

      {/* Lunch Break */}
      <h5 className="fw-bold mt-5 mb-3">Lunch Hours</h5>
      <hr />

      <Row className="align-items-center mb-4">
        <Col md={2}>
          <Form.Label>Lunch Break</Form.Label>
        </Col>

        <Col md={3}>
          <Form.Select
            size="sm"
            value={lunchBreak.duration}
            onChange={(e) =>
              setLunchBreak({ ...lunchBreak, duration: e.target.value })
            }
          >
            <option>15 Mins</option>
            <option>30 Mins</option>
            <option>45 Mins</option>
            <option>60 Mins</option>
            <option>90 Mins</option>
          </Form.Select>
        </Col>

        <Col md="auto">Lunch at</Col>

        <Col md={3}>
          <Form.Select
            size="sm"
            value={lunchBreak.time}
            onChange={(e) =>
              setLunchBreak({ ...lunchBreak, time: e.target.value })
            }
          >
            <option>12:00 PM</option>
            <option>12:30 PM</option>
            <option>01:00 PM</option>
            <option>01:30 PM</option>
            <option>02:00 PM</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top">
        <Button variant="outline-secondary" size="sm">
          Cancel
        </Button>

        <Button size="sm" style={{ background: "#4c5fce", border: "none" }}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default WorkingHoursTab;
