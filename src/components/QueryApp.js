import React, { useState } from 'react';

const QueryApp = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState(''); // State to hold the API response
  const [loading, setLoading] = useState(false); // State to track loading status

  const API_BASE_URL = `${process.env.REACT_APP_RAG_SERVICE_URL}`;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('Query submitted:', query); // Log the query

    setLoading(true); // Set loading to true when the request starts

 
    fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Include the access token
      },
      body: JSON.stringify({ query }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data); 
        setAnswer(data.answer);
      })
      .catch((error) => {
        console.error('Error:', error);
        setAnswer('Error fetching answer.');
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div>
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
};

export default QueryApp;

