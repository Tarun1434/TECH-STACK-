import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation ,useParams } from "react-router-dom";
import Home from "./component/Home";
import Cards from "./component/Cards";
import QuestionCard from "./component/questions/QuestionCard";
import SavedQuestions from "./component/questions/SavedQuestions";
import RegisterForm from "./component/RegisterForm/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/home" element={<HomeWrapper />} />
        <Route path="/languages" element={<Cards />} />
        <Route path="/questions/:language" element={<QuestionCardWrapper />} />
        <Route path="/saved/:userId" element={<SavedQuestionsWrapper />} />
      </Routes>
    </Router>
  );
}

const HomeWrapper = () => {
  const location = useLocation();
  const userId = location.state?.userId || "demoUser123";
  return <Home userId={userId} />;
};

const QuestionCardWrapper = () => {
  const location = useLocation();
  const userId = location.state?.userId || "demoUser123";
  return <QuestionCard userId={userId} />;
};

const SavedQuestionsWrapper = () => {
  const { userId } = useParams();
  return <SavedQuestions userId={userId} />;
};

export default App;