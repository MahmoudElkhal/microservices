import styled from 'styled-components';

const HeaderWrapper = styled.header`
  max-width: 100%;
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: left;
  font-size: 20px;
`;

const Header = () => {
  return <HeaderWrapper>Garage Management System</HeaderWrapper>;
};

export default Header;
