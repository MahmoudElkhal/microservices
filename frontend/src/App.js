import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ClientsPage from './pages/ClientsPage';
import VehiclesPage from './pages/VehiclesPage';
import WorkshopPage from './pages/WorkshopPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar style={{width: '25%'}}/>
        <div style={{marginLeft: '250px', padding: '10px', maxWidth: '75%'}}>
          <Routes>            
            <Route path="/" element={<ClientsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/workshop" element={<WorkshopPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
