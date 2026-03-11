import React, { useState } from 'react'

const WallManagement = () => {
  const [walls, setWalls] = useState([
    { id: 1, name: 'North Wall', shelves: 12, capacity: 500, occupied: 385, status: 'Active' },
    { id: 2, name: 'South Wall', shelves: 10, capacity: 400, occupied: 280, status: 'Active' },
    { id: 3, name: 'East Wall', shelves: 15, capacity: 600, occupied: 450, status: 'Maintenance' },
    { id: 4, name: 'West Wall', shelves: 8, capacity: 320, occupied: 250, status: 'Active' },
  ])

  const [selectedWall, setSelectedWall] = useState(null)
  const [showForm, setShowForm] = useState(false)
const [formData, setFormData] = useState({
  room: "Main Storage",
  name: "",
  direction: "North",
  shelves: "",
  capacity: "",
  type: "Storage Wall",
  length: "",
  lengthUnit: "ft",
  status: "Active",
  noteColor: "normal"
})
const getNoteColorStyle = (color) => {
  const colors = {
    normal: "#e5e7eb",
    green: "#22c55e",
    yellow: "#facc15",
    red: "#ef4444",
    pink: "#ec4899",
    olive: "#84cc16"
  }
  return colors[color] || "#e5e7eb"
}


  const handleAddWall = () => {
  if (formData.name && formData.shelves && formData.capacity) {
    const newWall = {
      id: walls.length + 1,
      name: formData.name,
      room: formData.room,
      direction: formData.direction,
      shelves: parseInt(formData.shelves),
      capacity: parseInt(formData.capacity),
      type: formData.type,
      length: formData.length,
      lengthUnit: formData.lengthUnit,
      status: formData.status,
      noteColor: formData.noteColor,
      occupied: 0
    }

    setWalls([...walls, newWall])

    setFormData({
      room: "Main Storage",
      name: "",
      direction: "North",
      shelves: "",
      capacity: "",
      type: "Storage Wall",
      length: "",
      lengthUnit: "ft",
      status: "Active",
      noteColor: "normal"
    })

    setShowForm(false)
  }
}

  const handleDeleteWall = (id) => {
    setWalls(walls.filter(wall => wall.id !== id))
    setSelectedWall(null)
  }

  const getOccupancyPercent = (occupied, capacity) => {
    return Math.round((occupied / capacity) * 100)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10b981'
      case 'Maintenance':
        return '#f59e0b'
      case 'Inactive':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }
const rooms = [
  "Main Storage",
  "Cold Storage",
  "General Medicine Room",
  "Emergency Storage",
  "Warehouse"
];

const directions = [
  "North",
  "South",
  "East",
  "West"
];

const wallTypes = [
  "Storage Wall",
  "Medicine Rack Wall",
  "Cold Storage Wall",
  "Heavy Rack Wall"
];

const statusOptions = [
  "Active",
  "Inactive",
  "Maintenance"
];

const noteColors = [
  "normal",
  "green",
  "yellow",
  "red",
  "pink",
  "olive"
];

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .header-anim {
          animation: slideInDown 0.5s ease-out;
        }

        .card-anim {
          animation: slideInUp 0.5s ease-out;
        }

        .modal-anim {
          animation: fadeIn 0.3s ease-out;
        }

        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
          .grid-cols-3 {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Background Gradient */}
      <div style={styles.bgGradient}></div>

      {/* Container */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header} className="header-anim">
          <div>
            <h4 >Wall Management</h4>
          </div>
        </div>
        <hr/>

        {/* Stats Section */}
        <div style={styles.statsGrid} className="grid-cols-3">
          <div style={styles.statCard}>
            <div style={styles.statValue}>{walls.length}</div>
            <div style={styles.statLabel}>Total Walls</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{walls.reduce((sum, w) => sum + w.shelves, 0)}</div>
            <div style={styles.statLabel}>Total Shelves</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              {Math.round(
                (walls.reduce((sum, w) => sum + w.occupied, 0) /
                  walls.reduce((sum, w) => sum + w.capacity, 0)) *
                  100
              )}%
            </div>
            <div style={styles.statLabel}>Overall Usage</div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={styles.actionBar}>
          <button style={styles.btnAdd} onClick={() => setShowForm(!showForm)}>
            <span>+ Add Wall</span>
          </button>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search walls..."
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>
        </div>

    
{/* Add Wall Form */}
{showForm && (
  <div style={styles.formCard} className="card-anim">

    <h3 style={styles.formTitle}>Add New Wall</h3>

    {/* Row 1 */}
    <div style={styles.formGrid} className="grid-cols-3">

      <select
        style={styles.input}
        value={formData.room}
        onChange={(e) =>
          setFormData({ ...formData, room: e.target.value })
        }
      >
        {rooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Wall Name"
        style={styles.input}
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <select
        style={styles.input}
        value={formData.direction}
        onChange={(e) =>
          setFormData({ ...formData, direction: e.target.value })
        }
      >
        {directions.map((dir) => (
          <option key={dir} value={dir}>
            {dir}
          </option>
        ))}
      </select>

    </div>

    {/* Row 2 */}
    <div style={styles.formGrid} className="grid-cols-3">

      <input
        type="number"
        placeholder="Number of Shelves"
        style={styles.input}
        value={formData.shelves}
        onChange={(e) =>
          setFormData({ ...formData, shelves: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Total Capacity"
        style={styles.input}
        value={formData.capacity}
        onChange={(e) =>
          setFormData({ ...formData, capacity: e.target.value })
        }
      />

      <select
        style={styles.input}
        value={formData.type}
        onChange={(e) =>
          setFormData({ ...formData, type: e.target.value })
        }
      >
        {wallTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

    </div>

    {/* Row 3 */}
    <div style={styles.formGrid} className="grid-cols-3">

      <input
        type="number"
        placeholder="Wall Length"
        style={styles.input}
        value={formData.length}
        onChange={(e) =>
          setFormData({ ...formData, length: e.target.value })
        }
      />

      <select
        style={styles.input}
        value={formData.lengthUnit}
        onChange={(e) =>
          setFormData({ ...formData, lengthUnit: e.target.value })
        }
      >
        <option value="ft">ft</option>
        <option value="m">m</option>
        <option value="in">in</option>
      </select>

      <select
        style={styles.input}
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

    </div>

    {/* Row 4 - Wall Note Color */}
    <div style={{ marginTop: "15px" }}>

      <label style={styles.label}>Wall Note Color</label>

      <div style={styles.colorOptions}>
        {noteColors.map((color) => (
          <label key={color} style={styles.colorLabel}>

            <input
              type="radio"
              name="noteColor"
              value={color}
              checked={formData.noteColor === color}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  noteColor: e.target.value,
                })
              }
              style={styles.radioInput}
            />

            <span
              style={{
                ...styles.colorCircle,
                background: getNoteColorStyle(color),
              }}
            ></span>

            <span style={styles.colorName}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </span>

          </label>
        ))}
      </div>

    </div>

    {/* Form Actions */}
    <div style={styles.formActions}>

      <button
        style={styles.btnCancel}
        onClick={() => setShowForm(false)}
      >
        Cancel
      </button>

      <button
        style={styles.btnSave}
        onClick={handleAddWall}
      >
        Save Wall
      </button>

    </div>

  </div>
)}


        {/* Walls Grid */}
        <div style={styles.wallsGrid} className="grid-cols-2">
          {walls.map((wall) => {
            const occupancyPercent = getOccupancyPercent(wall.occupied, wall.capacity)
            const statusColor = getStatusColor(wall.status)
            return (
              <div
                key={wall.id}
                style={{
                  ...styles.wallCard,
                  borderLeft: `4px solid ${statusColor}`,
                  cursor: 'pointer',
                  transform: selectedWall?.id === wall.id ? 'scale(1.02)' : 'scale(1)',
                }}
                className="card-anim"
                onClick={() => setSelectedWall(wall)}
              >
                {/* Card Header */}
                <div style={styles.wallCardHeader}>
                  <div>
                    <h3 style={styles.wallName}>{wall.name}</h3>
                    <div style={styles.wallMeta}>
                      <span style={styles.wallMeta}>📦 {wall.shelves} Shelves</span>
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      background: statusColor,
                    }}
                  >
                    {wall.status}
                  </div>
                </div>

                {/* Occupancy Bar */}
                <div style={styles.occupancySection}>
                  <div style={styles.occupancyLabel}>
                    <span>Occupancy</span>
                    <span style={styles.occupancyPercent}>{occupancyPercent}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${occupancyPercent}%`,
                      }}
                    ></div>
                  </div>
                  <div style={styles.occupancyText}>
                    {wall.occupied} / {wall.capacity} items
                  </div>
                </div>

                {/* Card Actions */}
                {selectedWall?.id === wall.id && (
                  <div style={styles.wallActions}>
                    <button style={styles.btnView}>View Details</button>
                    <button
                      style={styles.btnDelete}
                      onClick={() => handleDeleteWall(wall.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {walls.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <h3 style={styles.emptyTitle}>No Walls Yet</h3>
            <p style={styles.emptyText}>Create your first wall to get started</p>
            <button style={styles.btnAdd} onClick={() => setShowForm(true)}>
              + Add Wall
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f8f9fb',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },

  container: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px 10px',
    position: 'relative',
    zIndex: 1,
  },

 
  title: {
    fontSize: 'clamp(28px, 5vw, 42px)',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },

  subtitle: {
    fontSize: '15px',
    color: '#666666',
    margin: '0',
    fontWeight: '400',
  },

  headerIcon: {
    fontSize: '48px',
    opacity: 0.8,
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },

  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(102, 126, 234, 0.1)',
  },

  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 8px 0',
  },

  statLabel: {
    fontSize: '13px',
    color: '#666666',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },

  actionBar: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },

  btnAdd: {
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    background: '#1e40af',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  },

  searchBox: {
    position: 'relative',
    width: '280px',
  },

  searchInput: {
    width: '100%',
    padding: '11px 14px 11px 40px',
    fontSize: '14px',
    border: '1.5px solid #e0e5f0',
    borderRadius: '8px',
    background: 'white',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
  },

  searchIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    opacity: 0.6,
  },

  formCard: {
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '32px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(102, 126, 234, 0.1)',
  },

  formTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '16px',
    margin: '0 0 16px 0',
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '16px',
  },

  input: {
    padding: '11px 14px',
    fontSize: '14px',
    border: '1.5px solid #e0e5f0',
    borderRadius: '8px',
    background: '#fafbfc',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },

  formActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  },

  btnCancel: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#666666',
    background: '#f5f5f5',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  btnSave: {
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    background: '#1e40af',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  wallsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },

  wallCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(102, 126, 234, 0.1)',
    transition: 'all 0.3s ease',
  },

  wallCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },

  wallName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 6px 0',
  },

  wallMeta: {
    fontSize: '13px',
    color: '#666666',
    fontWeight: '500',
  },

  statusBadge: {
    padding: '6px 14px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },

  occupancySection: {
    marginBottom: '16px',
  },

  occupancyLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },

  occupancyPercent: {
    color: '#1e40af',
  },

  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e0e5f0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px',
  },

  progressFill: {
    height: '100%',
    background: '#1e40af',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },

  occupancyText: {
    fontSize: '12px',
    color: '#666666',
    fontWeight: '500',
  },

  wallActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e0e5f0',
  },

  btnView: {
    flex: 1,
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#667eea',
    background: 'rgba(102, 126, 234, 0.1)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  btnDelete: {
    flex: 1,
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#ef4444',
    background: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },

  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },

  emptyTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 8px 0',
  },

  emptyText: {
    fontSize: '14px',
    color: '#666666',
    margin: '0 0 24px 0',
  },
}

export default WallManagement