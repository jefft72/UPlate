import React from 'react'
import TextType from './components/TextType'

export default function App() {
  return (
    <div className="app-root">
      <main className="hero">
        <h1 className="brand">UPlate</h1>
        <div className="tagline">
          <TextType
            text={"Your new college meal prep buddy"}
            as={'div'}
            className={'typing'}
            typingSpeed={50}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter={'|'}
            hideCursorWhileTyping={false}
          />
        </div>
      </main>
    </div>
  )
}
