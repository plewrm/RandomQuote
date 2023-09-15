// import React from "react";
// import DataCreate from './DataCreate'
// const CreateData =()=>{
// return(
//     <div>
//         <h2>Demo Create</h2>
//         {/* <DataCreate/> */}
//     </div>
// )
// }
// export default CreateData;

import React, { useState, useEffect } from "react";

function CreateData() {
  const [quotes, setQuotes] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const fetchQuote = () => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setQuotes((prevQuotes) => [...prevQuotes, data.slip.advice]);
        setRequestCount((prevCount) => prevCount + 1);
      });
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      if (requestCount < 25) {
        // Determine the interval based on the request count
        let interval;
        if (requestCount < 5) {
          interval = 5000; // 5 seconds for the first 5 calls
        } else if (requestCount < 10) {
          interval = 10000; // 10 seconds for the next 5 calls
        } else {
          // After the first 10 calls, double the interval every 5 calls
          const extraCalls = requestCount - 10;
          interval = Math.min(120000, 20000 * Math.pow(2, Math.floor(extraCalls / 5)));
        }

        timer = setInterval(fetchQuote, interval);
      } else {
        setIsRunning(false); // Stop calling API after 25 requests
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, requestCount]);

  return (
    <div>
      <h1>Random Quotes</h1>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>{quote}</li>
        ))}
      </ul>
    </div>
  );
}

export default CreateData;
