const express = require('express')
const app = express();
const port = process.env.PORT;
const apiKey = process.env.API_KEY;

let cachedResponse = null;
let lastCachedTime = null;
let fetchingData = false;
  
const cacheStockData = async () => {
    try {
      if (fetchingData) {
        return;
      }

      const now = new Date();
  
      if (!cachedResponse || !lastCachedTime || now.getDate() !== lastCachedTime.getDate()) {
        let yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        if (yesterday.getDay() === 0) {
          console.log("Yesterday was Sunday. Stock market was closed. Retrieving data from Friday.");
          yesterday.setDate(yesterday.getDate() - 2);
        } else if (yesterday.getDay() === 6) {
          console.log("Yesterday was Saturday. Stock market was closed. Retrieving data from Friday.");
          yesterday.setDate(yesterday.getDate() - 1);
        }
  
        const formattedDate = getFormattedDate(yesterday);
        fetchingData = true;
  
        const response = await fetch(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${formattedDate}?adjusted=true`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Origin': '*',
          }
        });
        console.log('resp: ', response);
  
        if (response.ok) {
          cachedResponse = await response.json();
          lastCachedTime = now;
        } else {
          console.error('Error fetching the request:', response.status, response.statusText);
        }
        fetchingData = false; 
      }
    } catch (error) {
      console.error(error);
      fetchingData = false; 
    }
  };
  
  const getFormattedDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  app.get('/stock/stock.json', async (req, res) => {
    await cacheStockData();
  
    if (cachedResponse) {
      const filename = 'stock-data.json';
      res.set('Content-Disposition', `attachment; filename="${filename}"`);
      res.json(cachedResponse);
    } else {
      res.status(500).send({
        message: 'Stock data is not cached.'
     });
    }
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  })
  
  app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
  });
