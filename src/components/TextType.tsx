import React, { ElementType, useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'
import './TextType.css'

interface TextTypeProps {
  className?: string
  showCursor?: boolean
  hideCursorWhileTyping?: boolean
  cursorCharacter?: string | React.ReactNode
  cursorBlinkDuration?: number
  cursorClassName?: string
  text: string | string[]
  as?: ElementType
  typingSpeed?: number
  initialDelay?: number
  pauseDuration?: number
  deletingSpeed?: number
  loop?: boolean
  textColors?: string[]
  variableSpeed?: { min: number; max: number }
  onSentenceComplete?: (sentence: string, index: number) => void
  startOnVisible?: boolean
  reverseMode?: boolean
  /** Optional: display the typed string across these visual lines (will type the joined string) */
  splitLines?: string[]
}

const TextType: React.FC<TextTypeProps & React.HTMLAttributes<HTMLElement>> = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(!startOnVisible)
  const cursorRef = useRef<HTMLSpanElement | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text])

  // Optional split-lines: display the typed string across multiple visual lines
  const splitLines = (props as any).splitLines as string[] | undefined
  const usingSplit = !!(splitLines && splitLines.length)
  const fullText = useMemo(() => {
    // Join with no extra spaces so character counts match exact visual lines
    if (usingSplit && splitLines) return splitLines.join('')
    return Array.isArray(text) ? text.join(' ') : text
  }, [usingSplit, splitLines, text])

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed
    const { min, max } = variableSpeed
    return Math.random() * (max - min) + min
  }, [variableSpeed, typingSpeed])

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return undefined
    return textColors[currentTextIndex % textColors.length]
  }

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [startOnVisible])

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 })
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }
  }, [showCursor, cursorBlinkDuration])

  useEffect(() => {
    if (!isVisible) return

    let timeout: number | undefined

  const currentText = usingSplit ? fullText : textArray[currentTextIndex]
  const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText

    const executeTypingAnimation = () => {
      // When using splitLines we treat the whole block as one continuous string and
      // do not perform the delete/loop behavior. Otherwise keep the original behavior.
      if (!usingSplit && isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false)
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return
          }

          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex)
          }

          setCurrentTextIndex(prev => (prev + 1) % textArray.length)
          setCurrentCharIndex(0)
          timeout = window.setTimeout(() => {}, pauseDuration)
        } else {
          timeout = window.setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1))
          }, deletingSpeed)
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = window.setTimeout(
            () => {
              setDisplayedText(prev => prev + processedText[currentCharIndex])
              setCurrentCharIndex(prev => prev + 1)
            },
            variableSpeed ? getRandomSpeed() : typingSpeed
          )
        } else if (!usingSplit && textArray.length > 1) {
          timeout = window.setTimeout(() => {
            setIsDeleting(true)
          }, pauseDuration)
        }
      }
    }

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = window.setTimeout(executeTypingAnimation, initialDelay)
    } else {
      executeTypingAnimation()
    }

    return () => {
      if (timeout) window.clearTimeout(timeout)
    }
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    getRandomSpeed
  ])

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < (usingSplit ? fullText.length : textArray[currentTextIndex].length) || isDeleting)

  const Comp: any = Component

  // If using splitLines, render each visual line and place a single cursor after the first line.
  if (usingSplit && splitLines) {
    const lineLengths = splitLines.map(s => s.length)
    const pieces: string[] = []
    let remaining = displayedText
    for (let i = 0; i < lineLengths.length; i++) {
      const len = lineLengths[i]
      const chunk = remaining.slice(0, len)
      pieces.push(chunk)
      remaining = remaining.slice(len)
    }
    if (remaining.length) {
      pieces[pieces.length - 1] = (pieces[pieces.length - 1] || '') + remaining
    }

    // Determine which line the cursor should appear on based on typed length
    const totals: number[] = []
    lineLengths.reduce((acc, len, i) => {
      const sum = acc + len
      totals[i] = sum
      return sum
    }, 0)
    const typedLen = displayedText.length
    let cursorLine = 0
    for (let i = 0; i < totals.length; i++) {
      if (typedLen <= totals[i]) {
        cursorLine = i
        break
      }
      if (i === totals.length - 1) cursorLine = totals.length - 1
    }

    return (
      <Comp ref={containerRef as any} className={`text-type ${className}`} {...props}>
        <div className="text-type__content-multi" style={{ color: getCurrentTextColor() || 'inherit' }}>
          {pieces.map((p, idx) => (
            <div key={idx} className={`text-type__line text-type__line--${idx}`}>
              <span className="text-type__line-content">{p}</span>
              {showCursor && idx === cursorLine && (
                <span
                  ref={cursorRef}
                  className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}>
                  {cursorCharacter}
                </span>
              )}
            </div>
          ))}
        </div>
      </Comp>
    )
  }

  return (
    <Comp ref={containerRef as any} className={`text-type ${className}`} {...props}>
      <span className="text-type__content" style={{ color: getCurrentTextColor() || 'inherit' }}>
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}>
          {cursorCharacter}
        </span>
      )}
    </Comp>
  )
}

export default TextType
