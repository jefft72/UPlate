import React, { useRef, useEffect } from 'react'
import TextType from './components/TextType'
import ScrollReveal from './components/ScrollReveal'
import icon from './assets/plate_light.png'

const GALLERY_LOWER = import.meta.glob('./assets/**/*.{png,jpg,jpeg,webp,svg}', { eager: true, import: 'default' }) as Record<string, string>
const GALLERY_UPPER = import.meta.glob('./assets/**/*.{PNG,JPG,JPEG,WEBP,SVG}', { eager: true, import: 'default' }) as Record<string, string>
const ALL_GALLERY_IMAGES: string[] = Array.from(new Set([
  ...Object.values(GALLERY_LOWER),
  ...Object.values(GALLERY_UPPER)
])).sort()

export default function App() {
  const pagesRef = useRef<HTMLDivElement>(null)
  const phoneImages: string[] = ALL_GALLERY_IMAGES

  // Dev-only debug: log how many images were detected
  const isDev = (import.meta as any).env?.DEV
  useEffect(() => {
    if (isDev) {
      // eslint-disable-next-line no-console
      console.log('[Gallery] images found:', phoneImages.length, phoneImages)
    }
  }, [isDev, phoneImages])

  const chunkArray = (arr: string[], size: number) => {
    const res: any[] = []
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size))
    return res
  }

  const pages = chunkArray(phoneImages, 4)

  return (
    <div className="app-root">
      <div className="pages" ref={pagesRef}>
        {/* Page 1: Icon + brand + three-line tagline + caption */}
        <section className="page showcase">
          <div className="showcase-inner">
            <img src={icon} alt="UPlate app icon" className="app-icon" />

            <div className="showcase-hero">
              <h1 className="brand brand--centered text-gradient soft-glow">UPlate</h1>
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
            <div className="download-buttons">
              <a className="download-btn ios" href="https://testflight.apple.com/join/ENwzn4CK" aria-label="Test on iOS">
                <img src={icon} alt="App logo" className="btn-icon" />
                <span>Test on iOS</span>
              </a>

                <a className="download-btn android" href="https://groups.google.com/g/hello-world-2025" aria-label="Test on Android">
                  <img src={icon} alt="App logo" className="btn-icon" />
                  <span>Test on Android</span>
                </a>
            </div>
          </div>
        </section>

        {/* Page 2: Scrolling text reveal page
            Initially shows only the centered title. As you scroll within the page,
            the paragraphs reveal word-by-word. */}
        <section className="page reveal">
          <div className="reveal-inner">
            <div className="reveal-hero">
              <h2 className="reveal-title title-gradient">Why UPlate?</h2>
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
 
        <section className="page gallery">
            <div className="gallery-inner">
              <p className="page-caption">Smooth and intuitive UI</p>
              <div className="phones">
                {pages[0] && pages[0].length > 0 ? (
                  pages[0].map((src: string, i: number) => (
                    <div key={i} className="phone">
                      <img src={src} alt={`gallery ${i + 1}`} className="phone__img" />
                    </div>
                  ))
                ) : (
                  [1, 2, 3, 4].map(i => (
                    <div key={i} className="phone">placeholder</div>
                  ))
                )}
              </div>
            </div>
        </section>

        <section className="page gallery">
          <div className="gallery-inner">
            <p className="page-caption">Personalized goals and macros</p>
            <div className="phones">
              {pages[1] && pages[1].length > 0 ? (
                pages[1].map((src: string, i: number) => (
                  <div key={i} className="phone">
                    <img src={src} alt={`gallery ${i + 1}`} className="phone__img" />
                  </div>
                ))
              ) : (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="phone">placeholder</div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="page gallery">
          <div className="gallery-inner">
            <p className="page-caption">Easily filter out dietary restrictions</p>
            <div className="phones">
              {pages[2] && pages[2].length > 0 ? (
                pages[2].map((src: string, i: number) => (
                  <div key={i} className="phone">
                    <img src={src} alt={`gallery ${i + 1}`} className="phone__img" />
                  </div>
                ))
              ) : (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="phone">placeholder</div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="page gallery">
          <div className="gallery-inner">
            <p className="page-caption">Rank your dining courts and save your favorite foods and meals</p>
            <div className="phones">
              {pages[3] && pages[3].length > 0 ? (
                pages[3].map((src: string, i: number) => (
                  <div key={i} className="phone">
                    <img src={src} alt={`gallery ${i + 1}`} className="phone__img" />
                  </div>
                ))
              ) : (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="phone">placeholder</div>
                ))
              )}
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

