import { useState } from "react";

function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function fetchData(url, options = {}) {
    if (!url) {
      return;
    }

    setIsLoading(true);

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(error.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return [data, error, isLoading, fetchData];
}

export default useFetch;
