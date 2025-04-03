import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const languages = [
  { name: "React", logo: "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-bold-tal-revivo.png" },
  { name: "Flutter", logo: "https://img.icons8.com/ios-filled/50/flutter.png" },
  { name: "Google Cloud", logo: "https://img.icons8.com/ios-filled/50/google-cloud.png" },
  { name: "JavaScript", logo: "https://img.icons8.com/ios-filled/50/javascript.png" },
  { name: "Java", logo: "https://img.icons8.com/ios-filled/50/java-coffee-cup-logo.png" },
  { name: "Database", logo: "https://img.icons8.com/ios-filled/50/database.png" },
  { name: "Bootstrap", logo: "https://img.icons8.com/ios-filled/50/bootstrap.png" },
  { name: "HTML5", logo: "https://img.icons8.com/ios-filled/50/html-5.png" },
  { name: "Python", logo: "https://img.icons8.com/ios-filled/50/python.png" },
  { name: "Node.js", logo: "https://img.icons8.com/ios-filled/50/nodejs.png" },
  { name: "AWS", logo: "https://img.icons8.com/ios-filled/50/amazon-web-services.png" },
  { name: "Docker", logo: "https://img.icons8.com/ios-filled/50/docker.png" },
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
