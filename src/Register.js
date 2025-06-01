import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!res.ok) throw new Error('Erreur lors de l’enregistrement');

      setSuccess('Utilisateur créé avec succès.');
      setError('');
      setEmail('');
      setPassword('');
      setRole('Patient');
      history.push('/login')
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="create">
      <h2>Créer un compte utilisateur</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <label>Email :</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} required />

        <label>Mot de passe :</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        <label>Rôle :</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Administrator">Administrator</option>
        </select>

        <button type="submit">Créer</button>
      </form>
      <Link to='/login'>Login</Link>
    </div>
  );
};

export default Register;
