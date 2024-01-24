const express = require('express');
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

app.post('/contact', (req, res) => {
  const { author, message, contactEmail } = req.body;

  if (!author || !message || !contactEmail) {
    return res.status(400).json({ error: 'Author, message, and contactEmail are all required.' });
  }

  const dist = process.env.DESTINATION;

  axios.post(dist, {
    content: `Mail Received\n\nAuthor: ${author}\nMessage: ${message}\nTheir Mail: ${contactEmail}\nRecieved at: ${Date.now()}`,
  })
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => {
      console.error(error.message);
      res.status(500).json({ error: 'INTERNAL SERVER ERROR' });
    });
});