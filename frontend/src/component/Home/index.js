"use client"

import { useState, useEffect } from "react"
import { FaCheckCircle } from "react-icons/fa"
import "./index.css"

// Changed to tech question related words
const words = ["Technical Interviews", "Coding Challenges", "Algorithm Mastery", "Problem Solving", "System Design"]

const Home = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let typingSpeed = isDeleting ? 50 : 100

    const timeout = setTimeout(() => {
      setTypingText(currentWord.substring(0, charIndex + (isDeleting ? -1 : 1)))
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1))

      if (!isDeleting && charIndex === currentWord.length) {
        setIsDeleting(true)
        typingSpeed = 1000
      }
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".sidebar")
      const hamburger = document.querySelector(".hamburger")

      if (
        isSidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        hamburger &&
        !hamburger.contains(event.target)
      ) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])

  return (
    <div className="home-page-background">
      <div className="nav">
        <h1 className="logo">
          Tech <span className="stack-name">Stack</span>
        </h1>
        <div className={`hamburger ${isSidebarOpen ? "open" : ""}`} onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar with improved styling */}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <div className="menu-items">
          <a href="https://flames.ccbp.tech/" onClick={toggleSidebar}>
            <span className="menu-icon">🏠</span>
            <span className="menu-text">Home</span>
          </a>
          <a href="https://flames.ccbp.tech/" onClick={toggleSidebar}>
            <span className="menu-icon">📚</span>
            <span className="menu-text">Learning Paths</span>
          </a>
          <a href="https://flames.ccbp.tech/" onClick={toggleSidebar}>
            <span className="menu-icon">🧩</span>
            <span className="menu-text">Practice</span>
          </a>
          <a href="https://flames.ccbp.tech/" onClick={toggleSidebar}>
            <span className="menu-icon">🏆</span>
            <span className="menu-text">Challenges</span>
          </a>
        </div>
        <div className="sidebar-footer">
          <p>© 2025 Tech Stack</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-container">
        <div className="hero-section">
          <h2 className="welcome-board">Ace Your Tech Career With</h2>
          <div className="typing-container">
            <span className="letter-effect">{typingText}</span>
          </div>
          <h2 className="short-line">Master the skills that matter - Practice makes perfect</h2>
        </div>

        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">
              <FaCheckCircle color="#96ff00" />
            </span>
            <p>"Practice real interview questions from top tech companies"</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">
              <FaCheckCircle color="#96ff00" />
            </span>
            <p>"Master data structures and algorithms with guided practice"</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">
              <FaCheckCircle color="#96ff00" />
            </span>
            <p>"Join a community of developers preparing for tech interviews"</p>
          </div>
        </div>

        <div className="button-exploring">
          <button className="animated-button">
            <svg viewBox="0 0 24 24" className="arr-2">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            <span className="text">Start Practicing</span>
            <span className="circle"></span>
            <svg viewBox="0 0 24 24" className="arr-1">
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        </div>

        <div className="tech-icons-container">
          <div className="tech-icons">
            {/* React */}
            <div className="icon-wrapper" title="React">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-bold-tal-revivo.png"
                alt="React"
                className="white-logo"
              />
            </div>

            {/* Flutter */}
            <div className="icon-wrapper" title="Flutter">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/flutter.png"
                alt="Flutter"
                className="white-logo"
              />
            </div>

            {/* Google Cloud */}
            <div className="icon-wrapper" title="Google Cloud">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/google-cloud.png"
                alt="Google Cloud"
                className="white-logo"
              />
            </div>

            {/* JavaScript */}
            <div className="icon-wrapper" title="JavaScript">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/javascript.png"
                alt="JavaScript"
                className="white-logo"
              />
            </div>

            {/* Java */}
            <div className="icon-wrapper" title="Java">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/java-coffee-cup-logo.png"
                alt="Java"
                className="white-logo"
              />
            </div>

            {/* Database */}
            <div className="icon-wrapper" title="Database">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/database.png"
                alt="Database"
                className="white-logo"
              />
            </div>

            {/* Bootstrap */}
            <div className="icon-wrapper" title="Bootstrap">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/bootstrap.png"
                alt="Bootstrap"
                className="white-logo"
              />
            </div>

            {/* HTML5 */}
            <div className="icon-wrapper" title="HTML5">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/html-5.png"
                alt="HTML5"
                className="white-logo"
              />
            </div>

            {/* Python */}
            <div className="icon-wrapper" title="Python">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/python.png"
                alt="Python"
                className="white-logo"
              />
            </div>

            {/* Node.js */}
            <div className="icon-wrapper" title="Node.js">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/nodejs.png"
                alt="Node.js"
                className="white-logo"
              />
            </div>

            {/* AWS */}
            <div className="icon-wrapper" title="AWS">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/amazon-web-services.png"
                alt="AWS"
                className="white-logo"
              />
            </div>

            {/* Docker */}
            <div className="icon-wrapper" title="Docker">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/docker.png"
                alt="Docker"
                className="white-logo"
              />
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default Home
