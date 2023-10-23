[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Stock API</h1>
Express.js server which retrieves stock data from previous date using ([Polygon Stock API](https://polygon.io/stocks?utm_term=stock%20api&utm_campaign=Stocks+-+INT&utm_source=adwords&utm_medium=ppc&hsa_acc=4299129556&hsa_cam=13075782420&hsa_grp=133850772646&hsa_ad=592165834550&hsa_src=g&hsa_tgt=aud-1929552685191:kwd-301178080709&hsa_kw=stock%20api&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gad=1&gclid=CjwKCAjws9ipBhB1EiwAccEi1EuLNm8g97sENb2nbZxGFuFK5gV5B47W8_2CotF6Wxcy7HY7hgbzBhoCFu8QAvD_BwE)).

## 📚 Prerequisites

- node.js ([Install from here](https://nodejs.org/en/download/))
- Docker ([Managed as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/))
- A Unix based operating system (Mac or Linux)

## 🦑 Development

The project is authored with JavaScript and compiled with `js`.

```bash
npm install

export PORT=3000
export API_KEY='<YOUR_SECRET_API_KEY>'

node --input-type=module server.js
```

## 🌐 Endpoints

### GET /stock/stock.json

Returns:
JSON object containing the stock market data from the previous date

Example:

```
GET https://stock-api.oceanprotocol.com/stock/stock.json

```

Response:

```json
{
  {
    "queryCount": 10953,
    "resultsCount": 10953,
    "adjusted": true,
    "results": [
        {
            "T": "TTMI",
            "v": 394280,
            "vw": 16.1078,
            "o": 15.96,
            "c": 16.08,
            "h": 16.335,
            "l": 15.96,
            "t": 1673298000000,
            "n": 5416
        },
        {
            "T": "OEC",
            "v": 485157,
            "vw": 19.0627,
            "o": 18.67,
            "c": 18.98,
            "h": 19.43,
            "l": 18.45,
            "t": 1673298000000,
            "n": 8130
        },
        .
        .
        .
    ]
}
```

## 🏛 License

```
Copyright ((C)) 2023 Ocean Protocol Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
