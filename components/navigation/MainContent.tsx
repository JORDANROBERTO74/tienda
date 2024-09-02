'use client'

import React from 'react'

interface PropsType {
  children?: React.ReactNode
}

const MainContent = ({ children }: PropsType) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 767)
    }
  }, [])

  return (
    <main
      style={{
        height: '100%',
        display: 'block'
      }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flex: 1
        }}
      >
        {children}
      </div>
    </main>
  )
}
export default MainContent
