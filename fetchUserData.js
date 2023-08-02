const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
console.log(uuidv4()); // Outputs something like: '9b1deb4d-3

const fetchUserData = () => {
    axios.get('https://talktomerlin.com/s/reading', {
        headers: {
          'Header-Name': 'header value' // replace with your actual header name and value
        },
        withCredentials: true
      })
      .then(response => {
        // console.log(response.data);
        console.log(response.headers['set-cookie']); // this logs the cookies sent by the server
      })
      .catch(error => {
        console.log(error);
      });
}

fetchUserData()