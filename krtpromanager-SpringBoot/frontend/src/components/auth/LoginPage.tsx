import React, { useState } from "react";
import UsersService from "../service/UserService";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await UsersService.login(username, password);
      console.log("Login successful:", response);
      setSuccess("Login successful");
      setError(null);
      localStorage.setItem("token", response.token); // Assuming the response contains a token
    } catch (err) {
      setError("Login failed");
      console.error(err);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};
