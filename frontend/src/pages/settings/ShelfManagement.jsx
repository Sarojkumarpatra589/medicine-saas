import React, { useState } from 'react'

const ShelfManagement = () => {
  const [shelves, setShelves] = useState([
    { id: 1, name: 'Shelf A1', rackId: 'Rack A1', position: 'Top', capacity: 100, occupied: 75, status: 'Active', material: 'Steel' },
    { id: 2, name: 'Shelf A2', rackId: 'Rack A1', position: 'Middle', capacity: 100, occupied: 60, status: 'Active', material: 'Steel' },
    { id: 3, name: 'Shelf A3', rackId: 'Rack A1', position: 'Bottom', capacity: 120, occupied: 45, status: 'Active', material: 'Steel' },
    { id: 4, name: 'Shelf B1', rackId: 'Rack B1', position: 'Top', capacity: 80, occupied: 80, status: 'Maintenance', material: 'Aluminum' },
  ])

  const [selectedShelf, setSelectedShelf] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    rackId: 'Rack A1',
    position: 'Top',
    material: 'Steel',
    capacity: '',
    status: 'Active',
  })

  const racks = ['Rack A1', 'Rack A2', 'Rack B1', 'Rack B2', 'Rack C1']
  const positions = ['Top', 'Upper Middle', 'Middle', 'Lower Middle', 'Bottom']
  const materials = ['Steel', 'Aluminum', 'Wood', 'Stainless Steel']
  const statusOptions = ['Active', 'Inactive', 'Maintenance']

  const handleAddShelf = () => {
    if (formData.name && formData.capacity) {
      const newShelf = {
        id: shelves.length + 1,
        name: formData.name,
        rackId: formData.rackId,
        position: formData.position,
        material: formData.material,
        capacity: parseInt(formData.capacity),
        occupied: 0,
        status: formData.status,
      }
      setShelves([...shelves, newShelf])
      setFormData({
        name: '',
        rackId: 'Rack A1',
        position: 'Top',
        material: 'Steel',
        capacity: '',
        status: 'Active',
      })
      setShowForm(false)
    }
  }

  const handleDeleteShelf = (id) => {
    setShelves(shelves.filter(shelf => shelf.id !== id))
    setSelectedShelf(null)
  }

  const getOccupancy = (occupied, capacity) => {
    return Math.round((occupied / capacity) * 100)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#1e40af'
      case 'Maintenance':
        return '#d97706'
      case 'Inactive':
        return '#dc2626'
      default:
        return '#6b7280'
    }
  }

  const getTotalCapacity = () => shelves.reduce((sum, shelf) => sum + shelf.capacity, 0)
  const getTotalOccupied = () => shelves.reduce((sum, shelf) => sum + shelf.occupied, 0)
  const getActiveCount = () => shelves.filter(shelf => shelf.status === 'Active').length

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

        .header-anim {
          animation: slideInDown 0.5s ease-out;
        }

        .card-anim {
          animation: slideInUp 0.5s ease-out;
        }

        @media (max-width: 768px) {
          .grid-cols-3 {
            grid-template-columns: 1fr 1fr !important;
          }
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Container */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header} className="header-anim">
          <div className=''>
            <h4 >Self Management</h4>
          </div>
        </div>
        <hr/>

        {/* Stats Section */}
        <div style={styles.statsGrid} className="grid-cols-3">
          <div style={styles.statCard}>
            <div style={styles.statValue}>{shelves.length}</div>
            <div style={styles.statLabel}>Total Shelves</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{getActiveCount()}</div>
            <div style={styles.statLabel}>Active Shelves</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              {getTotalCapacity() > 0 ? Math.round((getTotalOccupied() / getTotalCapacity()) * 100) : 0}%
            </div>
            <div style={styles.statLabel}>Overall Usage</div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={styles.actionBar}>
          <button style={styles.btnAdd} onClick={() => setShowForm(!showForm)}>
            <span>+ Add Shelf</span>
          </button>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search shelves..."
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>
        </div>

        {/* Add Shelf Form */}
        {showForm && (
          <div style={styles.formCard} className="card-anim">
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Add Shelf</h2>
            </div>

            <div style={styles.formContent}>
              {/* Row 1: Shelf Name & Rack */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Shelf Name:</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="e.g., Shelf A1"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rack ID:</label>
                  <select
                    style={styles.select}
                    value={formData.rackId}
                    onChange={(e) => setFormData({ ...formData, rackId: e.target.value })}
                  >
                    {racks.map(rack => (
                      <option key={rack} value={rack}>{rack}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Position & Material */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Position:</label>
                  <select
                    style={styles.select}
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  >
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Material:</label>
                  <select
                    style={styles.select}
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  >
                    {materials.map(mat => (
                      <option key={mat} value={mat}>{mat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Capacity & Status */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Capacity:</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="100"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Status:</label>
                  <select
                    style={styles.select}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
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
                  onClick={handleAddShelf}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Shelves Grid */}
        <div style={styles.shelvesGrid} className="grid-cols-2">
          {shelves.map((shelf) => {
            const occupancy = getOccupancy(shelf.occupied, shelf.capacity)
            const statusColor = getStatusColor(shelf.status)
            return (
              <div
                key={shelf.id}
                style={{
                  ...styles.shelfCard,
                  borderLeft: `4px solid ${statusColor}`,
                  cursor: 'pointer',
                  transform: selectedShelf?.id === shelf.id ? 'scale(1.02)' : 'scale(1)',
                }}
                className="card-anim"
                onClick={() => setSelectedShelf(shelf)}
              >
                {/* Card Header */}
                <div style={styles.shelfCardHeader}>
                  <div>
                    <h3 style={styles.shelfName}>{shelf.name}</h3>
                    <div style={styles.shelfMeta}>
                      <span>🔗 {shelf.rackId}</span>
                      <span style={styles.dot}>•</span>
                      <span>{shelf.position}</span>
                      <span style={styles.dot}>•</span>
                      <span>{shelf.material}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      background: statusColor,
                    }}
                  >
                    {shelf.status}
                  </div>
                </div>

                {/* Capacity Bar */}
                <div style={styles.capacitySection}>
                  <div style={styles.capacityLabel}>
                    <span>Capacity</span>
                    <span style={styles.capacityPercent}>{occupancy}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${occupancy}%`,
                      }}
                    ></div>
                  </div>
                  <div style={styles.capacityText}>
                    {shelf.occupied} / {shelf.capacity} items
                  </div>
                </div>

                {/* Shelf Items Count */}
                <div style={styles.itemsInfo}>
                  <div style={styles.infoBox}>
                    <div style={styles.infoLabel}>Available Space</div>
                    <div style={styles.infoValue}>{shelf.capacity - shelf.occupied}</div>
                  </div>
                  <div style={styles.infoBox}>
                    <div style={styles.infoLabel}>Weight Load</div>
                    <div style={styles.infoValue}>{occupancy}%</div>
                  </div>
                </div>

                {/* Card Actions */}
                {selectedShelf?.id === shelf.id && (
                  <div style={styles.shelfActions}>
                    <button style={styles.btnEdit}>View Details</button>
                    <button
                      style={styles.btnDelete}
                      onClick={() => handleDeleteShelf(shelf.id)}
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
        {shelves.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📚</div>
            <h3 style={styles.emptyTitle}>No Shelves Yet</h3>
            <p style={styles.emptyText}>Create your first shelf to get started</p>
            <button style={styles.btnAdd} onClick={() => setShowForm(true)}>
              + Add Shelf
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

  bgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '400px',
    background: 'linear-gradient(135deg, #1e40af 0%, #047857 100%)',
    opacity: 0.08,
    pointerEvents: 'none',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px 10px',
    position: 'relative',
    zIndex: 1,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    border: '1px solid rgba(5, 150, 105, 0.1)',
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
    boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)',
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
    borderRadius: '12px',
    marginBottom: '32px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(5, 150, 105, 0.1)',
    overflow: 'hidden',
  },

  formHeader: {
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
    padding: '20px 24px',
    borderBottom: '1px solid rgba(5, 150, 105, 0.1)',
  },

  formTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0',
  },

  formContent: {
    padding: '24px',
  },

  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px',
  },

  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },

  input: {
    padding: '11px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    background: '#f9fafb',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },

  select: {
    padding: '11px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    background: '#f9fafb',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  formActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
  },

  btnCancel: {
    padding: '10px 24px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#666666',
    background: '#f3f4f6',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  btnSave: {
    padding: '10px 28px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    background: '#1e40af',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  shelvesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },

  shelfCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(5, 150, 105, 0.1)',
    transition: 'all 0.3s ease',
  },

  shelfCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    gap: '12px',
  },

  shelfName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 6px 0',
  },

  shelfMeta: {
    fontSize: '13px',
    color: '#666666',
    fontWeight: '500',
  },

  dot: {
    margin: '0 8px',
    color: '#d1d5db',
  },

  statusBadge: {
    padding: '6px 12px',
    borderRadius: '6px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  capacitySection: {
    marginBottom: '16px',
  },

  capacityLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },

  capacityPercent: {
    color: '#1e40af',
  },

  progressBar: {
    width: '100%',
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px',
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #1e40af 0%, #047857 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },

  capacityText: {
    fontSize: '12px',
    color: '#666666',
    fontWeight: '500',
  },

  itemsInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  },

  infoBox: {
    background: '#f9fafb',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'center',
    border: '1px solid #e5e7eb',
  },

  infoLabel: {
    fontSize: '11px',
    color: '#666666',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    marginBottom: '6px',
  },

  infoValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e40af',
  },

  shelfActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #e5e7eb',
  },

  btnEdit: {
    flex: 1,
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1e40af',
    background: 'rgba(5, 150, 105, 0.1)',
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
    color: '#dc2626',
    background: 'rgba(220, 38, 38, 0.1)',
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

export default ShelfManagement