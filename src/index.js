import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Helmet} from "react-helmet";

ReactDOM.render(
  <React.StrictMode>
    <Helmet htmlAttributes={{ lang : "nl" }}>
      <title>Yo</title>
      <link rel="manifest" href="/public/site.webmanifest" />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

