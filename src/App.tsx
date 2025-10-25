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
                UPlate helps you plan college specific dining hall meals quickly. Gone are the meal prepping apps where you're left guessing your serving sizes or macros of generic foods — find your specific dining hall macros.
              </ScrollReveal>
              <ScrollReveal scrollContainerRef={pagesRef}>
                With UPlate, you can set fine tuned goals customized to your goals, track portions, macros, and discover new combos to be the best version of you.
              </ScrollReveal>
              <ScrollReveal scrollContainerRef={pagesRef}>
                Save your favorite foods, easily filter out dietary restrictions, and stay consistent every meal.
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

