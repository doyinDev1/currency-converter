/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { Config } from '../Config';

// authenticate the app and returns available Currencies

const API_KEY = 'eaf8833ae84fb086eaa79797e568d780';
// Uncomment for some spare api keys ;
// const API_KEY = 'cb118a85f2fc350970c7c6edd541bffa';
// const API_KEY = '2c21d59490cd95903b1e12c8c798c9bc';

export const useAuthenticateFetch = () => {
  const fetchAuthCurrency = async () => {
    try {
      const { data } = await axios.get(`${Config.url.API_URL}/latest?access_key=${API_KEY}`);
      const rateKeys = Object.keys(data.rates);
      return {
        data: rateKeys,
      };
    } catch (error) {
      // console.log({ error });
      const { message } = error;
      // Throwing this error here because after 100 API calls it refuses to fetch ;
      if (message == 'Cannot convert undefined or null to object') {
        toast.error('Rate limit exceeded');
      }
      // throwing this error to check for network errors like disconnected internet
      if (error.message == 'Network Error') {
        toast.error('Network Error');
        // console.log({ error });
      }
      return error;
    }
  };
  const { status, data, isFetching } = useQuery(
    ['Auth'],
    () => fetchAuthCurrency(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );
  return { status, data, isFetching };
};

export const useDummyvalue = (baseCurr, destCurr, baseValue) => {
  const fetchDummy = async () => {
    try {
      const { data } = await axios.get(`${Config.url.API_URL}/latest?access_key=${API_KEY}`);
      // all the conversion logic goes here where we take all the values and calculate
      const subObject = data.rates;
      const keys = Object.keys(subObject);
      let newBaseCurr;
      let newDestCurr;
      // run a for while loop to get both the key and value of each ;
      // selected currencies i.e base & dest. currencies;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = subObject[key];
        if (key === baseCurr) {
          newBaseCurr = value;
        }
      }
      let j = 0;
      while (j < keys.length) {
        const key = keys[j];
        const value = subObject[key];
        if (key === destCurr) {
          newDestCurr = value;
        }
        j++;
      }
      const conversionRate = baseValue * newDestCurr / newBaseCurr;
      return {
        conversionRate,
      };
    } catch (error) {
      return {
        error,
      };
    }
  };

  const { status, data, isFetching } = useQuery(
    ['Currency', baseCurr, destCurr, baseValue],
    () => fetchDummy(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  );

  return { status, data, isFetching };
};
