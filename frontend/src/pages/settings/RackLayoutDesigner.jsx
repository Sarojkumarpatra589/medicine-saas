import React, { useState } from 'react'

const RackLayoutDesigner = () => {
  const [room, setRoom] = useState('Main Store')
  const [frontWallItems, setFrontWallItems] = useState([
    { id: 'A', label: 'A', color: '#3b82f6', position: 0 },
    { id: 'B', label: 'B', color: '#3b82f6', position: 1 },
    { id: 'M1M2', label: 'M1 M2', color: '#1e40af', position: 2 },
    { id: 'D', label: 'D', color: '#64748b', position: 3 },
    { id: 'FJ', label: 'F J', color: '#64748b', position: 4 },
  ])

  const [backWallItems, setBackWallItems] = useState([
    { id: 'D-back', label: 'D', color: '#64748b', position: 0 },
    { id: 'E-back', label: 'E', color: '#64748b', position: 1 },
    { id: 'F-back', label: 'F', color: '#64748b', position: 2 },
  ])

  const [rackPositions] = useState(['A', 'B', 'C', 'D', 'M1', 'M2'])
  const [selectedItem, setSelectedItem] = useState(null)
  const [noteColor, setNoteColor] = useState('#3b82f6')

  const colors = [
    '#3b82f6',
    '#f97316',
    '#10b981',
    '#ef4444',
    '#a855f7',
    '#eab308',
  ]

  const rooms = ['Main Store', 'Cold Storage', 'Backup Storage', 'Archive']

  const handleDeleteItem = (id, wall) => {
    if (wall === 'front') {
      setFrontWallItems(frontWallItems.filter(item => item.id !== id))
    } else {
      setBackWallItems(backWallItems.filter(item => item.id !== id))
    }
    setSelectedItem(null)
  }

  const handleSaveLayout = () => {
    console.log('Layout saved:', { room, frontWallItems, backWallItems, noteColor })
    alert('Layout saved successfully!')
  }

  const handleClearLayout = () => {
    setFrontWallItems([])
    setBackWallItems([])
    setSelectedItem(null)
  }

  return (
    <div style={styles.wrapper}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-anim {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>

      <div style={styles.card} className="page-anim">
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Rack Layout Designer</h1>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Top Section - Room Selector */}
          <div style={styles.topSection}>
            <div style={styles.roomRow}>
              <span style={styles.roomLabel}>Room:</span>
              <span style={styles.roomValue}>{room}</span>
            </div>
          </div>

          {/* Middle Section - Layout */}
          <div style={styles.layoutSection}>
            {/* Left Sidebar - Rack Positions */}
            <div style={styles.sidebar}>
              {rackPositions.map((pos, idx) => (
                <div key={pos} style={styles.rackPosBox}>
                  {pos}
                </div>
              ))}
            </div>

            {/* Main Content Area */}
            <div style={styles.layoutArea}>
              {/* Front Wall */}
              <div style={styles.wallBlock}>
                <h3 style={styles.wallName}>Front Wall</h3>
                <div style={styles.itemsContainer}>
                  {frontWallItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        ...styles.item,
                        background: item.color,
                        border: selectedItem?.id === item.id ? '3px solid #000' : '1px solid rgba(0,0,0,0.2)',
                        transform: selectedItem?.id === item.id ? 'scale(1.05)' : 'scale(1)',
                      }}
                      onClick={() => setSelectedItem({ ...item, wall: 'front' })}
                    >
                      <span style={styles.itemText}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Back Wall */}
              <div style={styles.wallBlock}>
                <h3 style={styles.wallName}>Back Wall</h3>
                <div style={styles.itemsContainer}>
                  {backWallItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        ...styles.item,
                        background: item.color,
                        border: selectedItem?.id === item.id ? '3px solid #000' : '1px solid rgba(0,0,0,0.2)',
                        transform: selectedItem?.id === item.id ? 'scale(1.05)' : 'scale(1)',
                      }}
                      onClick={() => setSelectedItem({ ...item, wall: 'back' })}
                    >
                      <span style={styles.itemText}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div style={styles.bottomSection}>
            {/* Note Color */}
            <div style={styles.noteColorSection}>
              <span style={styles.noteLabelText}>Rack Note Color Coded</span>
              <div style={styles.colorSwatches}>
                {colors.map(color => (
                  <button
                    key={color}
                    style={{
                      ...styles.colorSwatchBtn,
                      background: color,
                      border: noteColor === color ? '3px solid #000' : '2px solid #d1d5db',
                    }}
                    onClick={() => setNoteColor(color)}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.buttonGroup}>
              <button style={styles.btnSave} onClick={handleSaveLayout}>
                Save Layout
              </button>
              <button style={styles.btnClear} onClick={handleClearLayout}>
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Selected Item Info */}
        {selectedItem && (
          <div style={styles.selectedItemBar}>
            <span style={styles.selectedText}>Selected: {selectedItem.label}</span>
            <button
              style={styles.btnDeleteItem}
              onClick={() => handleDeleteItem(selectedItem.id, selectedItem.wall)}
            >
              Delete
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
    background: '#e8ecf1',
    padding: '20px',
    fontFamily: "'Poppins', sans-serif",
  },

  card: {
    background: 'white',
    maxWidth: '900px',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
  },

  header: {
    background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
    color: 'white',
    padding: '18px 24px',
    textAlign: 'center',
  },

  headerTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: '0',
    letterSpacing: '0.3px',
  },

  content: {
    padding: '24px',
  },

  topSection: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
  },

  roomRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  roomLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a1a1a',
  },

  roomValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#666666',
  },

  layoutSection: {
    display: 'grid',
    gridTemplateColumns: '80px 1fr',
    gap: '20px',
    marginBottom: '24px',
  },

  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  rackPosBox: {
    width: '60px',
    height: '48px',
    background: '#1e40af',
    color: 'white',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '12px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  layoutArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },

  wallBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  wallName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: '0 0 8px 0',
    textAlign: 'center',
  },

  itemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    minHeight: '70px',
    padding: '12px',
    background: '#f9fafb',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    alignItems: 'center',
  },

  item: {
    width: '65px',
    height: '55px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  },

  itemText: {
    color: 'white',
    fontWeight: '600',
    fontSize: '12px',
    textAlign: 'center',
    lineHeight: '1.2',
  },

  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
    gap: '20px',
    flexWrap: 'wrap',
  },

  noteColorSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: '1 1 auto',
  },

  noteLabelText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
    whiteSpace: 'nowrap',
  },

  colorSwatches: {
    display: 'flex',
    gap: '6px',
  },

  colorSwatchBtn: {
    width: '24px',
    height: '24px',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  buttonGroup: {
    display: 'flex',
    gap: '8px',
  },

  btnSave: {
    padding: '10px 20px',
    background: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 6px rgba(30, 64, 175, 0.25)',
  },

  btnClear: {
    padding: '10px 20px',
    background: '#f3f4f6',
    color: '#1a1a1a',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  selectedItemBar: {
    background: '#dbeafe',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #bfdbfe',
  },

  selectedText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1e40af',
  },

  btnDeleteItem: {
    padding: '6px 12px',
    background: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
}

export default RackLayoutDesigner