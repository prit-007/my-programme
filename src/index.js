import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Layout2 from './components/Layout2';
import Aadmi from './Aadmi';
import AadmiDetail from './AadmiDetail';
import AddAadmi from './Add_Aadmi';

const darkTheme = createTheme({ palette: { mode: 'dark' } })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout2 />} >
          <Route index element={<Aadmi />} />
          <Route path="/details/person/id/:id" element={<AadmiDetail />} />
          <Route path="/addPerson" element={<AddAadmi/>} />
          <Route path="/editPerson/:id" element={<AddAadmi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
