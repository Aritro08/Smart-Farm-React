import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from "./components/Landing";
import CropForm from './components/CropForm';
import FertForm from './components/FertForm';
import DiseaseForm from './components/DiseaseForm';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/predict-crop" element={<CropForm />} />
          <Route path="/predict-fertilizer" element={<FertForm />} />
          <Route path="/detect-disease" element={<DiseaseForm />} />
        </Routes>
      </Router>
  );
}

export default App;
