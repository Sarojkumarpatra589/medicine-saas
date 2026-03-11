import React, { useState } from 'react'

const RackListVerification = () => {
  const [racks, setRacks] = useState([
    {
      id: 1,
      name: 'Rack A1',
      location: 'Zone 1',
      expectedItems: 8,
      verifiedItems: 6,
      status: 'pending',
      lastVerified: '2024-03-08 14:30',
      verifiedBy: 'John Doe',
      priority: 'High',
      items: [
        { id: 1, name: 'Server 1', verified: true, location: 'U1-U2', sku: 'SRV-001', serial: 'SN12345', verifiedAt: '2024-03-08 10:15', verifiedBy: 'John Doe', notes: 'Working properly' },
        { id: 2, name: 'Server 2', verified: true, location: 'U3-U4', sku: 'SRV-002', serial: 'SN12346', verifiedAt: '2024-03-08 10:20', verifiedBy: 'John Doe', notes: 'All ports functional' },
        { id: 3, name: 'Switch A', verified: false, location: 'U5', sku: 'SWC-001', serial: 'SN12347', verifiedAt: null, verifiedBy: null, notes: '' },
        { id: 4, name: 'PDU', verified: true, location: 'U6', sku: 'PDU-001', serial: 'SN12348', verifiedAt: '2024-03-08 10:30', verifiedBy: 'John Doe', notes: 'All outlets OK' },
        { id: 5, name: 'Patch Panel', verified: true, location: 'U7', sku: 'PNL-001', serial: 'SN12349', verifiedAt: '2024-03-08 10:35', verifiedBy: 'John Doe', notes: 'Connections checked' },
        { id: 6, name: 'Cable Tray', verified: true, location: 'U8', sku: 'TRY-001', serial: 'SN12350', verifiedAt: '2024-03-08 10:40', verifiedBy: 'John Doe', notes: 'Secured properly' },
      ]
    },
    {
      id: 2,
      name: 'Rack B1',
      location: 'Zone 2',
      expectedItems: 6,
      verifiedItems: 6,
      status: 'verified',
      lastVerified: '2024-03-07 16:45',
      verifiedBy: 'Jane Smith',
      priority: 'Medium',
      items: [
        { id: 7, name: 'Storage Unit', verified: true, location: 'U1-U3', sku: 'STR-001', serial: 'SN12351', verifiedAt: '2024-03-07 14:00', verifiedBy: 'Jane Smith', notes: 'All drives operational' },
        { id: 8, name: 'Monitor', verified: true, location: 'U4', sku: 'MON-001', serial: 'SN12352', verifiedAt: '2024-03-07 14:15', verifiedBy: 'Jane Smith', notes: 'Display OK' },
        { id: 9, name: 'Keyboard', verified: true, location: 'U5', sku: 'KBD-001', serial: 'SN12353', verifiedAt: '2024-03-07 14:20', verifiedBy: 'Jane Smith', notes: 'All keys working' },
        { id: 10, name: 'Mouse', verified: true, location: 'U5', sku: 'MSE-001', serial: 'SN12354', verifiedAt: '2024-03-07 14:25', verifiedBy: 'Jane Smith', notes: 'Responsive' },
        { id: 11, name: 'Cables', verified: true, location: 'U6', sku: 'CBL-001', serial: 'SN12355', verifiedAt: '2024-03-07 14:30', verifiedBy: 'Jane Smith', notes: 'Labeled and organized' },
        { id: 12, name: 'Power Supply', verified: true, location: 'U6', sku: 'PWR-001', serial: 'SN12356', verifiedAt: '2024-03-07 14:35', verifiedBy: 'Jane Smith', notes: 'Voltage stable' },
      ]
    },
    {
      id: 3,
      name: 'Rack C1',
      location: 'Zone 3',
      expectedItems: 5,
      verifiedItems: 3,
      status: 'incomplete',
      lastVerified: '2024-03-06 09:20',
      verifiedBy: 'Mike Johnson',
      priority: 'Critical',
      items: [
        { id: 13, name: 'Device 1', verified: true, location: 'U1', sku: 'DEV-001', serial: 'SN12357', verifiedAt: '2024-03-06 09:00', verifiedBy: 'Mike Johnson', notes: 'Operating normally' },
        { id: 14, name: 'Device 2', verified: true, location: 'U2', sku: 'DEV-002', serial: 'SN12358', verifiedAt: '2024-03-06 09:10', verifiedBy: 'Mike Johnson', notes: 'All functions OK' },
        { id: 15, name: 'Device 3', verified: false, location: 'U3', sku: 'DEV-003', serial: 'SN12359', verifiedAt: null, verifiedBy: null, notes: 'Pending verification' },
        { id: 16, name: 'Device 4', verified: false, location: 'U4', sku: 'DEV-004', serial: 'SN12360', verifiedAt: null, verifiedBy: null, notes: 'Missing from inventory' },
        { id: 17, name: 'Device 5', verified: false, location: 'U5', sku: 'DEV-005', serial: 'SN12361', verifiedAt: null, verifiedBy: null, notes: '' },
      ]
    },
  ])

  const [expandedItems, setExpandedItems] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showAuditLog, setShowAuditLog] = useState(false)
  const [auditLogs] = useState([
    { id: 1, action: 'Verified Item', rack: 'Rack A1', item: 'Server 1', user: 'John Doe', timestamp: '2024-03-08 10:15' },
    { id: 2, action: 'Verified Item', rack: 'Rack B1', item: 'Storage Unit', user: 'Jane Smith', timestamp: '2024-03-07 14:00' },
    { id: 3, action: 'Updated Notes', rack: 'Rack A1', item: 'Switch A', user: 'John Doe', timestamp: '2024-03-08 09:45' },
  ])

  const getStatusColor = (status) => {
    const colors = { verified: '#10b981', pending: '#f59e0b', incomplete: '#ef4444' }
    return colors[status] || '#6b7280'
  }

  const getPriorityColor = (priority) => {
    const colors = { Critical: '#ef4444', High: '#f59e0b', Medium: '#3b82f6', Low: '#10b981' }
    return colors[priority] || '#6b7280'
  }

  const handleVerifyItem = (rackId, itemId) => {
    setRacks(racks.map(rack => {
      if (rack.id === rackId) {
        const updatedItems = rack.items.map(item =>
          item.id === itemId ? {
            ...item,
            verified: !item.verified,
            verifiedAt: !item.verified ? new Date().toLocaleString() : null,
            verifiedBy: !item.verified ? 'Current User' : null,
          } : item
        )
        const verifiedCount = updatedItems.filter(i => i.verified).length
        return {
          ...rack,
          items: updatedItems,
          verifiedItems: verifiedCount,
          status: verifiedCount === rack.expectedItems ? 'verified' : verifiedCount > 0 ? 'pending' : 'incomplete'
        }
      }
      return rack
    }))
  }

  const handleVerifyAllRack = (rackId) => {
    setRacks(racks.map(rack => {
      if (rack.id === rackId) {
        const updatedItems = rack.items.map(item => ({
          ...item,
          verified: true,
          verifiedAt: new Date().toLocaleString(),
          verifiedBy: 'Current User'
        }))
        return {
          ...rack,
          items: updatedItems,
          verifiedItems: updatedItems.length,
          status: 'verified'
        }
      }
      return rack
    }))
  }

  const getStats = () => {
    const total = racks.length
    const verified = racks.filter(r => r.status === 'verified').length
    const pending = racks.filter(r => r.status === 'pending').length
    const incomplete = racks.filter(r => r.status === 'incomplete').length
    const totalItems = racks.reduce((sum, r) => sum + r.items.length, 0)
    const verifiedItems = racks.reduce((sum, r) => sum + r.verifiedItems, 0)
    return { total, verified, pending, incomplete, totalItems, verifiedItems }
  }

  const filteredRacks = racks.filter(rack => {
    const matchesSearch = rack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rack.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || rack.status === filterStatus
    const matchesPriority = filterPriority === 'all' || rack.priority === filterPriority
    return matchesSearch && matchesFilter && matchesPriority
  })

  const stats = getStats()

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .anim-down { animation: slideDown 0.3s ease-out; }
        .anim-up { animation: slideUp 0.3s ease-out; }
      `}</style>

      {/* Header */}
      <div style={styles.headerSection} className="anim-down">
        <div style={styles.headerContent}>
          <h1 style={styles.pageTitle}>Rack List Verification</h1>
          <p style={styles.pageSubtitle}>Verify and manage rack inventory items</p>
        </div>
      </div>

      {/* Main Container */}
      <div style={styles.mainContainer}>
        {/* Stats Bar */}
        <div style={styles.statsBar} className="anim-up">
          <div style={styles.statItem}>
            <div style={styles.statNum}>{stats.total}</div>
            <div style={styles.statText}>Total Racks</div>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <div style={{...styles.statNum, color: '#10b981'}}>{stats.verified}</div>
            <div style={styles.statText}>Verified</div>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <div style={{...styles.statNum, color: '#f59e0b'}}>{stats.pending}</div>
            <div style={styles.statText}>Pending</div>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <div style={{...styles.statNum, color: '#ef4444'}}>{stats.incomplete}</div>
            <div style={styles.statText}>Incomplete</div>
          </div>
          <div style={styles.statDivider}></div>
          <div style={styles.statItem}>
            <div style={{...styles.statNum, color: '#3b82f6'}}>{Math.round((stats.verifiedItems/stats.totalItems)*100)}%</div>
            <div style={styles.statText}>Progress</div>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controlsSection} className="anim-up">
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search racks, items..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span style={styles.searchIconSpan}>🔍</span>
          </div>

          <select style={styles.selectControl} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="incomplete">Incomplete</option>
          </select>

          <select style={styles.selectControl} value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button 
            style={{...styles.toggleBtn, background: showAuditLog ? '#10b981' : '#e5e7eb'}}
            onClick={() => setShowAuditLog(!showAuditLog)}
          >
            📜 Audit Log
          </button>
        </div>

        {/* Audit Log */}
        {showAuditLog && (
          <div style={styles.auditSection} className="anim-up">
            <h3 style={styles.auditTitle}>Audit Log</h3>
            <div style={styles.auditTableWrapper}>
              <div style={styles.auditTableHead}>
                <div style={{...styles.auditCol, flex: 1.5}}>Action</div>
                <div style={{...styles.auditCol, flex: 1}}>Rack</div>
                <div style={{...styles.auditCol, flex: 1.5}}>Item</div>
                <div style={{...styles.auditCol, flex: 1}}>User</div>
                <div style={{...styles.auditCol, flex: 1.5}}>Timestamp</div>
              </div>
              {auditLogs.map(log => (
                <div key={log.id} style={styles.auditTableRow}>
                  <div style={{...styles.auditCol, flex: 1.5, fontWeight: 500}}>{log.action}</div>
                  <div style={{...styles.auditCol, flex: 1}}>{log.rack}</div>
                  <div style={{...styles.auditCol, flex: 1.5}}>{log.item}</div>
                  <div style={{...styles.auditCol, flex: 1}}>{log.user}</div>
                  <div style={{...styles.auditCol, flex: 1.5, fontSize: '12px'}}>{log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Racks List */}
        <div style={styles.racksList} className="anim-up">
          {filteredRacks.length > 0 ? (
            filteredRacks.map((rack) => (
              <div key={rack.id} style={{...styles.rackCard, borderLeft: `5px solid ${getStatusColor(rack.status)}`}}>
                {/* Rack Header */}
                <div style={styles.rackHeader}>
                  <div style={styles.rackHeaderLeft}>
                    <h3 style={styles.rackTitle}>{rack.name}</h3>
                    <span style={styles.rackLocation}>📍 {rack.location}</span>
                  </div>
                  <div style={styles.rackHeaderRight}>
                    <span style={{...styles.badge, background: getStatusColor(rack.status)}}>{rack.status}</span>
                    <span style={{...styles.badge, background: getPriorityColor(rack.priority)}}>{rack.priority}</span>
                  </div>
                </div>

                {/* Rack Meta */}
                <div style={styles.rackMeta}>
                  <span style={styles.metaItem}><strong>Last Verified:</strong> {rack.lastVerified}</span>
                  <span style={styles.metaItem}><strong>By:</strong> {rack.verifiedBy}</span>
                </div>

                {/* Progress Bar */}
                <div style={styles.progressWrapper}>
                  <div style={styles.progressInfo}>
                    <span style={styles.progressLabel}>Verification Progress</span>
                    <span style={styles.progressValue}>{Math.round((rack.verifiedItems / rack.expectedItems) * 100)}%</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{
                      ...styles.progressBarFill,
                      width: `${Math.round((rack.verifiedItems / rack.expectedItems) * 100)}%`,
                      background: getStatusColor(rack.status)
                    }}></div>
                  </div>
                  <span style={styles.progressCount}>{rack.verifiedItems} of {rack.expectedItems} verified</span>
                </div>

                {/* Items Toggle */}
                <button
                  style={styles.itemsToggleBtn}
                  onClick={() => setExpandedItems({...expandedItems, [rack.id]: !expandedItems[rack.id]})}
                >
                  {expandedItems[rack.id] ? '▼' : '▶'} Items ({rack.items.length})
                  <span style={{marginLeft: 'auto', fontSize: '12px'}}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleVerifyAllRack(rack.id)
                      }}
                      style={styles.verifyAllBtn}
                    >
                      ✓ Verify All
                    </button>
                  </span>
                </button>

                {/* Items List */}
                {expandedItems[rack.id] && (
                  <div style={styles.itemsContainer}>
                    {rack.items.map((item) => (
                      <div key={item.id} style={styles.itemCard}>
                        <input
                          type="checkbox"
                          checked={item.verified}
                          onChange={() => handleVerifyItem(rack.id, item.id)}
                          style={styles.itemCheckbox}
                        />
                        <div style={styles.itemContent}>
                          <div style={styles.itemRow}>
                            <div style={styles.itemLeft}>
                              <div style={styles.itemName}>{item.name}</div>
                              <div style={styles.itemMeta}>SKU: {item.sku} | S/N: {item.serial}</div>
                            </div>
                            <div style={styles.itemRight}>
                              <span style={{...styles.itemLocation, marginRight: '12px'}}>{item.location}</span>
                              <span style={{
                                ...styles.itemStatus,
                                background: item.verified ? '#d1fae5' : '#fef2f2',
                                color: item.verified ? '#065f46' : '#991b1b'
                              }}>
                                {item.verified ? '✓ Verified' : '✗ Pending'}
                              </span>
                            </div>
                          </div>
                          {item.notes && <div style={styles.itemNotes}>📝 {item.notes}</div>}
                          {item.verifiedAt && <div style={styles.itemVerifyInfo}>✓ {item.verifiedBy} • {item.verifiedAt}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📭</div>
              <p style={styles.emptyText}>No racks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f5f7fa',
    fontFamily: "'Poppins', sans-serif",
  },

  headerSection: {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #1f2937 100%)',
    color: 'white',
    padding: '32px 20px',
    textAlign: 'center',
  },

  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  pageTitle: {
    fontSize: '32px',
    fontWeight: 700,
    margin: '0 0 6px 0',
  },

  pageSubtitle: {
    fontSize: '14px',
    opacity: 0.9,
    margin: 0,
  },

  mainContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px 20px',
  },

  statsBar: {
    display: 'flex',
    background: 'white',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    gap: '16px',
  },

  statItem: {
    flex: 1,
    textAlign: 'center',
  },

  statNum: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1e3a8a',
    margin: '0 0 4px 0',
  },

  statText: {
    fontSize: '12px',
    color: '#6b7280',
    fontWeight: 500,
  },

  statDivider: {
    width: '1px',
    background: '#e5e7eb',
  },

  controlsSection: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },

  searchWrapper: {
    position: 'relative',
    flex: 1,
    minWidth: '250px',
  },

  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 32px',
    fontSize: '13px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    background: 'white',
    fontFamily: 'inherit',
  },

  searchIconSpan: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '14px',
  },

  selectControl: {
    padding: '10px 12px',
    fontSize: '13px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    background: 'white',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },

  toggleBtn: {
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  auditSection: {
    background: 'white',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },

  auditTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 12px 0',
  },

  auditTableWrapper: {
    overflow: 'auto',
  },

  auditTableHead: {
    display: 'flex',
    padding: '10px 12px',
    background: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 600,
    fontSize: '12px',
    color: '#1a1a1a',
  },

  auditTableRow: {
    display: 'flex',
    padding: '10px 12px',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '12px',
    color: '#666666',
  },

  auditCol: {
    color: '#6b7280',
  },

  racksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  rackCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },

  rackHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    gap: '16px',
  },

  rackHeaderLeft: {
    flex: 1,
  },

  rackTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 4px 0',
  },

  rackLocation: {
    fontSize: '12px',
    color: '#6b7280',
  },

  rackHeaderRight: {
    display: 'flex',
    gap: '8px',
  },

  badge: {
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'white',
    borderRadius: '4px',
    textTransform: 'capitalize',
  },

  rackMeta: {
    display: 'flex',
    gap: '20px',
    padding: '8px 0',
    marginBottom: '12px',
    fontSize: '12px',
    borderBottom: '1px solid #f3f4f6',
    color: '#6b7280',
  },

  metaItem: {
    display: 'flex',
    gap: '6px',
  },

  progressWrapper: {
    marginBottom: '12px',
  },

  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    fontWeight: 600,
    color: '#1a1a1a',
    marginBottom: '6px',
  },

  progressLabel: {},

  progressValue: {
    color: '#10b981',
  },

  progressBar: {
    width: '100%',
    height: '6px',
    background: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '4px',
  },

  progressBarFill: {
    height: '100%',
    transition: 'width 0.3s ease',
  },

  progressCount: {
    fontSize: '11px',
    color: '#6b7280',
  },

  itemsToggleBtn: {
    width: '100%',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#1e3a8a',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  verifyAllBtn: {
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: 600,
    color: 'white',
    background: '#10b981',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  itemsContainer: {
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingTop: '12px',
    borderTop: '1px solid #f3f4f6',
  },

  itemCard: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    background: '#fafbfc',
    borderRadius: '6px',
    border: '1px solid #f3f4f6',
    alignItems: 'flex-start',
  },

  itemCheckbox: {
    width: '16px',
    height: '16px',
    marginTop: '2px',
    cursor: 'pointer',
    accentColor: '#10b981',
    flexShrink: 0,
  },

  itemContent: {
    flex: 1,
  },

  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },

  itemLeft: {
    flex: 1,
  },

  itemName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#1a1a1a',
    marginBottom: '4px',
  },

  itemMeta: {
    fontSize: '11px',
    color: '#6b7280',
  },

  itemRight: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexShrink: 0,
  },

  itemLocation: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
  },

  itemStatus: {
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: 600,
    borderRadius: '4px',
    whiteSpace: 'nowrap',
  },

  itemNotes: {
    fontSize: '11px',
    color: '#6b7280',
    padding: '6px 0',
    marginTop: '6px',
  },

  itemVerifyInfo: {
    fontSize: '10px',
    color: '#10b981',
    fontWeight: 500,
    marginTop: '6px',
  },

  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'white',
    borderRadius: '10px',
  },

  emptyIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },

  emptyText: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
}

export default RackListVerification