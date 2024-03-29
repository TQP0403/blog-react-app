import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { FETCH_DATA_INIT_STATE, FetchDataActionType, fetchDataReducer } from './fetchDataReducer';

const useFetch = ({ url }) => {
  const [state, dispatch] = useReducer(fetchDataReducer, FETCH_DATA_INIT_STATE);

  const fetchData = async (url) => {
    try {
      dispatch({ type: FetchDataActionType.FETCH_START });
      const res = await axios.get(url);
      if (res.status >= 400) {
        throw Error('Could not fetch blogs data');
      }
      const data = res.data;
      dispatch({ type: FetchDataActionType.FETCH_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({ type: FetchDataActionType.FETCH_ERROR, payload: { error } });
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return state;
};

export default useFetch;
