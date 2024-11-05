import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import Store from './Store/Store'
import App from './App/App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
)
