/* eslint-disable linebreak-style */
const prod = {
  url: {
    API_URL: 'http://data.fixer.io/api',
  },
};
const dev = {
  url: {
    API_URL: 'http://data.fixer.io/api',
  },
};

// eslint-disable-next-line import/prefer-default-export
export const Config = process.env.NODE_ENV === 'development' ? dev : prod;
