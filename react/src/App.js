import Navbar from './layout/Navbar';
import Home from './pages/Home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPatient from './patients/AddPatient';
import EditPatient from './patients/EditPatient';
import View from './patients/View';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addpatient" element={<AddPatient />} />
          <Route path='/editpatient/:id' element={<EditPatient />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
