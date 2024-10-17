# LLM Query App

This project is a simple React application that allows users to submit queries and receive responses from a language model API.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/prathik-anand/RAG-UI.git
   cd RAG-UI
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up the API:
   - Ensure you have the API running at `http://localhost:5000`. You can modify the base URL in the `src/App.js` file if needed.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### Features

- Submit queries to a language model API.
- Display responses and loading indicators.
- Error handling for API requests.
