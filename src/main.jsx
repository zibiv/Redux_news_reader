import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import store from './app/store';
import { Provider } from 'react-redux';
import { worker } from './mocks/browser';


  worker.start()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
