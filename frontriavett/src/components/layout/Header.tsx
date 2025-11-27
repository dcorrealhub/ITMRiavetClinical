import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  appName: string;
}

const Header: React.FC<HeaderProps> = ({ appName }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-medical-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <svg
                className="h-6 w-6 text-medical-blue-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold">{appName}</span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-medical-blue-600 text-white'
                  : 'text-blue-100 hover:bg-medical-blue-600 hover:text-white'
              }`}
            >
              Registros
            </Link>
            <Link
              to="/patients"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/patients')
                  ? 'bg-medical-blue-600 text-white'
                  : 'text-blue-100 hover:bg-medical-blue-600 hover:text-white'
              }`}
            >
              🐾 Pacientes
            </Link>
            <Link
              to="/owners"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/owners')
                  ? 'bg-medical-blue-600 text-white'
                  : 'text-blue-100 hover:bg-medical-blue-600 hover:text-white'
              }`}
            >
              👤 Propietarios
            </Link>
            <Link
              to="/veterinarians"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/veterinarians')
                  ? 'bg-medical-blue-600 text-white'
                  : 'text-blue-100 hover:bg-medical-blue-600 hover:text-white'
              }`}
            >
              👨‍⚕️ Veterinarios
            </Link>
            <Link
              to="/appointments"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/appointments')
                  ? 'bg-medical-blue-600 text-white'
                  : 'text-blue-100 hover:bg-medical-blue-600 hover:text-white'
              }`}
            >
              📅 Citas
            </Link>
            <Link
              to="/invoices"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/invoices')
                  ? 'bg-medical-blue-600 text-white'
                  : 'text-blue-100 hover:bg-medical-blue-600 hover:text-white'
              }`}
            >
              💰 Facturas
            </Link>
            <Link
              to="/records/new"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive('/records/new')
                  ? 'bg-medical-blue-600 text-white'
                  : 'text-blue-100 hover:bg-medical-blue-600 hover:text-white'
              }`}
            >
              Nuevo Registro
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
