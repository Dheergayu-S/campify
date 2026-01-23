import { useState, useEffect } from 'react'
import CampusCard from '../components/CampusCard'
import Filters from '../components/Filters'
import { getCampuses } from '../services/api'
import './Home.css'

function Home() {
  const [campuses, setCampuses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [minFee, setMinFee] = useState('')
  const [maxFee, setMaxFee] = useState('')
  const [selectedStreams, setSelectedStreams] = useState([])
  const [locationSearch, setLocationSearch] = useState('')

  useEffect(() => {
    fetchCampuses()
  }, [])

  const fetchCampuses = async () => {
    try {
      const data = await getCampuses()
      setCampuses(data)
    } catch (error) {
      console.error('Error fetching campuses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCampuses = campuses.filter(campus => {
    const matchesSearch = campus.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Filter by location
    const matchesLocation = locationSearch === '' || 
      campus.location.toLowerCase().includes(locationSearch.toLowerCase())
    
    // Filter by fee range - check if any course falls within the range
    const campusMinFee = campus.min_fee || 0
    const campusMaxFee = campus.max_fee || 0
    
    // Campus matches if its fee range overlaps with filter range
    const matchesMinFee = minFee === '' || campusMaxFee >= parseInt(minFee)
    const matchesMaxFee = maxFee === '' || campusMinFee <= parseInt(maxFee)
    
    // Filter by selected streams - campus must have at least one course in selected streams
    const matchesStream = selectedStreams.length === 0 || 
      campus.courses?.some(course => selectedStreams.includes(course.stream))
    
    return matchesSearch && matchesLocation && matchesMinFee && matchesMaxFee && matchesStream
  })

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="home">
      <header className="header">
        <h1>🎓 Smart Campus Finder</h1>
        <p>Discover campuses, buildings, and points of interest</p>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <Filters 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm}
            minFee={minFee}
            maxFee={maxFee}
            onMinFeeChange={setMinFee}
            onMaxFeeChange={setMaxFee}
            selectedStreams={selectedStreams}
            onStreamChange={setSelectedStreams}
            locationSearch={locationSearch}
            onLocationChange={setLocationSearch}
          />
        </aside>
        
        <main className="content">
          <p className="results-count">
            Showing {filteredCampuses.length} of {campuses.length} colleges
          </p>
          <div className="campus-grid">
            {filteredCampuses.length === 0 ? (
              <p className="no-results">No campuses found matching your filters.</p>
            ) : (
              filteredCampuses.map(campus => (
                <CampusCard key={campus.id} campus={campus} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
