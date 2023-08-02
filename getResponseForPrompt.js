const axios = require("axios");

const getResponseForPrompt = async (messages, headers, body) => {
  console.log("getResponseForPrompt", messages);
  console.log("getResponseForPrompt", headers);
  console.log("getResponseForPrompt", body)
  console.log("getResponseForPrompt", {...body})

  let response = null;


  try {
    console.log(JSON.stringify({...body, messages: messages}))
    response = await axios({
      method: "post",
      url: "https://talktomerlin.com/api/chat",
      data: {...body, messages: messages},
      headers: headers,
      responseType: "stream",
    });
    
  } catch (error) {
    console.log(error.message)
  }

  return response;
};

module.exports = getResponseForPrompt;