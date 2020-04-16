import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://www.mocky.io/v2/598b16861100004905515ec7")
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
      <ul>
      {items.map(item => (
        <li>
          {item.cliente} 
          <span>/</span>
          {item.valorTotal}
        </li>
      ))}
      </ul>
      </div>
    );
  }
}

export default App;
