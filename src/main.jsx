import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';

import { persistor, store } from './redux/store';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './components/ThemeProvider.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider><App /></ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
