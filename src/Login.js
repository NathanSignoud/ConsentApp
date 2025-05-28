import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ setLogged }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:8000/Users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setLogged(true);
      history.push('/');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Email :</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Mot de passe :</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Se connecter</button>
    </form>
  );
};

export default Login;
