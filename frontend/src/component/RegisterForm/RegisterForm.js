import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function RegisterForm() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!userId.trim() || !username.trim()) {
      alert("Please enter both User ID and Username.");
      return;
    }

    try {
      console.log("Sending registration request:", { userId, username });
      const res = await fetch("http://localhost:5000/api/questions/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username }),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success) {
        alert("Registered successfully!");
        navigate("/home", { state: { userId } });
      } else {
        alert("Error: " + (data.message || "Registration failed."));
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error: Unable to connect to server.");
    }
  };

  return (
    <div className="registration_container">
      <h1 className="logo">
        Tech <span className="stack-name">Stack</span>
      </h1>
      <div className="registration_form">
        <h2>Register</h2>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          aria-label="User ID"
        />
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default RegisterForm;