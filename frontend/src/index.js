import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Component/AuthContext';
import { ToastContainer } from 'react-toastify';
import Header from './Component/Header';
import { StoreProvider } from './Store';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <StoreProvider>
          <Header />
          <ToastContainer theme='dark' position='top-right' autoClose={3000} closeOnClick pauseOnHover={false} />

          <App />
        </StoreProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
