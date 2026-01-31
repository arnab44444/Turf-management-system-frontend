import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

//import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import router from './routes/router.jsx'
// // import AuthProvider from './provider/AuthProvider.jsx'
// // import { RouterProvider } from 'react-router'
// // import { ToastContainer } from 'react-toastify'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider >
//     <ToastContainer></ToastContainer>
//       <RouterProvider router={router}></RouterProvider>
//     </AuthProvider>
//   </StrictMode>,
// )