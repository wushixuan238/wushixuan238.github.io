import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Greeting } from './components/Greeting.tsx'
import { TerminalContextProvider } from 'react-terminal'

import { HashRouter } from 'react-router-dom'

function Root() {
  const [showGreeting, setShowGreeting] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleGreetingComplete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowGreeting(false);
    }, 1000); // 1 second fade duration
  };

  return (
    <>
      {showGreeting && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF9F6] transition-opacity duration-1000 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <Greeting onComplete={handleGreetingComplete} />
        </div>
      )}
      <div className={`transition-opacity duration-1000 ease-in-out ${fadeOut || !showGreeting ? 'opacity-100' : 'opacity-0 overflow-hidden h-screen'}`}>
        <App />
      </div>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TerminalContextProvider>
        <Root />
      </TerminalContextProvider>
    </HashRouter>
  </StrictMode>,
)
