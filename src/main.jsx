import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  store  from './store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster/>
    </Provider>
  </StrictMode>,
)
