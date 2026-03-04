import { useState } from 'react'
import { FiSearch, FiMapPin, FiBook } from 'react-icons/fi'
import './Filters.css'

const STREAMS = [
  'Engineering',
  'Science', 
  'Management',
  'Computer Applications',
  'Arts / Commerce',
  'Specialized'
]

function Filters({ 
  searchTerm, 
  onSearchChange, 
  minFee, 
  maxFee, 
  onMinFeeChange, 
  onMaxFeeChange,
  selectedStreams,
  onStreamChange,
  locationSearch,
  onLocationChange
}) {
  const [showStreams, setShowStreams] = useState(true)
  const [showFees, setShowFees] = useState(true)
  const [showLocation, setShowLocation] = useState(true)
  
  // Block 'e', '+', '-' in fee inputs
  const handleFeeKeyDown = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault()
    }
  }

  // Block numbers in search input
  const handleSearchChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, '')
    onSearchChange(value)
  }

  const handleStreamToggle = (stream) => {
    if (selectedStreams.includes(stream)) {
      onStreamChange(selectedStreams.filter(s => s !== stream))
    } else {
      onStreamChange([...selectedStreams, stream])
    }
  }

  const clearAllFilters = () => {
    onSearchChange('')
    onMinFeeChange('')
    onMaxFeeChange('')
    onStreamChange([])
    onLocationChange('')
  }

  const hasActiveFilters = searchTerm || minFee || maxFee || selectedStreams.length > 0 || locationSearch

  return (
    <div className="filters-sidebar">
      <div className="filters-header">
        <h3><FiSearch style={{ marginRight: '8px' }} /> All Filters</h3>
        {hasActiveFilters && (
          <button className="clear-all-btn" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Search Box */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search colleges..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Location Filter */}
      <div className="filter-section">
        <div 
          className="filter-title"
          onClick={() => setShowLocation(!showLocation)}
        >
          <span><FiMapPin style={{ marginRight: '6px' }} /> Location</span>
          <span className="toggle-icon">{showLocation ? '▲' : '▼'}</span>
        </div>
        {showLocation && (
          <div className="filter-content">
            <input
              type="text"
              className="location-input"
              placeholder="Search location..."
              value={locationSearch}
              onChange={(e) => onLocationChange(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Streams Filter */}
      <div className="filter-section">
        <div 
          className="filter-title"
          onClick={() => setShowStreams(!showStreams)}
        >
          <span><FiBook style={{ marginRight: '6px' }} /> Streams {selectedStreams.length > 0 && `(${selectedStreams.length})`}</span>
          <span className="toggle-icon">{showStreams ? '▲' : '▼'}</span>
        </div>
        {showStreams && (
          <div className="filter-content">
            {STREAMS.map(stream => (
              <label key={stream} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={selectedStreams.includes(stream)}
                  onChange={() => handleStreamToggle(stream)}
                />
                <span>{stream}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Fee Range Filter */}
      <div className="filter-section">
        <div 
          className="filter-title"
          onClick={() => setShowFees(!showFees)}
        >
          <span>₹ Fee Range</span>
          <span className="toggle-icon">{showFees ? '▲' : '▼'}</span>
        </div>
        {showFees && (
          <div className="filter-content">
            <div className="fee-label">Filter by course fees (₹/year)</div>
            <div className="fee-range">
              <input
                type="number"
                placeholder="Min ₹"
                value={minFee}
                onChange={(e) => onMinFeeChange(e.target.value)}
                onKeyDown={handleFeeKeyDown}
              />
              <span className="fee-separator">to</span>
              <input
                type="number"
                placeholder="Max ₹"
                value={maxFee}
                onChange={(e) => onMaxFeeChange(e.target.value)}
                onKeyDown={handleFeeKeyDown}
              />
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Tags */}
      {selectedStreams.length > 0 && (
        <div className="active-filters">
          <p className="active-label">Active Filters:</p>
          <div className="filter-tags">
            {selectedStreams.map(stream => (
              <span key={stream} className="filter-tag">
                {stream}
                <button onClick={() => handleStreamToggle(stream)}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Filters
