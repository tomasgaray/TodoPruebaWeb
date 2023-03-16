const dev = {
    apiUri: "http://localhost:5280/api"
  };
  
  const prod = {
    apiUri: "PRODUCTION URL"
  };
  
  const environment = process.env.NODE_ENV === 'production'
    ? prod
    : dev;
  
  export default {
    ...environment
  };
