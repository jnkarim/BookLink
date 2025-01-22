import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Flex Container for Navbar and Main Content */}
      <div className="flex flex-1">
        {/* Static Sidebar Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 font-primary">
          <Outlet /> {/* This is where the child routes will render */}
        </main>
      </div>

      {/* Footer */}
    
    </div>
  );
}

export default App;
