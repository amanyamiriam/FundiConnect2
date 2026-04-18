import React, { useState, useEffect } from 'react';
import './PaymentSystem.css';

const PAYMENT_STORAGE_KEY = 'fundiConnectPayments';

const parseStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Failed to parse storage for ${key}:`, error);
    return fallback;
  }
};

const initialPayments = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Fix Leaky Roof',
    amount: 18000,
    status: 'held', // held, released, refunded
    paymentMethod: 'M-Pesa',
    transactionId: 'MP123456789',
    paidAt: '2026-04-15T10:30:00Z',
    releasedAt: null,
    clientName: 'John Client',
    fundiName: 'Jane Fundi',
    escrowReleaseDate: '2026-04-20',
  },
  {
    id: 2,
    jobId: 2,
    jobTitle: 'Install New Light Fixtures',
    amount: 8500,
    status: 'released',
    paymentMethod: 'M-Pesa',
    transactionId: 'MP987654321',
    paidAt: '2026-04-16T14:20:00Z',
    releasedAt: '2026-04-18T16:45:00Z',
    clientName: 'Mary Client',
    fundiName: 'David Fundi',
    escrowReleaseDate: '2026-04-21',
  },
];

function PaymentSystem({ userType = 'client', userName = 'Client User' }) {
  const [payments, setPayments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('M-Pesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setPayments(parseStorage(PAYMENT_STORAGE_KEY, initialPayments));
  }, []);

  useEffect(() => {
    localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(payments));
  }, [payments]);

  const processPayment = (e) => {
    e.preventDefault();
    if (!selectedJob) {
      alert('No job selected for payment.');
      return;
    }

    const amountValue = parseFloat(paymentAmount);
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      alert('Enter a valid payment amount.');
      return;
    }

    // Simulate payment processing
    const newPayment = {
      id: payments.length ? Math.max(...payments.map(p => p.id)) + 1 : 1,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      amount: amountValue,
      status: 'held',
      paymentMethod,
      transactionId: `${paymentMethod === 'M-Pesa' ? 'MP' : 'CARD'}${Date.now()}`,
      paidAt: new Date().toISOString(),
      releasedAt: null,
      clientName: userName,
      fundiName: selectedJob.assignedFundi || 'Awaiting Assignment',
      escrowReleaseDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    };

    setPayments([newPayment, ...payments]);
    setSuccessMessage(`Payment of Ksh ${paymentAmount} processed successfully! Funds are now held in escrow.`);
    setShowPaymentForm(false);
    setSelectedJob(null);
    setPaymentAmount('');
    setPhoneNumber('');

    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const releasePayment = (paymentId) => {
    setPayments(payments.map(payment =>
      payment.id === paymentId
        ? { ...payment, status: 'released', releasedAt: new Date().toISOString() }
        : payment
    ));
    setSuccessMessage('Payment released to fundi successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const myPayments = payments.filter(payment =>
    userType === 'client'
      ? payment.clientName.toLowerCase() === userName.toLowerCase()
      : payment.fundiName.toLowerCase() === userName.toLowerCase()
  );

  const heldPayments = myPayments.filter(p => p.status === 'held');
  const releasedPayments = myPayments.filter(p => p.status === 'released');
  const totalHeld = heldPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalReleased = releasedPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="payment-system-container">
      <div className="payment-header">
        <h1>Payment System</h1>
        <p>Manage payments, escrow, and transaction history for your jobs.</p>
      </div>

      {successMessage && <div className="payment-success">{successMessage}</div>}

      <div className="payment-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={activeTab === 'payments' ? 'active' : ''}
          onClick={() => setActiveTab('payments')}
        >
          Payment History
        </button>
        <button
          className={activeTab === 'escrow' ? 'active' : ''}
          onClick={() => setActiveTab('escrow')}
        >
          Escrow Management
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="payment-overview">
          <div className="overview-cards">
            <div className="overview-card">
              <h3>Total Payments</h3>
              <p className="amount">Ksh {myPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
              <p className="subtitle">{myPayments.length} transactions</p>
            </div>
            <div className="overview-card">
              <h3>Funds in Escrow</h3>
              <p className="amount held">Ksh {totalHeld.toLocaleString()}</p>
              <p className="subtitle">{heldPayments.length} pending releases</p>
            </div>
            <div className="overview-card">
              <h3>Released Payments</h3>
              <p className="amount released">Ksh {totalReleased.toLocaleString()}</p>
              <p className="subtitle">{releasedPayments.length} completed</p>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Supported Payment Methods</h3>
            <div className="method-grid">
              <div className="payment-method">
                <div className="method-icon">📱</div>
                <h4>M-Pesa</h4>
                <p>Mobile money payments</p>
              </div>
              <div className="payment-method">
                <div className="method-icon">💳</div>
                <h4>Credit/Debit Cards</h4>
                <p>Visa, Mastercard, etc.</p>
              </div>
              <div className="payment-method">
                <div className="method-icon">🔒</div>
                <h4>Escrow Protection</h4>
                <p>Funds held securely until job completion</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="payment-history">
          <h3>Payment History</h3>
          {myPayments.length === 0 ? (
            <p className="empty-state">No payment history found.</p>
          ) : (
            <div className="payment-list">
              {myPayments.map(payment => (
                <div key={payment.id} className="payment-item">
                  <div className="payment-info">
                    <h4>{payment.jobTitle}</h4>
                    <p className="payment-meta">
                      {userType === 'client' ? `Paid to: ${payment.fundiName}` : `Received from: ${payment.clientName}`}
                      • {new Date(payment.paidAt).toLocaleDateString()}
                    </p>
                    <p className="transaction-id">Transaction: {payment.transactionId}</p>
                  </div>
                  <div className="payment-amount">
                    <p className={`amount ${payment.status}`}>Ksh {payment.amount.toLocaleString()}</p>
                    <span className={`status-badge ${payment.status}`}>
                      {payment.status === 'held' ? 'In Escrow' :
                       payment.status === 'released' ? 'Released' : 'Refunded'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'escrow' && (
        <div className="escrow-management">
          <h3>Escrow Management</h3>
          <p>Manage funds held in escrow for job completion.</p>

          {userType === 'client' ? (
            <div className="escrow-actions">
              <h4>Release Payments to Fundis</h4>
              {heldPayments.length === 0 ? (
                <p>No payments currently held in escrow.</p>
              ) : (
                <div className="escrow-list">
                  {heldPayments.map(payment => (
                    <div key={payment.id} className="escrow-item">
                      <div className="escrow-info">
                        <h5>{payment.jobTitle}</h5>
                        <p>Fundi: {payment.fundiName}</p>
                        <p>Amount: Ksh {payment.amount.toLocaleString()}</p>
                        <p>Release Date: {payment.escrowReleaseDate}</p>
                      </div>
                      <button
                        className="release-button"
                        onClick={() => releasePayment(payment.id)}
                      >
                        Release Payment
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="escrow-actions">
              <h4>Pending Payment Releases</h4>
              {heldPayments.length === 0 ? (
                <p>No payments awaiting release.</p>
              ) : (
                <div className="escrow-list">
                  {heldPayments.map(payment => (
                    <div key={payment.id} className="escrow-item">
                      <div className="escrow-info">
                        <h5>{payment.jobTitle}</h5>
                        <p>Client: {payment.clientName}</p>
                        <p>Amount: Ksh {payment.amount.toLocaleString()}</p>
                        <p>Expected Release: {payment.escrowReleaseDate}</p>
                      </div>
                      <div className="escrow-status">
                        <span className="status-badge held">Awaiting Client Approval</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {showPaymentForm && selectedJob && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h3>Process Payment</h3>
            <p>Job: {selectedJob.title}</p>
            <p>Fundi: {selectedJob.assignedFundi || 'Not assigned yet'}</p>

            <form onSubmit={processPayment} className="payment-form">
              <div className="form-group">
                <label htmlFor="paymentAmount">Amount (Ksh)</label>
                <input
                  id="paymentAmount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  required
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Card">Credit/Debit Card</option>
                </select>
              </div>

              {paymentMethod === 'M-Pesa' && (
                <div className="form-group">
                  <label htmlFor="phoneNumber">M-Pesa Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g., 0712345678"
                    required
                  />
                </div>
              )}

              <div className="payment-notice">
                <p><strong>Important:</strong> Funds will be held in escrow until job completion and your approval.</p>
              </div>

              <div className="modal-actions">
                <button type="submit" className="pay-button">Process Payment</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowPaymentForm(false);
                    setSelectedJob(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentSystem;