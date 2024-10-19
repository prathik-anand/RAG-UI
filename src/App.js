import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import QueryApp from './components/QueryApp';
import { checkSession } from './utils/auth'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const validateSession = async () => {
      const valid = await checkSession();
      setIsLoggedIn(valid);
    };
    validateSession();
  }, []);

  if (isLoggedIn === null) return <div>Loading...</div>; 

  return (
    <div className="App">
      <h1 className="app-title">LLM Query App</h1>
      {isLoggedIn ? <QueryApp /> : <Auth setIsLoggedIn={setIsLoggedIn} />} {/* Conditional rendering */}
    </div>
  );
}

export default App;
