import React, { useState, useEffect } from 'react';
import './CustomerForm.css';

const CustomerForm = ({ fetchCustomers, editingCustomer, setEditingCustomer, apiBase }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (editingCustomer) {
      setId(editingCustomer.id ?? '');
      setName(editingCustomer.name ?? '');
      setEmail(editingCustomer.email ?? '');
      setPassword(editingCustomer.password ?? '');
      setPhone(editingCustomer.phone ?? '');
      setAddress(editingCustomer.address ?? '');
    } else {
      setId('');
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setAddress('');
    }
  }, [editingCustomer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { name, email, password, phone, address };

    try {
      if (editingCustomer) {
        await fetch(`${apiBase}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer),
        });
      } else {
        await fetch(apiBase, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer),
        });
      }

      await fetchCustomers();
      setEditingCustomer(null);
      setId('');
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setAddress('');
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
      <form onSubmit={handleSubmit}>
        {editingCustomer && (
          <input type="number" value={id} readOnly placeholder="ID" />
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Customer Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required={!editingCustomer} // require for new, optional for edit
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <div className="form-buttons">
          <button type="submit">{editingCustomer ? 'Update Customer' : 'Add Customer'}</button>
          {editingCustomer && (
            <button type="button" onClick={() => setEditingCustomer(null)}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
