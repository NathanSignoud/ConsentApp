import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Login = ({ setLogged, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      const user = await response.json();
      console.log('Connexion réussie pour :', user.email, user.role);

      setLogged(true);
      setCurrentUser(user);
      history.push('/');
    } catch (err) {
      console.error(err.message);
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <div className="create">
          <h2>Connexion</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <label>Email :</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Se connecter</button>
        </div>
      </form>
      <Link to='/register'>Register</Link>
    </div>
  );
};

export default Login;
