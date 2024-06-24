import './App.css';
import React from 'react';
import {
  RouterProvider,
} from "react-router-dom";
import routes from "./router"
import { SocketProvider } from "./Context/SocketContext";

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <SocketProvider>
          <RouterProvider router={routes} />
        </SocketProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
