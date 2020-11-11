import axios from 'axios';


const apiStaticPath = 'https://pherapeutic.itechnolabs.tech/api/v1/';

const APICaller = (endpoint, method, body, contentType, Authorization) =>
  axios({
    url: `${apiStaticPath}${endpoint}`,
    method: method || 'GET',
    data: body,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": contentType || 'application/json',
      "Authorization": `Bearer ${Authorization}` || null
    },
    responseType: 'json'
  })
    .then((response) => {
      console.log('response from ', endpoint, ' => ', response);
      return response;
    })
    .catch((error) => {
      console.log('error from ', endpoint, ' => ', error);
      throw error.response;
    });

export default APICaller;