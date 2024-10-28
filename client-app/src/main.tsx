import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import 'semantic-ui-css/semantic.min.css'
import {store, StoreContext} from "./app/stores/store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>
  </StrictMode>,
)
