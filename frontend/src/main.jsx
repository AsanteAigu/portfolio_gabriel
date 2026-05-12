import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CursorProvider } from '@/context/CursorContext'
import Cursor from '@/components/ui/Cursor'
import Loader from '@/components/ui/Loader'
import App from './App'

import './styles/global.css'
import './styles/typography.css'
import './styles/animations.css'

function Root() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <CursorProvider>
        <Cursor />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CursorProvider>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
