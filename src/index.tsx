import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Coast from './Coast';
import Compound from './Compound';
import Saving from './Saving';
import Fire from './Fire';
import NotFound from './NotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Coast />} />
          <Route path="compound" element={<Compound />} />
          <Route path="saving" element={<Saving />} />
          <Route path="fire" element={<Fire />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
