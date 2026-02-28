import { useState } from 'react'
import { FiMapPin, FiDollarSign, FiBook, FiFileText, FiEdit3 } from 'react-icons/fi'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { getCampusBuildings } from '../services/api'
import './CampusCard.css'

function CampusCard({ campus }) {
  const [buildings, setBuildings] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expandedCourse, setExpandedCourse] = useState(null)

  const handleClick = async () => {
    if (expanded) {
      setExpanded(false)
      setExpandedCourse(null)
      return
    }
    
    setLoading(true)
    try {
      const data = await getCampusBuildings(campus.id)
      setBuildings(data)
      setExpanded(true)
    } catch (error) {
      console.error('Error fetching buildings:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCourse = (e, courseId) => {
    e.stopPropagation()
    setExpandedCourse(expandedCourse === courseId ? null : courseId)
  }

  // Format fee display
  const formatFee = (fee) => `₹${fee.toLocaleString()}`
  
  const getFeeDisplay = () => {
    if (campus.min_fee && campus.max_fee) {
      if (campus.min_fee === campus.max_fee) {
        return formatFee(campus.min_fee)
      }
      return `${formatFee(campus.min_fee)} - ${formatFee(campus.max_fee)}`
    }
    return null
  }

  return (
    <div className={`campus-card ${expanded ? 'expanded' : ''}`} onClick={handleClick}>
      <h3 className="campus-name">{campus.name}</h3>
      <p className="campus-location"><FiMapPin style={{ marginRight: '6px' }} /> {campus.location}</p>
      {getFeeDisplay() && (
        <p className="campus-fees"><FiDollarSign style={{ marginRight: '6px' }} /> {getFeeDisplay()} / year</p>
      )}
      <p className="campus-hint">Click to {expanded ? 'collapse' : 'view details'}</p>
      
      {loading && <p className="loading-text">Loading...</p>}
      
      {expanded && (
        <div className="expanded-content">
          {campus.courses && campus.courses.length > 0 && (
            <div className="courses-list">
              <h4><FiBook style={{ marginRight: '6px' }} /> Courses Offered</h4>
              <ul>
                {campus.courses.map(course => (
                  <li key={course.id} className={`course-item ${expandedCourse === course.id ? 'course-expanded' : ''}`}>
                    <div 
                      className="course-header"
                      onClick={(e) => toggleCourse(e, course.id)}
                    >
                      <span className="course-name">{course.name}</span>
                      <div className="course-header-right">
                        <span className="course-fee">₹{course.fees.toLocaleString()}</span>
                        <span className="course-toggle">{expandedCourse === course.id ? '▲' : '▼'}</span>
                      </div>
                    </div>
                    
                    {expandedCourse === course.id && (
                      <div className="course-details">
                        {course.eligibility && (
                          <div className="course-detail-item">
                            <span className="detail-label"><FiFileText style={{ marginRight: '4px' }} /> Eligibility:</span>
                            <span className="detail-value">{course.eligibility}</span>
                          </div>
                        )}
                        
                        {course.exams && course.exams.length > 0 && (
                          <div className="course-detail-item">
                            <span className="detail-label"><FiEdit3 style={{ marginRight: '4px' }} /> Entrance Exams:</span>
                            <div className="exam-tags">
                              {course.exams.map(exam => (
                                <span key={exam.id} className="exam-tag">{exam.name}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {!course.eligibility && (!course.exams || course.exams.length === 0) && (
                          <p className="no-details">No additional details available</p>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {buildings.length > 0 && (
            <div className="buildings-list">
              <h4><HiOutlineOfficeBuilding style={{ marginRight: '6px' }} /> Buildings</h4>
              <ul>
                {buildings.map(building => (
                  <li key={building.id}>{building.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {campus.courses?.length === 0 && buildings.length === 0 && !loading && (
            <p className="no-data">No details available</p>
          )}
        </div>
      )}
    </div>
  )
}

export default CampusCard
