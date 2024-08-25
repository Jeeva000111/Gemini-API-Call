# CHAT BOT
## Installation
1. npm install
2. create .env file and add your API key as:
     API_KEY="Paste API Key here"

3.Download the gcloud using cmd.

npm i 

gcloud auth application-default login --client-id-file=client_secret.json --scopes='https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/generative-language.retriever'

auth complete

gcloud auth application-default print-access-token ==> token

xios.defaults.headers.common["Authorization"] =
  "Bearer <token>";

example : {
    axios.defaults.headers.common["Authorization"] ="Bearer ya29.a0AcM612xWAW00_eFSi419ji4aP3zsn6_ms_bQS1d2tMJ_jjVa8-b-gEJR0rLXpNazopbVYH0HcRRAedqvZuJKOwqWbSSWg8B8inEg6PvcvXLiAWyk4e4My_k7ckvLK3EdwoRDAHkgjE_7LB5AxD2fVXEFnn6B5x1e19D9aCgYKAeoSARASFQHGX2MiGVNxvQSx-26_9kNsvKzxOw0171";
}

node .

