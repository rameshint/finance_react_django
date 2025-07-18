import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { menuItems } from './constants/menuItems';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute';
import PageNotFound from './pages/PageNotFound';



function App() {
  const token = localStorage.getItem('access_token');
  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return (
    <Router>
      <Layout>
        <Routes>
          {menuItems
          .map((item, index) => (
            // if path not available in menuItems, it will not be rendered and show 404 page
            item.path === '/login' ? 
            <Route key={index} path={item.path} element={item.element}></Route> : 
            // Otherwise, wrap the element with PrivateRoute
            <Route key={index} path={item.path} element={<PrivateRoute>{item.element}</PrivateRoute>}></Route>
          ))}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
