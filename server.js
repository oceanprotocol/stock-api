const express = require('express')

const app = express();
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

let cachedResponse = null;
let lastCachedTime = null;
  
const cacheStockData = async () => {
    try {
      const now = new Date();
  
      if (!cachedResponse || !lastCachedTime || now.getDate() !== lastCachedTime.getDate()) {
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        console.log('yesterday: ', yesterday);
  
        const formattedDate = getFormattedDate(yesterday);
  
        const response = await fetch(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${formattedDate}?adjusted=true`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Origin': '*',
          }
        });
  
        if (response.ok) {
          cachedResponse = await response.json();
          lastCachedTime = now;
        } else {
          console.error('Error fetching the request:', response.status, response.statusText);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const getFormattedDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  app.get('/stock.json', (req, res) => {
    cacheStockData();
  
    if (cachedResponse) {
        console.log('The reponse was cached.');
      res.json(cachedResponse);
    } else {
      res.sendStatus(500);
    }
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })
  
  app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
  });