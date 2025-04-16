import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './components/Home';
import Cards from './components/Cards';
import QuestionsPage from './components/Questions/QuestionsPage'; // Ensure correct casing
import SavedQuestions from './components/Questions/SavedQuestions';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import Account from './components/Account/Account';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/languages" element={<Cards />} />
                    <Route path="/questions/:language" element={<><QuestionsPage /><Footer /></>} />
                    <Route path="/saved" element={<SavedQuestions />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;