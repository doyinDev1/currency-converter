/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useQuery } from 'react-query';
import { Config } from '../Config';

// authenticate the app and returns available Currencies
const API_KEY = 'dbd301ab61c39fbec84513eedc182e5f';

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



export const useDummyvalue = (baseCurr, destCurr, baseValue) => {
  const fetchDummy = async () => {
    try {
      const { data } = await axios.get(`${Config.url.API_URL}/latest?access_key=${API_KEY}`);
      // all my conversion logic goes here where i take all my values and manipulate them haha!

      const subObject = data.rates;
      const keys = Object.keys(subObject);

      let _baseCurr;
      let _destCurr;
      //run a for while loop to get both the key and value of each selected currencies i.e base & dest. currencies
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = subObject[key];
        if (key === baseCurr) {
          _baseCurr = value;
        }
      }
      let j = 0;
      while (j < keys.length) {
        const key = keys[j];
        const value = subObject[key];
        if (key === destCurr) {
          _destCurr = value;
        }
        j++;
      }
      const conversionRate = baseValue * _destCurr / _baseCurr ;
      return {
        conversionRate
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
    () => fetchDummy(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    }
  );

  return { status, data, isFetching };
};