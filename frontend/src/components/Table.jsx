import styled from 'styled-components';
import { FaEdit, FaEye } from 'react-icons/fa';

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-family: Arial, sans-serif;

  th, td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: left;
  }

  th {
    background-color: rgb(126, 134, 201);
    color: white;
    text-transform: uppercase;
    font-size: 14px;
  }

  td {
    font-size: 14px;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px;
    transition: background-color 0.2s ease-in-out;
  }

  button:hover {
    background-color: #ddd;
    border-radius: 4px;
  }
`;

const ActionButton = styled.button`
  color: #555;
  font-size: 18px;

  &:hover {
    color: #007BFF;
  }
`;

const Table = ({ columns, data, onEdit, onView }) => {
    return (
      <TableWrapper>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{item[col.key]}</td>
              ))}
              <td>
                <ActionButton onClick={() => onEdit(item)}>
                  <FaEdit />
                </ActionButton>
                <ActionButton onClick={() => onView(item)}>
                  <FaEye />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    );
};  

export default Table;
