const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const WebSocket = require('ws');
const axios = require('axios');

const app = express();
const cors = require('cors');
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(bodyParser.raw({ type: '*/*' }));

// WebSocket Server setup
const wss = new WebSocket.Server({ port: 8080 });
let wsClient = null;

// WebSocket connections
wss.on('connection', (ws) => {
  console.log('Frontend connected via WebSocket');
  wsClient = ws;

  ws.on('message', (message) => {
    console.log('Message from frontend:', message);
  });

  ws.on('close', () => {
    console.log('Frontend disconnected');
    wsClient = null;
  });
});

// Filestack webhook secret
const secret = 'YOUR_WEBHOOK_SECRET'; // Replace with your Filestack webhook secret 

// Filestack API key
const filestackApiKey = 'YOUR_API_KEY'; // Replace with your Filestack API key

// Webhook endpoint
app.post('/webhook', async (req, res) => {
  console.log(`Request Signature: ${req.header('FS-Signature')}`);
  console.log(`Request Timestamp: ${req.header('FS-Timestamp')}`);
  console.log(`RawBody: ${req.body}`);

  const hash = crypto
    .createHmac('sha256', secret)
    .update(`${req.header('FS-Timestamp')}.${req.body}`)
    .digest('hex');

  console.log(
    `SIGNATURE IS ${hash === req.header('FS-Signature') ? 'OK' : 'NOT OK!'}`,
    hash,
    req.header('FS-Signature')
  );

  if (hash !== req.header('FS-Signature')) {
    console.error('Invalid webhook signature');
    return res.status(403).send('Forbidden');
  }

  const payload = JSON.parse(req.body);
  if (payload.action === 'fp.upload') {
    const fileUrl = payload.text.url;

    // Generate a thumbnail using Filestack transformations
    const thumbnailUrl = `https://cdn.filestackcontent.com/${filestackApiKey}/resize=width:100/${fileUrl.split('/').pop()}`;
    console.log('Generated Thumbnail URL:', thumbnailUrl);

    // Send the thumbnail URL to the frontend
    if (wsClient) {
      wsClient.send(JSON.stringify({ thumbnailUrl }));
      console.log('Thumbnail URL sent to frontend');
    }
  }

  res.status(200).send('Webhook processed');
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


