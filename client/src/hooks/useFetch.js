import { useEffect, useMemo, useState } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    setIsLoading(true);

    if (!url) {
      return;
    }

    fetch(url, stableOptions)
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
  }, [url, stableOptions]);

  return { data, error, isLoading };
}

export default useFetch;
