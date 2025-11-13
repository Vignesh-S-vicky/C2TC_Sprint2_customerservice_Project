import React from 'react';
import './CustomerList.css';

const CustomerList = ({ customers, fetchCustomers, setEditingCustomer, apiBase }) => {
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    try {
      await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="customer-list-container">
      <h2>Customer Records</h2>
      {customers.length === 0 ? (
        <p className="no-data">No customers available.</p>
      ) : (
        <div className="customer-grid">
          {customers.map((customer) => (
            <div key={customer.id} className="customer-card">
              <div className="customer-details">
                <h3>{customer.name}</h3>
                <p><strong>ID:</strong> {customer.id}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Address:</strong> {customer.address}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingCustomer(customer)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(customer.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
