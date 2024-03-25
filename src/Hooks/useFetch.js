import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = ({ url }) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const res = await axios.get(url);
      if (res.status >= 400) {
        throw Error('Could not fetch blogs data');
      }
      setData(res.data);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
