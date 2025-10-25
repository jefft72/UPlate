import React, { useRef } from 'react'
import TextType from './components/TextType'
import ScrollReveal from './components/ScrollReveal'

export default function App() {
  const pagesRef = useRef<HTMLDivElement>(null)

  return (
    <div className="app-root">
      <div className="pages" ref={pagesRef}>
        {/* Page 1: Icon + brand + three-line tagline + caption */}
        <section className="page showcase">
          <div className="showcase-inner">
            <img src="/src/assets/plate_light.png" alt="UPlate app icon" className="app-icon" />

            <div className="showcase-hero">
              <h1 className="brand brand--centered">UPlate</h1>
              <div className="hero-taglines">
                <TextType
                  text={"Your new college meal prep buddy"}
                  splitLines={["Your new", "college meal", "prep buddy"]}
                  as={'div'}
                  className={'typing typing--hero'}
                  typingSpeed={100}
                  initialDelay={200}
                  showCursor={true}
                  cursorCharacter={'|'}
                  cursorBlinkDuration={1.0}
                />
              </div>
            </div>

            <p className="app-caption">A smarter way to plan meals in the dining hall</p>
          </div>
        </section>

        {/* Page 2: Scrolling text reveal page
            Initially shows only the centered title. As you scroll within the page,
            the paragraphs reveal word-by-word. */}
        <section className="page reveal">
          <div className="reveal-inner">
            <div className="reveal-hero">
              <h2 className="reveal-title">Why UPlate?</h2>
            </div>
            <div className="reveal-paragraphs">
              <ScrollReveal scrollContainerRef={pagesRef}>
                UPlate helps you plan dining hall meals quickly so you can spend less time deciding and more time enjoying your day.
              </ScrollReveal>
              <ScrollReveal scrollContainerRef={pagesRef}>
                Build a week of balanced plates, track portions, and discover new combos that fit your goals and your schedule.
              </ScrollReveal>
              <ScrollReveal scrollContainerRef={pagesRef}>
                Share favorites with friends, save time in line, and stay consistent without overthinking every meal.
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Gallery pages */}
        {/* Page 3: Gallery */}
        <section className="page gallery">
          <div className="gallery-inner">
            <p className="page-caption">caption</p>
            <div className="phones">
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
            </div>
          </div>
        </section>

        {/* Page 4: Gallery */}
        <section className="page gallery">
          <div className="gallery-inner">
            <p className="page-caption">caption</p>
            <div className="phones">
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
            </div>
          </div>
        </section>

        <section className="page gallery">
          <div className="gallery-inner">
            <p className="page-caption">caption</p>
            <div className="phones">
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
              <div className="phone">placeholder</div>
            </div>
          </div>
        </section>

        
      </div>
    </div>
  )
}

