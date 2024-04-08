import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Consumer from './routes/Consumer';
import Restaurant from './routes/Restaurant';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/*" element={<Consumer />} />
          <Route path="/restaurant/*" element={<Restaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
