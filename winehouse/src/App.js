import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://www.mocky.io/v2/598b16861100004905515ec7")
      .then(res => res.json())
      .then(
        data => {
          setIsLoaded(true);
          setItems(data);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // const bestBuyerEx = items.reduce((acc, item) => {
  //   if(!acc[item.cliente]){
  //     acc[item.cliente] = 0;
  //   }
  //   acc[item.cliente] += valorTotal;
  //   return acc;
  // });

  if (error) {
    // a ideia aqui é que todos os casos que possam causar erro sejam tratados antes de manipular os dados (e.g. loading e error)
    return <div>Error: {error.message}</div>;
  }

  if (!isLoaded) {
    // o useEffect é sincrono, então ele vai ser chamado no inicio do código e pedir os dados pra API, mas o código segue pra renderizar o HTML
    return <div>Loading...</div>; // o que acontece é que vc pode ter alguns frames sem dados até que o fetch termine (o que pode levar alguns ms, ou minutos, dependendo da quantidade de dados)
  }

  const bestBuyer = items.reduce((acc, e) => {
    return {
      // isso aqui funciona, porém a ideia é dar assign direto pro acc, pra n criar um objeto novo em toda iteração
      [e.cliente]: e.valorTotal, // código aqui ta funcionando, mas os valores n somam pq cada vez q tiver o mesmo cliente, o valor vai ser sobrescrito
      ...acc
    };
  }, {});

  console.warn(bestBuyer);

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

export default App;
