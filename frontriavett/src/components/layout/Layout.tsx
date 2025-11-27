import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const appName = process.env.REACT_APP_APP_NAME || 'Veterinaria RiaVet';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header appName={appName} />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} {appName}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
