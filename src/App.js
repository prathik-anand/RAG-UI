import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(''); // State to hold the API response
  const [loading, setLoading] = useState(false); // State to track loading status

  const API_BASE_URL = 'http://localhost:5000'; // Define the base URL

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Query submitted:', query); // Log the query

    setLoading(true); // Set loading to true when the request starts

    // Example API request
    fetch(`${API_BASE_URL}/api/query`, { // Use the base URL here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }), // Send the query in the request body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data); // Handle the response data
        setAnswer(data.answer); // Update the answer state with the response
      })
      .catch((error) => {
        console.error('Error:', error); // Handle any errors
        setAnswer('Error fetching answer.'); // Set an error message
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request completes
      });
  };

  return (
    <div className="App">
      <h1 className="app-title">LLM Query App</h1>
      <form onSubmit={handleSubmit} className="query-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
          className="query-input"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {loading && <div className="loader"></div>} {/* Display loading spinner */}
      {answer && (
        <div className="response">
          <h2>Response:</h2> {/* Header for the response */}
          <p>{answer}</p> {/* Display the API response */}
        </div>
      )}
    </div>
  );
}

export default App;
