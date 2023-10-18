const express = require('express')

const app = express();
const port = process.env.PORT;

let cachedApiResponse = null;
let lastCacheTime = new Date();
let triesNo = 0;

function getFormattedDate() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

  return `${year}-${month}-${day}`;

}

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/stock', (req, res) => {
    const now = new Date();
    console.log("now: ", now);

    if (triesNo === 1 && now.getDate() === lastCacheTime.getDate() + 1) {
        triesNo -= 1;
    }

    if (triesNo === 0 && now.getDate() === lastCacheTime.getDate()) {
        const formattedDate = getFormattedDate();
        console.log("formattedDate: ", formattedDate);
        console.log('API KEY: ', process.env.API_KEY);
        const stockApiUrl = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${formattedDate}?adjusted=true`;
        console.log("formattedDate: ", formattedDate);
        fetch(stockApiUrl, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
                'Origin': '',
              }
        })
        .then((response) => {
            if (response.ok) {
                console.log("response ok", response)
                return response.json();
            } else {
                console.error('Error fetching the request:', response.status, response.statusText);
                return null;
            }
        })
        .then((data) => {
            if (data !== null) {
                console.log("data: ", data)
                triesNo += 1;
                lastCacheTime = now;
                cachedApiResponse = data;
                res.send(data);
            }
        });
    } else {
        res.send(cachedApiResponse);
    }
    
})
  
  app.get('/', (req, res) => {
    res.send('Express server is running.');
  });
  
  app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
  });