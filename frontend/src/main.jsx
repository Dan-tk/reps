import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WorkoutsContextProvider } from './context/WorkoutContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </React.StrictMode>,
)
