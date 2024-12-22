import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Table from '../components/Table';
import AddPopupForm from '../components/AddPopupForm';
import EditPopupForm from '../components/EditPopupForm';
import PopupDetails from '../components/PopupDetails';
import axios from 'axios';

const PageWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const AddButton = styled.button`
  display: block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  // Fetch clients from backend API
  useEffect(() => {
    axios.get('http://localhost:8084/info/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Error fetching clients:', error));
  }, []);

  const handleAddClient = (client) => {
    axios.post('http://localhost:8080/client', client)
      .then(response => {
        setClients([...clients, response.data]);
        setShowAddForm(false);
      })
      .catch(error => console.error('Error adding client:', error));
  };

  const handleEditClient = (updatedClient) => {
    axios.put(`http://localhost:8080/client/${updatedClient.id}`, updatedClient)
      .then(() => {
        setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client));
        setShowEditForm(false);
      })
      .catch(error => console.error('Error editing client:', error));
  };

  const handleViewDetails = (client) => {
    setShowDetails(client);
  };

  const handleEditClick = (client) => {
    setCurrentClient(client);
    setShowEditForm(true);
  };

  const columns = [
    { header: 'Numéro de pièce d\'identité', key: 'cin' },
    { header: 'Nom', key: 'lastName' },
    { header: 'Prénom', key: 'firstName' },
    { header: 'Adresse', key: 'address' },
    { header: 'Email', key: 'email' },
  ];

  return (
    <PageWrapper>
      <Title>Clients</Title>
      <AddButton onClick={() => setShowAddForm(true)}>Add Client</AddButton>
      <Table 
        columns={columns} 
        data={clients} 
        onView={handleViewDetails}
        onEdit={handleEditClick}
      />
      {showAddForm && (
        <AddPopupForm
          columns={columns}
          onSubmit={handleAddClient}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {showEditForm && (
        <EditPopupForm
          columns={columns}
          data={currentClient}
          onSubmit={handleEditClient}
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showDetails && (
        <PopupDetails
          title="Client Details"
          details={showDetails}
          onClose={() => setShowDetails(null)}
        />
      )}
    </PageWrapper>
  );
};

export default ClientsPage;
