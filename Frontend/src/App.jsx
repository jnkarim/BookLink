import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full px-12 py-6 font-primary">
        <Outlet /> {/* This is where the child routes will render */}
      </main>
      <Footer />
    </>
  );
}

export default App;
