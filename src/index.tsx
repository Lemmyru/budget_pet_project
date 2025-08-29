import {createRoot} from "react-dom/client";
import App from "./components/App";
import React from "react";
import '../src/components/App.scss'

const root = document.getElementById('root');

if (!root) {
    throw new Error('No root element');

}

const container= createRoot(root)

container.render(<App />)