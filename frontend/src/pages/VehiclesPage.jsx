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

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [showDetails, setShowDetails] = useState(null);

  // Fetch vehicles from backend API
  useEffect(() => {
    axios.get('http://localhost:8084/info/vehicles')
      .then(response => setVehicles(response.data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const handleAddVehicle = (vehicle) => {
    axios.post('http://localhost:8080/vehicle', vehicle)
      .then(response => {
        setVehicles([...vehicles, response.data]);
        setShowAddForm(false);
      })
      .catch(error => console.error('Error adding vehicle:', error));
  };

  const handleEditVehicle = (updatedVehicle) => {
    axios.put(`http://localhost:8080/vehicle/${updatedVehicle.id}`, updatedVehicle)
      .then(() => {
        setVehicles(vehicles.map(vehicle => vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle));
        setShowEditForm(false);
      })
      .catch(error => console.error('Error editing vehicle:', error));
  };

  const handleViewDetails = (vehicle) => {
    setShowDetails(vehicle);
  };

  const handleEditClick = (vehicle) => {
    setCurrentVehicle(vehicle);
    setShowEditForm(true);
  };

  console.log(vehicles);

  const columns = [
    { header: 'VIN', key: 'vin' },
    { header: "Numéro d'immatriculation", key: 'registrationNumber' },
    { header: 'Marque', key: 'brand' },
    { header: 'Modèle', key: 'model' },
    { header: 'Année', key: 'year' },
    { header: 'Couleur', key: 'color' },
    { header: 'Kilométrage', key: 'mileage' },
  ];

  return (
    <PageWrapper>
      <Title>Vehicles</Title>
      <AddButton onClick={() => setShowAddForm(true)}>Add Vehicle</AddButton>
      <Table
        columns={columns}
        data={vehicles}
        onView={handleViewDetails}
        onEdit={handleEditClick}
      />
      {showAddForm && (
        <AddPopupForm
          columns={columns}
          onSubmit={handleAddVehicle}
          onClose={() => setShowAddForm(false)}
        />
      )}
      {showEditForm && (
        <EditPopupForm
          columns={columns}
          data={currentVehicle}
          onSubmit={handleEditVehicle}
          onClose={() => setShowEditForm(false)}
        />
      )}
      {showDetails && (
        <PopupDetails
          title="Vehicle Details"
          details={showDetails}
          onClose={() => setShowDetails(null)}
        />
      )}
    </PageWrapper>
  );
};

export default VehiclesPage;
