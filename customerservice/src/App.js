import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';

const API_BASE = 'http://localhost:8080/customers';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(API_BASE);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <div className="App">
      <h1>Customer Management System</h1>
      <CustomerForm
        fetchCustomers={fetchCustomers}
        editingCustomer={editingCustomer}
        setEditingCustomer={setEditingCustomer}
        apiBase={API_BASE}
      />
      <CustomerList
        customers={customers}
        fetchCustomers={fetchCustomers}
        setEditingCustomer={setEditingCustomer}
        apiBase={API_BASE}
      />
    </div>
  );
};

export default App;
