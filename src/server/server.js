// server/server.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let items = require('./data');

try {
  app.get('/items', (req, res) => {
    res.json(items);
  });
  app.get('/search', (req, res) => {
    const results = items.filter((el) =>
      el.name.toLowerCase().includes(req.query.q.toLowerCase())
    );
    res.json(results);
  });

  app.get('/items/:name', (req, res) => {
    const item = items.find((item) => item.name === req.params.name);
    res.json(item);
  });

  app.delete('/items', (req, res) => {
    items = [];
    res.json(items);
  });

  app.post('/items', (req, res) => {
    items.push(req.body);
    res.json(items);
  });

  app.delete('/items/:name', (req, res) => {
    items = items.filter((item) => item.name !== req.params.name);
    res.json(items);
  });

  app.patch('/items/:name', (req, res) => {
    const index = items.findIndex((item) => item.name === req.params.name);
    if (index !== -1) {
      items[index] = req.body;
    }
    res.json(items);
  });
} catch (e) {
  console.log(e);
}
app.listen(4000, () => {
  console.log('Server listening on http://localhost:4000');
});
