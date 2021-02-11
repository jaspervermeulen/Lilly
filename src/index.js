import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Helmet} from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
    <Helmet htmlAttributes={{ lang : "nl" }}>
      <title>Licht {'&'} Liefde</title>
      <link rel="manifest" href="/public/site.webmanifest" />
      <link rel="apple-touch-icon" href="/public/logo192.png" />
      <link rel="apple-touch-icon" href="/public/logo512.png" />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

