import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import RecordCreate from './pages/RecordCreate';
import PatientsPage from './pages/PatientsPage';
import PatientCreate from './pages/PatientCreate';
import PatientEdit from './pages/PatientEdit';
import PatientMerge from './pages/PatientMerge';
import OwnersPage from './pages/OwnersPage';
import OwnerCreate from './pages/OwnerCreate';
import OwnerEdit from './pages/OwnerEdit';
import VeterinariansPage from './pages/VeterinariansPage';
import VeterinarianCreate from './pages/VeterinarianCreate';
import VeterinarianEdit from './pages/VeterinarianEdit';
import AppointmentsPage from './pages/AppointmentsPage';
import AppointmentCreate from './pages/AppointmentCreate';
import AppointmentEdit from './pages/AppointmentEdit';
import InvoicesPage from './pages/InvoicesPage';
import InvoiceCreate from './pages/InvoiceCreate';
import InvoiceEdit from './pages/InvoiceEdit';
import ApiTest from './pages/ApiTest';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/records/new" element={<RecordCreate />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/patients/new" element={<PatientCreate />} />
          <Route path="/patients/edit/:id" element={<PatientEdit />} />
          <Route path="/patients/merge/:id" element={<PatientMerge />} />
          <Route path="/owners" element={<OwnersPage />} />
          <Route path="/owners/create" element={<OwnerCreate />} />
          <Route path="/owners/edit/:id" element={<OwnerEdit />} />
          <Route path="/veterinarians" element={<VeterinariansPage />} />
          <Route path="/veterinarians/create" element={<VeterinarianCreate />} />
          <Route path="/veterinarians/edit/:id" element={<VeterinarianEdit />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/appointments/create" element={<AppointmentCreate />} />
          <Route path="/appointments/edit/:id" element={<AppointmentEdit />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/invoices/create" element={<InvoiceCreate />} />
          <Route path="/invoices/edit/:id" element={<InvoiceEdit />} />
          <Route path="/api-test" element={<ApiTest />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
