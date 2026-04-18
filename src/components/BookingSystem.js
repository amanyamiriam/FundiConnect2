import React, { useState, useEffect } from 'react';
import './BookingSystem.css';

const BOOKINGS_STORAGE_KEY = 'fundiConnectBookings';
const AVAILABILITY_STORAGE_KEY = 'fundiConnectAvailability';

const parseStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Failed to parse storage for ${key}:`, error);
    return fallback;
  }
};

const initialBookings = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Fix Leaky Roof',
    clientName: 'Client User',
    fundiName: 'Jane Fundi',
    bookingDate: '2026-05-03',
    startTime: '09:00',
    endTime: '14:00',
    location: 'Nairobi',
    status: 'Confirmed',
    notes: 'Please bring all necessary tools',
    createdAt: '2026-04-15',
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Install New Light Fixtures',
    clientName: 'Client User',
    fundiName: 'David Fundi',
    bookingDate: '2026-05-10',
    startTime: '10:00',
    endTime: '16:00',
    location: 'Mombasa',
    status: 'Pending',
    notes: 'Confirm availability before 4pm',
    createdAt: '2026-04-16',
  },
];

const initialAvailability = [
  {
    fundiName: 'Jane Fundi',
    schedule: [
      { day: 'Monday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '08:00', endTime: '15:00', isAvailable: true },
      { day: 'Thursday', startTime: '08:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '08:00', endTime: '16:00', isAvailable: true },
      { day: 'Saturday', startTime: '09:00', endTime: '13:00', isAvailable: false },
      { day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false },
    ],
  },
  {
    fundiName: 'David Fundi',
    schedule: [
      { day: 'Monday', startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 'Tuesday', startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 'Wednesday', startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 'Thursday', startTime: '07:00', endTime: '16:00', isAvailable: true },
      { day: 'Friday', startTime: '07:00', endTime: '14:00', isAvailable: true },
      { day: 'Saturday', startTime: '00:00', endTime: '00:00', isAvailable: false },
      { day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false },
    ],
  },
];

function BookingSystem({ userType = 'client', userName = 'Client User' }) {
  const [view, setView] = useState('bookings'); // 'bookings', 'availability', 'calendar'
  const [bookings, setBookings] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedFundi, setSelectedFundi] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('14:00');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [fundis] = useState(['Jane Fundi', 'David Fundi', 'John Doe', 'Peter Jones', 'Mary Wanjiku']);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Load data from localStorage
  useEffect(() => {
    setBookings(parseStorage(BOOKINGS_STORAGE_KEY, initialBookings));
    setAvailability(parseStorage(AVAILABILITY_STORAGE_KEY, initialAvailability));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(availability));
  }, [availability]);

  // Filter bookings based on user type
  useEffect(() => {
    if (userType === 'client') {
      setFilteredBookings(bookings.filter(b => b.clientName === userName));
    } else {
      setFilteredBookings(bookings.filter(b => b.fundiName === userName));
    }
  }, [bookings, userType, userName]);

  const handleCreateBooking = (e) => {
    e.preventDefault();

    if (!selectedFundi || !bookingDate || !startTime || !endTime || !location) {
      alert('Please fill in all required fields');
      return;
    }

    if (startTime >= endTime) {
      alert('End time must be after start time');
      return;
    }

    const newBooking = {
      id: bookings.length ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
      jobId: null,
      jobTitle: 'Service Booking',
      clientName: userName,
      fundiName: selectedFundi,
      bookingDate,
      startTime,
      endTime,
      location,
      status: 'Pending',
      notes,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBookings([...bookings, newBooking]);
    setSelectedFundi('');
    setBookingDate('');
    setStartTime('09:00');
    setEndTime('14:00');
    setLocation('');
    setNotes('');
    setSuccessMessage('Booking request sent successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleConfirmBooking = (bookingId) => {
    setBookings(bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'Confirmed' } : b
    ));
    setSuccessMessage('Booking confirmed!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancelBooking = (bookingId) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
    setSuccessMessage('Booking cancelled');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdateAvailability = (fundiName, day, startTime, endTime, isAvailable) => {
    setAvailability(availability.map(a => {
      if (a.fundiName === fundiName) {
        return {
          ...a,
          schedule: a.schedule.map(s =>
            s.day === day
              ? { ...s, startTime, endTime, isAvailable }
              : s
          ),
        };
      }
      return a;
    }));
    setSuccessMessage('Availability updated!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getFundiAvailability = (fundiName) => {
    return availability.find(a => a.fundiName === fundiName);
  };

  const getAvailabilityForDay = (fundiName, day) => {
    const fundiAvail = getFundiAvailability(fundiName);
    if (!fundiAvail) return null;
    return fundiAvail.schedule.find(s => s.day === day);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getBookingSummary = () => {
    const total = filteredBookings.length;
    const confirmed = filteredBookings.filter(b => b.status === 'Confirmed').length;
    const pending = filteredBookings.filter(b => b.status === 'Pending').length;

    return { total, confirmed, pending };
  };

  const renderBookingsView = () => (
    <div className="bookings-view">
      <h2>My Bookings</h2>
      
      {userType === 'client' && (
        <form className="booking-form" onSubmit={handleCreateBooking}>
          <h3>Request a Booking</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Fundi</label>
              <select value={selectedFundi} onChange={(e) => setSelectedFundi(e.target.value)}>
                <option value="">Select a Fundi</option>
                {fundis.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter service location"
            />
          </div>

          <div className="form-group">
            <label>Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any special instructions or notes"
              rows="3"
            />
          </div>

          <button type="submit" className="submit-button">Request Booking</button>
        </form>
      )}

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="bookings-summary">
        <div className="summary-card">
          <h4>Total</h4>
          <span className="summary-number">{getBookingSummary().total}</span>
        </div>
        <div className="summary-card confirmed">
          <h4>Confirmed</h4>
          <span className="summary-number">{getBookingSummary().confirmed}</span>
        </div>
        <div className="summary-card pending">
          <h4>Pending</h4>
          <span className="summary-number">{getBookingSummary().pending}</span>
        </div>
      </div>

      <div className="bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="empty-state">
            <p>No bookings yet. {userType === 'client' ? 'Create a new booking above.' : 'Bookings will appear here.'}</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div key={booking.id} className={`booking-card ${booking.status.toLowerCase()}`}>
              <div className="booking-header">
                <div>
                  <h4>{booking.jobTitle}</h4>
                  <p className="booking-date">
                    {new Date(booking.bookingDate).toLocaleDateString([], { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                  </p>
                </div>
                <span className={`booking-status ${booking.status.toLowerCase()}`}>{booking.status}</span>
              </div>

              <div className="booking-details">
                <div className="detail">
                  <strong>{userType === 'client' ? 'Fundi' : 'Client'}:</strong> {userType === 'client' ? booking.fundiName : booking.clientName}
                </div>
                <div className="detail">
                  <strong>Location:</strong> {booking.location}
                </div>
                {booking.notes && (
                  <div className="detail">
                    <strong>Notes:</strong> {booking.notes}
                  </div>
                )}
              </div>

              <div className="booking-actions">
                {userType === 'fundi' && booking.status === 'Pending' && (
                  <>
                    <button className="confirm-button" onClick={() => handleConfirmBooking(booking.id)}>
                      ✓ Confirm
                    </button>
                    <button className="cancel-button" onClick={() => handleCancelBooking(booking.id)}>
                      ✗ Decline
                    </button>
                  </>
                )}
                {booking.status === 'Confirmed' && (
                  <button className="message-button">💬 Message</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderAvailabilityView = () => {
    if (userType !== 'fundi') {
      return (
        <div className="view-section">
          <h2>Availability</h2>
          <p className="info-text">Only fundis can set their availability.</p>
        </div>
      );
    }

    return (
      <div className="availability-view">
        <h2>My Availability</h2>
        
        <div className="availability-schedule">
          {days.map(day => {
            const dayAvail = getAvailabilityForDay(userName, day);
            if (!dayAvail) return null;

            return (
              <div key={day} className="day-availability">
                <div className="day-header">
                  <h4>{day}</h4>
                  <input
                    type="checkbox"
                    checked={dayAvail.isAvailable}
                    onChange={(e) => {
                      const newStart = e.target.checked ? '08:00' : '00:00';
                      const newEnd = e.target.checked ? '17:00' : '00:00';
                      handleUpdateAvailability(userName, day, newStart, newEnd, e.target.checked);
                    }}
                  />
                </div>

                {dayAvail.isAvailable && (
                  <div className="time-inputs">
                    <div className="time-group">
                      <label>From</label>
                      <input
                        type="time"
                        value={dayAvail.startTime}
                        onChange={(e) => handleUpdateAvailability(userName, day, e.target.value, dayAvail.endTime, dayAvail.isAvailable)}
                      />
                    </div>
                    <div className="time-group">
                      <label>To</label>
                      <input
                        type="time"
                        value={dayAvail.endTime}
                        onChange={(e) => handleUpdateAvailability(userName, day, dayAvail.startTime, e.target.value, dayAvail.isAvailable)}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    );
  };

  const renderCalendarView = () => (
    <div className="calendar-view">
      <h2>Booking Calendar</h2>
      
      <div className="calendar-container">
        <div className="fundi-selector">
          <label>View Availability For:</label>
          <select value={selectedFundi} onChange={(e) => setSelectedFundi(e.target.value)}>
            <option value="">Select a Fundi</option>
            {fundis.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        {selectedFundi && (
          <div className="calendar-grid">
            <div className="calendar-header">
              <h3>{selectedFundi}'s Schedule</h3>
            </div>

            <div className="schedule-table">
              <div className="table-header">
                <div className="table-cell">Day</div>
                <div className="table-cell">Available</div>
                <div className="table-cell">Hours</div>
              </div>

              {(getFundiAvailability(selectedFundi)?.schedule || []).map(day => (
                <div key={day.day} className="table-row">
                  <div className="table-cell">{day.day}</div>
                  <div className="table-cell">
                    <span className={`availability-badge ${day.isAvailable ? 'available' : 'unavailable'}`}>
                      {day.isAvailable ? '✓ Available' : '✗ Not Available'}
                    </span>
                  </div>
                  <div className="table-cell">
                    {day.isAvailable ? `${formatTime(day.startTime)} - ${formatTime(day.endTime)}` : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="booking-system-container">
      <div className="booking-header">
        <h1>Booking & Scheduling</h1>
        <p>Manage your bookings and availability</p>
      </div>

      <div className="view-tabs">
        <button
          className={`tab-button ${view === 'bookings' ? 'active' : ''}`}
          onClick={() => setView('bookings')}
        >
          📅 My Bookings
        </button>
        <button
          className={`tab-button ${view === 'availability' ? 'active' : ''}`}
          onClick={() => setView('availability')}
        >
          ⏰ Availability
        </button>
        <button
          className={`tab-button ${view === 'calendar' ? 'active' : ''}`}
          onClick={() => setView('calendar')}
        >
          📆 Calendar
        </button>
      </div>

      <div className="view-content">
        {view === 'bookings' && renderBookingsView()}
        {view === 'availability' && renderAvailabilityView()}
        {view === 'calendar' && renderCalendarView()}
      </div>
    </div>
  );
}

export default BookingSystem;