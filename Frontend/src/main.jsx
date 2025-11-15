import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { DataProvider } from './contexts/DataContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
   <BrowserRouter>
     <DataProvider>
       <AuthProvider>
         <App />
         <Toaster position="top-right" />
       </AuthProvider>
     </DataProvider>
   </BrowserRouter>
 </React.StrictMode>,
);