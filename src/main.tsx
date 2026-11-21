import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* used to get the users user token */}
    <UserProvider>
      <App/>
    </UserProvider>
  </StrictMode>
)
