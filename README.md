# Image Upload with Webhook and WebSocket Integration#

This project demonstrates an application where users can upload an image via the frontend, and the backend processes the image through a webhook using Filestack's services. A thumbnail is generated for the uploaded image, and the WebSocket server sends the generated thumbnail's URL to the frontend, where it is displayed alongside the original image.

## Features

**Image Upload:** Allows users to upload images using the Filestack API.
**Filestack Webhooks:** Processes uploaded images and generates thumbnails.
**WebSocket Integration:** Updates the frontend in real-time with the generated thumbnail URL.
**Responsive Design:** Clean and user-friendly UI.

##Technologies Used

**Frontend:** HTML, CSS, JavaScript
**Backend:** Node.js, Express.js
**API:** Filestack API
**WebSocket:** For real-time communication between the server and frontend

## How It Works

### Frontend:

- The user uploads an image via the file input.
- The uploaded image is displayed immediately as the "Original Image."

### Backend:

- A webhook is triggered upon the file upload.
- The backend verifies the webhook signature and processes the request.
- A thumbnail is generated using Filestack transformations.
- The thumbnail URL is sent to the frontend via WebSocket.

### Frontend (Real-Time Update):

- The frontend receives the thumbnail URL through WebSocket.
- The thumbnail is displayed next to the original image.

## Installation and Setup

### Prerequisites

- Node.js installed on your machine
- Filestack API key and Webhook secret
- ngrok for exposing your local backend to Filestack's webhook (useful for local server testing).
  
### Clone the Repository

`git clone https://github.com/shamalja/image-upload-webhook-websocket.git`
`cd image-upload-webhook-websocket`

### Backend Setup

- Navigate to the backend folder.
- Install dependencies:

`npm install`

- Replace the placeholders in the backend (index.js) with your Filestack API key and Webhook secret:

####javascript

```const secret = 'YOUR_WEBHOOK_SECRET'; // Replace with your Filestack webhook secret
const filestackApiKey = 'YOUR_API_KEY'; // Replace with your Filestack API key```

- Start the backend server:

`node index.js`

- Expose the backend to the internet using ngrok:

`ngrok http 3000`

- Copy the generated https URL and update it in your Filestack Webhook configuration.

###Frontend Setup

- Replace the placeholder API key in the frontend HTML file with your Filestack API key:

####javascript

`const client = filestack.init('YOUR_API_KEY'); // Replace with your Filestack API Key`

- Open the HTML file in a browser.

##Usage
- Open the frontend in your browser.
- Upload an image using the file input.
- The original image will display instantly.
- After the webhook processes the uploaded image, the thumbnail will appear next to the original image.

##Project Structure
.
├── backend
│   └── index.js   # Node.js backend handling webhook and WebSocket
├── frontend
│   └── index.html # Frontend HTML file for the image upload UI
└── README.md      # This file

##Example Output

**Original Image:** Displays the uploaded image.
**Thumbnail:** Displays the generated thumbnail beside the original image.

##Troubleshooting
- Ensure the Filestack Webhook secret matches the one configured in the backend.
- Check the WebSocket server is running on port 8080.
- Use ngrok to expose your backend to the internet and ensure Filestack can reach the webhook endpoint.
- Verify that your API key is correct and has the necessary permissions.

##Contributing
Feel free to fork the repository, open issues, or submit pull requests. All contributions are welcome!

##License
This project is licensed under the MIT License.

##Acknowledgments
Filestack API Documentation
ngrok for exposing local servers
The Node.js and WebSocket community for guidance and inspiration
