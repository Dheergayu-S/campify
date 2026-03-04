import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import CampusCard from '../components/CampusCard'
import { getCampuses, getWishlist, addToWishlist, removeFromWishlist } from '../services/api'
import './Wishlist.css'

function Wishlist() {
  const navigate = useNavigate()
  const [campuses, setCampuses] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [allCampuses, wishlistIds] = await Promise.all([getCampuses(), getWishlist()])
      setCampuses(allCampuses)
      setWishlist(wishlistIds)
    } catch (err) {
      console.error('Error loading wishlist:', err)
    } finally {
      setLoading(false)
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

  const savedCampuses = campuses.filter(c => wishlist.includes(c.id))

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="wishlist-page page">
      <header className="wishlist-header page-header">
        <h1><FiHeart style={{ marginRight: '10px' }} /> My Wishlist</h1>
        <p>{savedCampuses.length} college{savedCampuses.length !== 1 ? 's' : ''} saved</p>
      </header>

      {savedCampuses.length === 0 ? (
        <div className="wishlist-empty">
          <FiHeart size={48} />
          <h2>No colleges saved yet</h2>
          <p>Click the heart icon on any college in Explore to save it here</p>
        </div>
      ) : (
        <div className="campus-grid">
          {savedCampuses.map(campus => (
            <CampusCard
              key={campus.id}
              campus={campus}
              isWishlisted={true}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
