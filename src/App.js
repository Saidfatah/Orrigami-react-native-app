import React from 'react';
import Navigation from './components/Navigation/Navigation'
import AuthProvider from './Context/AuthProvider'
const App = () => {
  return  <AuthProvider>
    <Navigation />
  </AuthProvider>
};


export default App;
