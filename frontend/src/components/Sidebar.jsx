import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SidebarWrapper = styled.div`
  background-color: #f4f4f4;
  width: 200px;
  height: 100vh;
  padding: 20px;
  position: fixed;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const SidebarList = styled.ul`
  list-style-type: none; /* Removes the bullet points */
  padding: 0;
  margin: 0;
`;

const StyledLink = styled(NavLink)`
  color: #333;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  display: block;
  
  &:hover {
    background-color: #ddd;
    border-radius: 4px;
  }

  &.active {
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarList>
        <ListItem>
          <StyledLink to="/clients" activeClassName="active">
            Clients
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/vehicles" activeClassName="active">
            Vehicles
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/workshop" activeClassName="active">
            Workshop
          </StyledLink>
        </ListItem>
      </SidebarList>
    </SidebarWrapper>
  );
};

export default Sidebar;
