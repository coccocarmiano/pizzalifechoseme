import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';

window.document.title = 'Pizza Life Chose Me?'

ReactDOM.render(
  <React.StrictMode>
    <div>
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Pizza Life" />
      <meta property="og:description" content="Scopri se la Pizza Life ti ha scelto." />
      <meta property="og:image" content="https://blog.papajohns.co.uk/wp-content/uploads/2015/12/Pizza-Thumbnail.jpg" />
      <Main/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
