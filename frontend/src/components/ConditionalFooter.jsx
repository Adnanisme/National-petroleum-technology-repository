import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

const ConditionalFooter = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  if (isAuthPage) return null;
  
  return <Footer />;
};

export default ConditionalFooter;