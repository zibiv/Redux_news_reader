import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import store from './app/store';
import { Provider } from 'react-redux';
import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
