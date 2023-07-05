/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
const prod = {
  url: { API_URL: 'http://data.fixer.io/api' },
};
const dev = {
  url: {
    API_URL: 'http://data.fixer.io/api',
  },
};

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;
