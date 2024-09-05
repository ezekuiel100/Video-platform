import { useCallback, useState } from "react";

function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback((url, options = {}) => {
    if (!url) {
      return;
    }

    setIsLoading(true);

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setData(data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, error, isLoading, fetchData };
}

export default useFetch;
