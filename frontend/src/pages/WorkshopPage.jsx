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

const WorkshopPage = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentMaintenance, setCurrentMaintenance] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  // Fetch maintenance from backend API
  useEffect(() => {
    axios.get('http://localhost:8084/info/maintenance')
      .then(response => setMaintenance(response.data))
      .catch(error => console.error('Error fetching maintenance:', error));
  }, []);

  const handleAddMaintenance = (maintenanceData) => {
    axios.post('http://localhost:8080/maintenance', maintenanceData)
      .then(response => {
        setMaintenance([...maintenance, response.data]);
        setShowAddForm(false);
      })
      .catch(error => console.error('Error adding maintenance:', error));
  };

  const handleEditMaintenance = (updatedMaintenance) => {
    axios.put(`http://localhost:8080/maintenance/${updatedMaintenance.id}`, updatedMaintenance)
      .then(() => {
        setMaintenance(maintenance.map(item => item.id === updatedMaintenance.id ? updatedMaintenance : item));
        setShowEditForm(false);
      })
      .catch(error => console.error('Error editing maintenance:', error));
  };

  const handleViewDetails = (maintenanceData) => {
    setShowDetails(maintenanceData);
  };

  const handleEditClick = (maintenanceData) => {
    setCurrentMaintenance(maintenanceData);
    setShowEditForm(true);
  };

  const columns = [
    { header: 'Description', key: 'description' },
    { header: 'Date de debut', key: 'startTime' },
    { header: 'Date de fin', key: 'endTime' },
    { header: 'Véhicule', key: 'vehicleName' },
    { header: 'Status de maintenance', key: 'status' },
  ];

  return (
    <PageWrapper>
      <Title>Workshop Maintenance</Title>
      <AddButton onClick={() => setShowAddForm(true)}>Add Maintenance</AddButton>
      <Table
        columns={columns}
        data={maintenance}
        onView={handleViewDetails}
        onEdit={handleEditClick}
      />
      {showAddForm && (
        <AddPopupForm
          columns={columns}
          onSubmit={handleAddMaintenance}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {showEditForm && (
        <EditPopupForm
          columns={columns}
          data={currentMaintenance}
          onSubmit={handleEditMaintenance}
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showDetails && (
        <PopupDetails
          title="Maintenance Details"
          details={showDetails}
          onClose={() => setShowDetails(null)}
        />
      )}
    </PageWrapper>
  );
};

export default WorkshopPage;
