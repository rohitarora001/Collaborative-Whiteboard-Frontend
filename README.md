# Whiteboard Application

A simple whiteboard application built with React and Tailwind CSS. This application allows users to draw freehand, rectangles, and circles on a canvas.

## Features

- Freehand drawing
- Drawing rectangles and circles
- Color picker for drawing
- Clear canvas functionality
- Responsive design using Tailwind CSS

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/whiteboard-app.git
    cd whiteboard-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

    or if you prefer using yarn:

    ```bash
    yarn install
    ```

3. Set up Tailwind CSS:

    If Tailwind CSS is not already configured in the project, you can install and set it up as follows:

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

    Configure the `tailwind.config.js` file to enable Tailwind:

    ```javascript
    // tailwind.config.js

    module.exports = {
      content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

    Create a `tailwind.css` file to include the base, components, and utilities:

    ```css
    /* src/tailwind.css */

    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

    Import this `tailwind.css` file in your `index.js` file:

    ```jsx
    // src/index.js

    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import './index.css';
    import App from './App';
    import './tailwind.css';

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    ```

### Running the Application

Start the development server:

```bash
npm start
or if you prefer using yarn:

yarn start
Open your browser and navigate to http://localhost:3000 to see the application in action.

Project Structure

src/: Main source directory
    components/: Contains React components
        Whiteboard.js: Main whiteboard component
    App.js: Main App component
    index.js: Entry point of the application
tailwind.css: Tailwind CSS configuration file
public/: Public directory for static files
tailwind.config.js: Tailwind CSS configuration file
postcss.config.js: PostCSS configuration file

Available Scripts
In the project directory, you can run:

npm start: Runs the app in the development mode.
npm test: Launches the test runner in the interactive watch mode.
npm run build: Builds the app for production to the build folder.
npm run eject: Removes the single build dependency from your project.

Contributing
Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Happy coding! 🎨

This `README.md` file provides clear instructions on how to set up and run the whiteboard application, along with a brief overview of its features and structure. Adjust the repository URL and other project-specific details as needed.
