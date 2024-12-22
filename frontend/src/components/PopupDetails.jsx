import React from 'react';
import styled from 'styled-components';

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
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

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;
    font-size: 16px;
  }
`;

const PopupDetails = ({ title, details, onClose }) => {
  return (
    <>
      <Overlay onClick={onClose} />
      <PopupWrapper>
        <h2>{title}</h2>
        <DetailsList>
          {Object.entries(details).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </DetailsList>
        <button onClick={onClose}>Close</button>
      </PopupWrapper>
    </>
  );
};

export default PopupDetails;