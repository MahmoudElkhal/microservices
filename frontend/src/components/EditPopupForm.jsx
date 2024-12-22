import React, { useState } from 'react';
import styled from 'styled-components';

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 400px;
  border-radius: 8px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin: 10px 5px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  input {
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: #f7f9fc; /* Light background color for inputs */
    transition: all 0.3s ease;

    &:focus {
      border-color: #007bff;
      background-color: #ffffff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
    }
  }

  button {
    padding: 12px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: #0056b3;
      transform: translateY(-2px); /* Subtle lift effect */
    }
  }

  button:not(:last-child) {
    margin-bottom: 10px; /* Spacing between buttons */
  }

  .cancel-btn {
    background-color: #ccc;
    color: #333;

    &:hover {
      background-color: #bbb;
    }
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const EditPopupForm = ({ columns, data, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(() => {
    const initialState = {};
    columns.forEach((col) => {
      initialState[col.key] = data[col.key] || '';
    });
    return initialState;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <PopupWrapper>
        <Title>Edit</Title>
        <Form onSubmit={handleSubmit}>
          {columns.map((col, index) => (
            <div key={index}>
              <label>{col.header}</label>
              <input
                name={col.key}
                value={formData[col.key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </Form>
      </PopupWrapper>
    </>
  );
};

export default EditPopupForm;
