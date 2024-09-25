import React from 'react';
import Login from './login/page';
import { AuthProvider } from '../../context/authContext.js'

function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;
