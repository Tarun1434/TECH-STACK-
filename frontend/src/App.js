import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Cards from "./component/Cards";
import QuestionCard from "./component/questions/QuestionCard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/languages" element={<Cards />} />
                <Route path="/questions/:language" element={<QuestionCard />} />
            </Routes>
        </Router>
    );
}

export default App;
