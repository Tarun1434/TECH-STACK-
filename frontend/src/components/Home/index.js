import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';
import Cards from '../Cards';
import './index.css';

const words = [
    'Technical Interviews',
    'Coding Challenges',
    'Algorithm Mastery',
    'Problem Solving',
    'System Design',
];

const features = [
    'Practice real interview questions from top tech companies',
    'Master data structures and algorithms with guided practice',
    'Join a community of developers preparing for tech interviews',
];

const techIcons = [
    { title: 'React', src: 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-bold-tal-revivo.png' },
    { title: 'Flutter', src: 'https://img.icons8.com/ios-filled/50/flutter.png' },
    { title: 'Google Cloud', src: 'https://img.icons8.com/ios-filled/50/google-cloud.png' },
    { title: 'JavaScript', src: 'https://img.icons8.com/ios-filled/50/javascript.png' },
    { title: 'Java', src: 'https://img.icons8.com/ios-filled/50/java-coffee-cup-logo.png' },
    { title: 'Database', src: 'https://img.icons8.com/ios-filled/50/database.png' },
    { title: 'Bootstrap', src: 'https://img.icons8.com/ios-filled/50/bootstrap.png' },
    { title: 'HTML5', src: 'https://img.icons8.com/ios-filled/50/html-5.png' },
    { title: 'Python', src: 'https://img.icons8.com/ios-filled/50/python.png' },
    { title: 'Node.js', src: 'https://img.icons8.com/ios-filled/50/nodejs.png' },
    { title: 'AWS', src: 'https://img.icons8.com/ios-filled/50/amazon-web-services.png' },
    { title: 'Docker', src: 'https://img.icons8.com/ios-filled/50/docker.png' },
];

const Home = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingText, setTypingText] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const currentWord = words[wordIndex];
        let typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            setTypingText(currentWord.substring(0, charIndex + (isDeleting ? -1 : 1)));
            setCharIndex((prev) => prev + (isDeleting ? -1 : 1));

            if (!isDeleting && charIndex === currentWord.length) {
                setIsDeleting(true);
                typingSpeed = 1000;
            }
            if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex]);

    const handleStartPracticing = () => {
        setShowCards(true);
    };

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            logout();
            navigate('/login');
        }
    };

    const menuItems = [
        { text: 'Home', icon: '🏠', link: '/home' },
        { text: 'Questions', icon: '❓', link: '/questions/JavaScript' },
        { text: user ? `${user.username}'s Account` : 'Account', icon: '👤', link: '/account' },
        { text: 'About', icon: 'ℹ️', link: '/about' },
        { text: 'Contact', icon: '📧', link: '/contact' },
        { text: 'Logout', icon: '🚪', link: '#', onClick: handleLogout },
    ];

    return (
        <div className="home-page-background">
            <div className="nav">
                <h1 className="logo">
                    Tech <span className="stack-name">Stack</span>
                </h1>
                <div className="nav-controls">
                    <div
                        className={`hamburger ${isSidebarOpen ? 'open' : ''}`}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h2>Menu</h2>
                </div>
                <div className="menu-items">
                    {menuItems.map(({ text, icon, link, onClick }) => (
                        <a
                            key={text}
                            href={link}
                            onClick={(e) => {
                                if (onClick) {
                                    e.preventDefault();
                                    onClick();
                                }
                                setIsSidebarOpen(false);
                            }}
                        >
                            <span className="menu-icon">{icon}</span>
                            <span className="menu-text">{text}</span>
                        </a>
                    ))}
                </div>
                <div className="sidebar-footer">
                    <p>© 2025 Tech Stack</p>
                </div>
            </div>

            <div className="main-container">
                {showCards ? (
                    <Cards />
                ) : (
                    <>
                        <div className="hero-section">
                            <h2 className="welcome-board">Ace Your Tech Career With</h2>
                            <div className="typing-container">
                                <span className="letter-effect">{typingText}</span>
                            </div>
                            <h2 className="short-line">Master the skills that matter - Practice makes perfect</h2>
                        </div>

                        <div className="features-list">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <span className="feature-icon">
                                        <FaCheckCircle color="#96ff00" />
                                    </span>
                                    <p>{feature}</p>
                                </div>
                            ))}
                        </div>

                        <div className="button-exploring">
                            <button className="animated-button" onClick={handleStartPracticing}>
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
                                {techIcons.map(({ title, src }) => (
                                    <div key={title} className="icon-wrapper" title={title}>
                                        <img width="50" height="50" src={src} alt={title} className="white-logo" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
