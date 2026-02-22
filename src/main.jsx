import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
 
const stripePromise=loadStripe("pk_test_51T39SyFmCpiIv0B5rZsEJDJo6qPA52Ghh7FxiwGOo0WHCngwXiWaeWxeukR0a9qLWl9C9Yq9SWsZqiXPLnR4amnT0018hNrC1w")
createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <Elements stripe={stripePromise}>

<App/>
    </Elements>
  </Provider>,
)
