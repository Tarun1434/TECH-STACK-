import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const categories = ['HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'React', 'Node.js'];

    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>Tech Stack</h3>
                <div className="footer-links">
                    <h4>Question Categories</h4>
                    <ul>
                        {categories.map((category) => (
                            <li key={category}>
                                <Link to={`/questions/${category}`}>{category} Questions</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <p>&copy; 2025 Tech Stack. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;