/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useQuery } from 'react-query';
import { Config } from '../Config';

// authenticate the app and returns available Currencies
const API_KEY = '56eb99e066e5607c542a695420122f22';

export const useAuthenticateFetch = () => {
  const fetchAuthCurrency = async () => {
    try {
      const { data } = await axios.get(`${Config.url.API_URL}/latest?access_key=${API_KEY}`);
      const rateKeys = Object.keys(data.rates);
      return {
        data: rateKeys,
      };
    } catch (error) {
      console.log(error, 'error');
      return {
        errorResponse: error.response && error.response.data.message
          ? error.error.info
          : error.error.type,
      };
    }
  };
  const { status, data, isFetching } = useQuery(
    ['Auth'],
    () => fetchAuthCurrency(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    },
  );
  return { status, data, isFetching };
};


export const useCurrencyValue = (baseCurr, destCurr, baseValue) => {
  // console.log(baseCurr, destCurr, baseValue, 'values')
  const fetchCurrency = async () => {
    try {
      const { data } = await axios.get(`${Config.url.API_URL}convert?access_key=${API_KEY}&from=${baseCurr}&to=${destCurr}&amount=${baseValue}&date=2023-07-3}`);
      console.log(data, "final value")
      return {
        data
      };
    } catch (error) {
      console.log(error, 'erorrrrrr')
      return {
        error
      };
    }
  };

  const { status, data, isFetching } = useQuery(
    ['Currency', baseCurr, destCurr, baseValue],
    () => fetchCurrency(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    }
  );

  return { status, data, isFetching };
};
