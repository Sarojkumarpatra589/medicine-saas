import React, { useState } from 'react'

const RackSetup = () => {
  const [racks, setRacks] = useState([
    { id: 1, name: 'Rack A1', location: 'Zone 1', units: 42, usedUnits: 28, status: 'Active', type: 'Standard' },
    { id: 2, name: 'Rack A2', location: 'Zone 1', units: 42, usedUnits: 35, status: 'Active', type: 'Standard' },
    { id: 3, name: 'Rack B1', location: 'Zone 2', units: 24, usedUnits: 18, status: 'Active', type: 'Compact' },
    { id: 3, name: 'Rack B2', location: 'Zone 2', units: 24, usedUnits: 18, status: 'Active', type: 'Compact' },
  ])

  const [selectedRack, setSelectedRack] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    location: 'Zone 1',
    type: 'Standard',
    units: '',
    status: 'Active',
  })

  const locations = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Warehouse A', 'Warehouse B']
  const rackTypes = ['Standard', 'Compact', 'Heavy Duty', 'Wall Mount']
  const statusOptions = ['Active', 'Inactive', 'Maintenance']

  const handleAddRack = () => {
    if (formData.name && formData.units) {
      const newRack = {
        id: racks.length + 1,
        name: formData.name,
        location: formData.location,
        type: formData.type,
        units: parseInt(formData.units),
        usedUnits: 0,
        status: formData.status,
      }
      setRacks([...racks, newRack])
      setFormData({
        name: '',
        location: 'Zone 1',
        type: 'Standard',
        units: '',
        status: 'Active',
      })
      setShowForm(false)
    }
  }

  const handleDeleteRack = (id) => {
    setRacks(racks.filter(rack => rack.id !== id))
    setSelectedRack(null)
  }

  const getUtilization = (used, total) => {
    return Math.round((used / total) * 100)
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

  const getTotalCapacity = () => racks.reduce((sum, rack) => sum + rack.units, 0)
  const getTotalUsed = () => racks.reduce((sum, rack) => sum + rack.usedUnits, 0)

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
        {/* Header */}
        <div style={styles.header} className="header-anim">
          <div className=''>
            <h4 >Rack Setup</h4>
          </div>
        </div>
        <hr/>

        {/* Stats Section */}
        <div style={styles.statsGrid} className="grid-cols-3">
          <div style={styles.statCard}>
            <div style={styles.statValue}>{racks.length}</div>
            <div style={styles.statLabel}>Total Racks</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{getTotalCapacity()}</div>
            <div style={styles.statLabel}>Total Units</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>
              {getTotalCapacity() > 0 ? Math.round((getTotalUsed() / getTotalCapacity()) * 100) : 0}%
            </div>
            <div style={styles.statLabel}>Total Utilization</div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={styles.actionBar}>
          <button style={styles.btnAdd} onClick={() => setShowForm(!showForm)}>
            <span>+ Add Rack</span>
          </button>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search racks..."
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>
        </div>

        {/* Add Rack Form */}
        {showForm && (
          <div style={styles.formCard} className="card-anim">
            <div style={styles.formHeader}>
              <h2 style={styles.formTitle}>Add Rack</h2>
            </div>

            <div style={styles.formContent}>
              {/* Row 1: Rack Name & Location */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rack Name:</label>
                  <input
                    type="text"
                    style={styles.input}
                    placeholder="e.g., Rack A1"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location:</label>
                  <select
                    style={styles.select}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Rack Type & Units */}
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rack Type:</label>
                  <select
                    style={styles.select}
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    {rackTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Number of Units:</label>
                  <input
                    type="number"
                    style={styles.input}
                    placeholder="42"
                    value={formData.units}
                    onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                  />
                </div>
              </div>

              {/* Row 3: Status */}
              <div style={styles.formRow}>
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
                <div></div>
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
                  onClick={handleAddRack}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Racks Grid */}
        <div style={styles.racksGrid} className="grid-cols-2">
          {racks.map((rack) => {
            const utilization = getUtilization(rack.usedUnits, rack.units)
            const statusColor = getStatusColor(rack.status)
            return (
              <div
                key={rack.id}
                style={{
                  ...styles.rackCard,
                  borderLeft: `4px solid ${statusColor}`,
                  cursor: 'pointer',
                  transform: selectedRack?.id === rack.id ? 'scale(1.02)' : 'scale(1)',
                }}
                className="card-anim"
                onClick={() => setSelectedRack(rack)}
              >
                {/* Card Header */}
                <div style={styles.rackCardHeader}>
                  <div>
                    <h3 style={styles.rackName}>{rack.name}</h3>
                    <div style={styles.rackMeta}>
                      <span>📍 {rack.location}</span>
                      <span style={styles.dot}>•</span>
                      <span>{rack.type}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      ...styles.statusBadge,
                      background: statusColor,
                    }}
                  >
                    {rack.status}
                  </div>
                </div>

                {/* Rack Visualization */}
                <div style={styles.rackViz}>
                  <div style={styles.rackVisualization}>
                    {Array.from({ length: Math.min(rack.units, 12) }).map((_, i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.rackUnit,
                          background: i < Math.ceil((rack.usedUnits / rack.units) * Math.min(rack.units, 12))
                            ? '#1e40af'
                            : '#e5e7eb'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Utilization Info */}
                <div style={styles.utilizationSection}>
                  <div style={styles.utilizationLabel}>
                    <span>Utilization</span>
                    <span style={styles.utilizationPercent}>{utilization}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${utilization}%`,
                      }}
                    ></div>
                  </div>
                  <div style={styles.unitInfo}>
                    {rack.usedUnits} / {rack.units} units used
                  </div>
                </div>

                {/* Card Actions */}
                {selectedRack?.id === rack.id && (
                  <div style={styles.rackActions}>
                    <button style={styles.btnEdit}>Edit Rack</button>
                    <button
                      style={styles.btnDelete}
                      onClick={() => handleDeleteRack(rack.id)}
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
        {racks.length === 0 && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🗄️</div>
            <h3 style={styles.emptyTitle}>No Racks Yet</h3>
            <p style={styles.emptyText}>Create your first rack to get started</p>
            <button style={styles.btnAdd} onClick={() => setShowForm(true)}>
              + Add Rack
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
    background: 'linear-gradient(135deg, #1e40af 0%, #1f2937 100%)',
    opacity: 0.08,
    pointerEvents: 'none',
  },

  container: {
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
    border: '1px solid rgba(30, 64, 175, 0.1)',
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
    boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)',
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
    border: '1px solid rgba(30, 64, 175, 0.1)',
    overflow: 'hidden',
  },

  formHeader: {
    background: 'linear-gradient(135deg, #f5f7fb 0%, #f0f3f9 100%)',
    padding: '20px 24px',
    borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
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

  racksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },

  rackCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    border: '1px solid rgba(30, 64, 175, 0.1)',
    transition: 'all 0.3s ease',
  },

  rackCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    gap: '12px',
  },

  rackName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 6px 0',
  },

  rackMeta: {
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

  rackViz: {
    marginBottom: '16px',
  },

  rackVisualization: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '4px',
  },

  rackUnit: {
    height: '20px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },

  utilizationSection: {
    marginBottom: '16px',
  },

  utilizationLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '8px',
  },

  utilizationPercent: {
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
    background: 'linear-gradient(90deg, #1e40af 0%, #1e3a8a 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },

  unitInfo: {
    fontSize: '12px',
    color: '#666666',
    fontWeight: '500',
  },

  rackActions: {
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
    background: 'rgba(30, 64, 175, 0.1)',
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

export default RackSetup