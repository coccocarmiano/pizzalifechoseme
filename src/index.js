import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';

window.document.title = 'Pizza Life Chose Me?'

ReactDOM.render(
  <React.StrictMode>
      <Main/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
