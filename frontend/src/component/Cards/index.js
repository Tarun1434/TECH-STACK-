import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const languages = [
  { name: "HTML5", logo: "https://img.icons8.com/ios-filled/50/html-5.png" }, // HTML first
  { name: "CSS", logo: "https://img.icons8.com/ios-filled/50/css3.png" }, // CSS (new logo)
  { name: "JavaScript", logo: "https://img.icons8.com/ios-filled/50/javascript.png" }, // JS
  { name: "React", logo: "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-bold-tal-revivo.png" }, // React
  { name: "Python", logo: "https://img.icons8.com/ios-filled/50/python.png" }, // Python
  { name: "Database", logo: "https://img.icons8.com/ios-filled/50/database.png" }, // Database (removed duplicate)
  { name: "Java", logo: "https://img.icons8.com/ios-filled/50/java-coffee-cup-logo.png" }, // Java
  { name: "C++", logo: "https://img.icons8.com/ios-filled/50/c-plus-plus-logo.png" }, // C++ (new)
  { name: "Flutter", logo: "https://img.icons8.com/ios-filled/50/flutter.png" }, // Flutter
  { name: "Google Cloud", logo: "https://img.icons8.com/ios-filled/50/google-cloud.png" }, // Google Cloud
  { name: "Node.js", logo: "https://img.icons8.com/ios-filled/50/nodejs.png" }, // Node.js
  { name: "AWS", logo: "https://img.icons8.com/ios-filled/50/amazon-web-services.png" }, // AWS
  { name: "Docker", logo: "https://img.icons8.com/ios-filled/50/docker.png" }, // Docker
  { name: "Bootstrap", logo: "https://img.icons8.com/ios-filled/50/bootstrap.png" }, // Bootstrap
];

const Card = ({ logo, name, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(name)}>
      <div className="logo-wrapper">
        <img src={logo} className="white-logo" alt={`${name} logo`} />
        <h3 className="logo-name">{name}</h3>
      </div>
    </div>
  );
};

const Cards = () => {
  const navigate = useNavigate();

  const handleCardClick = (language) => {
    navigate(`/questions/${language}`); // Navigate to question page
  };

  return (
    <div>
      <div className="cards-container">
        {languages.map((lang, index) => (
          <Card key={index} name={lang.name} logo={lang.logo} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
