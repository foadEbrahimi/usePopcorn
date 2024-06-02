import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import StarRating from './components/StarRating.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <StarRating
    maxRating={5}
    messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    defaultRating={3}
    />
    <StarRating size={24} color="red" maxRating={5} className="text" /> */}
  </React.StrictMode>
);
