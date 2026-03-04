import { useState, useEffect } from 'react'
import { FiSearch } from 'react-icons/fi'
import CampusCard from '../components/CampusCard'
import Filters from '../components/Filters'
import { getCampuses, getWishlist, addToWishlist, removeFromWishlist } from '../services/api'
import './Explore.css'

function Explore() {
  const [campuses, setCampuses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [minFee, setMinFee] = useState('')
  const [maxFee, setMaxFee] = useState('')
  const [selectedStreams, setSelectedStreams] = useState([])
  const [locationSearch, setLocationSearch] = useState('')
  const [wishlist, setWishlist] = useState([])

  const isLoggedIn = !!localStorage.getItem('token')

  useEffect(() => {
    fetchCampuses()
    if (isLoggedIn) fetchWishlist()
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

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist()
      setWishlist(data)
    } catch (err) {
      console.error('Error fetching wishlist:', err)
    }
  }

  const toggleWishlist = async (campusId) => {
    try {
      if (wishlist.includes(campusId)) {
        await removeFromWishlist(campusId)
        setWishlist(wishlist.filter(id => id !== campusId))
      } else {
        await addToWishlist(campusId)
        setWishlist([...wishlist, campusId])
      }
    } catch (err) {
      console.error('Wishlist error:', err)
    }
  }

  const filteredCampuses = campuses.filter(campus => {
    const matchesSearch = campus.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = locationSearch === '' || 
      campus.location.toLowerCase().includes(locationSearch.toLowerCase())
    
    const campusMinFee = campus.min_fee || 0
    const campusMaxFee = campus.max_fee || 0
    
    const matchesMinFee = minFee === '' || campusMaxFee >= parseInt(minFee)
    const matchesMaxFee = maxFee === '' || campusMinFee <= parseInt(maxFee)
    
    const matchesStream = selectedStreams.length === 0 || 
      campus.courses?.some(course => selectedStreams.includes(course.stream))
    
    return matchesSearch && matchesLocation && matchesMinFee && matchesMaxFee && matchesStream
  })

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="explore page">
      <header className="explore-header page-header">
        <h1><FiSearch style={{ marginRight: '10px' }} /> Explore Colleges</h1>
        <p>Browse all 41 colleges in Southern Karnataka</p>
      </header>

      <div className="explore-layout">
        <aside className="filters-wrapper">
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
        
        <main className="explore-content">
          <p className="results-count">
            Showing {filteredCampuses.length} of {campuses.length} colleges
          </p>
          <div className="campus-grid">
            {filteredCampuses.length === 0 ? (
              <p className="no-results">No campuses found matching your filters.</p>
            ) : (
              filteredCampuses.map(campus => (
                <CampusCard
                  key={campus.id}
                  campus={campus}
                  isWishlisted={wishlist.includes(campus.id)}
                  onToggleWishlist={isLoggedIn ? toggleWishlist : null}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Explore
