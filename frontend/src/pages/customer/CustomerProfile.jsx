import React, { useState } from "react";
import { FaPhone, FaCommentDots, FaVideo, FaCalendarAlt, FaTint, FaHeartbeat, FaLungs, FaThermometerHalf, FaUser, FaEnvelope, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";
/* ───────────────── DATA ───────────────── */
const appointments = [
  {
    date: "30 Apr 2025",
    time: "09:30 AM",
    doctor: "Dr. Mick Thompson",
    role: "Cardiologist",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    mode: "In-person",
    status: "Checked Out",
    statusColor: "#6366f1",
  },
  {
    date: "15 Apr 2025",
    time: "11:20 AM",
    doctor: "Dr. Sarah Johnson",
    role: "Orthopedic Surgeon",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    mode: "Online",
    status: "Checked In",
    statusColor: "#f59e0b",
  },
  {
    date: "15 Apr 2025",
    time: "11:20 AM",
    doctor: "Dr. Sarah Johnson",
    role: "Orthopedic Surgeon",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    mode: "Online",
    status: "Checked In",
    statusColor: "#f59e0b",
  },
  {
    date: "15 Apr 2025",
    time: "11:20 AM",
    doctor: "Dr. Sarah Johnson",
    role: "Orthopedic Surgeon",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    mode: "Online",
    status: "Checked In",
    statusColor: "#f59e0b",
  },
  {
    date: "15 Apr 2025",
    time: "11:20 AM",
    doctor: "Dr. Sarah Johnson",
    role: "Orthopedic Surgeon",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    mode: "Online",
    status: "Checked In",
    statusColor: "#f59e0b",
  },
  {
    date: "15 Apr 2025",
    time: "11:20 AM",
    doctor: "Dr. Sarah Johnson",
    role: "Orthopedic Surgeon",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    mode: "Online",
    status: "Checked In",
    statusColor: "#f59e0b",
  },
  
];

const transactions = [
  { id: "#TNX0025", desc: "General Consultation", date: "30 Apr 2025", method: "PayPal", amount: "$800", status: "Completed", statusColor: "#10b981" },
  { id: "#TNX0024", desc: "Dental Cleaning", date: "15 Apr 2025", method: "Debit Card", amount: "$930", status: "Pending", statusColor: "#6366f1" },
];

/* ───────────────── STYLES ───────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pp-root {
    font-family: 'DM Sans', sans-serif;
    background: #f8f8fb;
    min-height: 100vh;
    color: #1a1a2e;
    padding: 20px;
  }

  .pp-layout { display: grid; grid-template-columns: 300px 1fr; gap: 20px; max-width: 1200px; margin: 0 auto; }

  /* ── Sidebar ── */
  .pp-sidebar { display: flex; flex-direction: column; gap: 16px; }

  .pp-card {
    background: #fff;
    padding: 24px;
  }

  .pp-profile-card { text-align: center; position: relative; overflow: hidden; }
  .pp-profile-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 90px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 20px 20px 60% 60% / 20px 20px 30px 30px;
  }

  .pp-avatar-wrap { position: relative; display: inline-block; margin-top: 20px; }
  .pp-avatar {
    width: 88px; height: 88px;
    border-radius: 50%;
    border: 4px solid #fff;
    object-fit: cover;
    position: relative;
    z-index: 1;
    box-shadow: 0 4px 20px rgba(99,102,241,0.25);
  }
  .pp-online-dot {
    position: absolute; bottom: 4px; right: 4px;
    width: 14px; height: 14px;
    background: #10b981;
    border: 2px solid #fff;
    border-radius: 50%;
    z-index: 2;
  }

  .pp-badge {
    display: inline-block;
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    background: #f0f0ff;
    color: #6366f1;
    padding: 3px 10px;
    border-radius: 20px;
    margin-top: 10px;
  }

  .pp-name {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin: 6px 0 2px;
  }

  .pp-meta-list { list-style: none; margin-top: 14px; text-align: left; }
  .pp-meta-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12.5px;
    color: #64748b;
    padding: 5px 0;
  }
  .pp-meta-list li svg { color: #6366f1; flex-shrink: 0; }

  .pp-actions { display: flex; gap: 8px; justify-content: center; margin-top: 18px; }
  .pp-icon-btn {
    width: 40px; height: 40px;
    border-radius: 12px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #6366f1;
    font-size: 15px;
    transition: all 0.2s;
  }
  .pp-icon-btn:hover { background: #6366f1; color: #fff; border-color: #6366f1; transform: translateY(-2px); }

  .pp-book-btn {
    margin-top: 14px;
    width: 100%;
    padding: 12px;
    border-radius: 14px;
    border: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(99,102,241,0.35);
  }
  .pp-book-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(99,102,241,0.45); }

  /* ── About Card ── */
  .pp-section-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #1a1a2e;
  }

  .pp-info-grid { display: grid; gap: 10px; }
  .pp-info-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px;
    background: #f8f8fb;
    border-radius: 12px;
  }
  .pp-info-icon {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
    display: flex; align-items: center; justify-content: center;
    color: #6366f1;
    font-size: 14px;
    flex-shrink: 0;
  }
  .pp-info-label { font-size: 10.5px; color: #94a3b8; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
  .pp-info-value { font-size: 13px; font-weight: 500; color: #1e293b; margin-top: 1px; }

  /* ── Main content ── */
  .pp-main { display: flex; flex-direction: column; gap: 20px; }

  /* ── Vitals ── */
  .pp-vitals-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .pp-vital-card {
    background: #fff;
    padding: 16px;
    display: flex; align-items: center; gap: 12px;
    transition: transform 0.2s;
  }
  .pp-vital-card:hover { transform: translateY(-3px); }
  .pp-vital-icon {
    width: 42px; height: 42px;
    border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }
  .pp-vital-label { font-size: 11px; color: #94a3b8; font-weight: 500; }
  .pp-vital-value { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #1a1a2e; margin-top: 2px; }

  /* ── Tabs ── */
  .pp-tabs { display: flex; gap: 4px; background: #f1f5f9; padding: 4px; border-radius: 14px; margin-bottom: 16px; width: fit-content; }
  .pp-tab {
    padding: 8px 20px;
    border-radius: 10px;
    border: none;
    background: transparent;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
  }
  .pp-tab.active { background: #fff; color: #6366f1; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

  /* ── Table ── */
  .pp-table-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
  }
  .pp-filter-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px;
    border-radius: 10px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
  }
  .pp-filter-btn:hover { border-color: #6366f1; color: #6366f1; }

  .pp-table { width: 100%; border-collapse: separate; border-spacing: 0; }
  .pp-table thead th {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94a3b8;
    padding: 0 16px 10px;
    text-align: left;
    border-bottom: 1.5px solid #f1f5f9;
  }
  .pp-table tbody tr { transition: background 0.15s; }
  .pp-table tbody tr:hover td { background: #fafbff; }
  .pp-table tbody td {
    padding: 14px 16px;
    font-size: 13px;
    color: #374151;
    border-bottom: 1px solid #f8f8fb;
    vertical-align: middle;
  }

  .pp-apt-doctor { display: flex; align-items: center; gap: 10px; }
  .pp-apt-avatar { width: 36px; height: 36px; border-radius: 10px; object-fit: cover; }
  .pp-apt-name { font-size: 13px; font-weight: 600; color: #1e293b; }
  .pp-apt-role { font-size: 11px; color: #94a3b8; }

  .pp-date-wrap { }
  .pp-date-main { font-size: 13px; font-weight: 500; }
  .pp-date-time { font-size: 11px; color: #94a3b8; }

  .pp-mode-badge {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 500;
  }
  .pp-mode-badge.online { background: #ecfdf5; color: #059669; }
  .pp-mode-badge.inperson { background: #eff6ff; color: #3b82f6; }
  .pp-mode-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  .pp-status-chip {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11.5px;
    font-weight: 600;
  }

  .pp-dots-btn {
    background: none; border: none; cursor: pointer;
    color: #94a3b8; font-size: 16px; padding: 4px 8px;
    border-radius: 8px; transition: all 0.15s;
  }
  .pp-dots-btn:hover { background: #f1f5f9; color: #374151; }

  .pp-tx-id { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: #6366f1; }
  .pp-tx-amount { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #1a1a2e; }

  @media (max-width: 900px) {
    .pp-layout { grid-template-columns: 1fr; }
    .pp-vitals-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

const vitals = [
  { label: "Blood Pressure", value: "100/67 mmHg", Icon: FaTint, bg: "#fce7f3", color: "#ec4899" },
  { label: "Heart Rate", value: "89 Bpm", Icon: FaHeartbeat, bg: "#fee2e2", color: "#ef4444" },
  { label: "SPO2", value: "98 %", Icon: FaLungs, bg: "#dbeafe", color: "#3b82f6" },
  { label: "Temperature", value: "101 °C", Icon: FaThermometerHalf, bg: "#fef3c7", color: "#f59e0b" },
  { label: "Respiratory Rate", value: "24 rpm", Icon: FaLungs, bg: "#dcfce7", color: "#22c55e" },
  { label: "Weight", value: "100 kg", Icon: FaUser, bg: "#ede9fe", color: "#8b5cf6" },
];

const aboutInfo = [
  { label: "Date of Birth", value: "25 Jan 1990", Icon: FaCalendarAlt },
  { label: "Blood Group", value: "O +ve", Icon: FaTint },
  { label: "Gender", value: "Male", Icon: FaUser },
  { label: "Email", value: "alberto@example.com", Icon: FaEnvelope },
];

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <>
      <style>{styles}</style>
      <div className="pp-root">
         {/* ── PAGE HEADER ── */}
  <div className="pp-page-header box_shadow">
    <div>
      <h5 className="fw-bold mb-0">Patient Profile</h5>
    </div>

    <div className="pp-header-actions">
      <button className="pp-header-btn outline">Edit Profile</button>
      <button className="pp-header-btn primary">More Actions</button>
    </div>
  </div>
        <div className="pp-layout">

          {/* ── SIDEBAR ── */}
          <div className="pp-sidebar">

            {/* Profile Card */}
            <div className="pp-card box_shadow pp-profile-card">
              <div className="pp-avatar-wrap">
                <img src="https://randomuser.me/api/portraits/men/75.jpg" className="pp-avatar" alt="Patient" />
                <span className="pp-online-dot" />
              </div>
              <div className="pp-name">Alberto Ripley</div>
              <ul className="pp-meta-list">
                <li><FaMapMarkerAlt size={12} /> 4150 Hiney Road, Las Vegas, NV</li>
                <li><FaPhone size={12} /> +1 54546 45648</li>
                <li><FaCalendarAlt size={12} /> Last Visited: 30 Apr 2025</li>
              </ul>
              <div className="pp-actions">
                {[FaPhone, FaCommentDots, FaVideo].map((Icon, i) => (
                  <button key={i} className="pp-icon-btn"><Icon /></button>
                ))}
              </div>
              <button className="pp-book-btn">
                <FaCalendarAlt size={13} /> Book Appointment
              </button>
            </div>

            {/* About */}
            <div className="pp-card box_shadow">
              <div className="pp-section-title">About Patient</div>
              <div className="pp-info-grid">
                {aboutInfo.map(({ label, value, Icon }, i) => (
                  <div className="pp-info-row" key={i}>
                    <div className="pp-info-icon"><Icon size={14} /></div>
                    <div>
                      <div className="pp-info-label">{label}</div>
                      <div className="pp-info-value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── MAIN ── */}
          <div className="pp-main">

            {/* Vitals */}
            <div>
              <div className="pp-vitals-grid">
                {vitals.map(({ label, value, Icon, bg, color }, i) => (
                  <div className="pp-vital-card box_shadow" key={i}>
                    <div className="pp-vital-icon" style={{ background: bg, color }}>
                      <Icon />
                    </div>
                    <div>
                      <div className="pp-vital-label">{label}</div>
                      <div className="pp-vital-value">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs Section */}
            <div className="pp-card  box_shadow" style={{ padding: 24 }}>
              <div className="pp-table-header">
                <div className="pp-tabs">
                  <button className={`pp-tab ${activeTab === "appointments" ? "active" : ""}`} onClick={() => setActiveTab("appointments")}>Appointments</button>
                  <button className={`pp-tab ${activeTab === "transactions" ? "active" : ""}`} onClick={() => setActiveTab("transactions")}>Transactions</button>
                </div>
                <button className="pp-filter-btn">
                  <FaFilter size={11} /> Filters
                </button>
              </div>

              {activeTab === "appointments" && (
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Doctor</th>
                      <th>Mode</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a, i) => (
                      <tr key={i}>
                        <td>
                          <div className="pp-date-main">{a.date}</div>
                          <div className="pp-date-time">{a.time}</div>
                        </td>
                        <td>
                          <div className="pp-apt-doctor">
                            <img src={a.img} className="pp-apt-avatar" alt={a.doctor} />
                            <div>
                              <div className="pp-apt-name">{a.doctor}</div>
                              <div className="pp-apt-role">{a.role}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`pp-mode-badge ${a.mode === "Online" ? "online" : "inperson"}`}>
                            <span className="pp-mode-dot" />
                            {a.mode}
                          </span>
                        </td>
                        <td>
                          <span className="pp-status-chip" style={{
                            background: a.statusColor + "18",
                            color: a.statusColor
                          }}>{a.status}</span>
                        </td>
                        <td><button className="pp-dots-btn"><BsThreeDotsVertical /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === "transactions" && (
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, i) => (
                      <tr key={i}>
                        <td><span className="pp-tx-id">{t.id}</span></td>
                        <td style={{ fontWeight: 500 }}>{t.desc}</td>
                        <td style={{ color: "#64748b" }}>{t.date}</td>
                        <td style={{ color: "#64748b" }}>{t.method}</td>
                        <td><span className="pp-tx-amount">{t.amount}</span></td>
                        <td>
                          <span className="pp-status-chip" style={{
                            background: t.statusColor + "18",
                            color: t.statusColor
                          }}>{t.status}</span>
                        </td>
                        <td><button className="pp-dots-btn"><BsThreeDotsVertical /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}