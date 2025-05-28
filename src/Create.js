import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Create = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [pathologies, setPathologies] = useState(['']);
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handlePathologyChange = (index, value) => {
    const newPathologies = [...pathologies];
    newPathologies[index] = value;
    setPathologies(newPathologies);
  };

  const addPathologyField = () => {
    setPathologies([...pathologies, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPatient = {
      name, 
      age,  
      pathologies: pathologies.filter(p => p.trim() !== '')
    }
    setIsPending(true);

    fetch('http://localhost:8000/PatientList', {
      method: 'POST',
      headers: { "Content-type": "application/json"},
      body: JSON.stringify(newPatient)
    }).then(() => {
      console.log('New Patient Added')
      setIsPending(false);
      history.push('/')
    })
  }

    return ( 
      <div className="create">
        <h2>Add a Patient</h2>
        <form onSubmit={handleSubmit}>
          <label> Patient Name : </label>
          <input 
            type="text" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            />
          <label> Patient Age : </label>
          <input 
            type="number" 
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            />
          <label>Pathologies:</label>
            {pathologies.map((pathology, index) => (
              <input 
                key={index} 
                type="text" 
                value={pathology} 
                onChange={(e) => handlePathologyChange(index, e.target.value)} 
                placeholder={`Pathologie ${index + 1}`}/>
      ))}
      <button type="button" onClick={addPathologyField}>
        Ajouter une pathologie
      </button>
      {!isPending && <button>Submit Patient</button>}
      { isPending && <button disabled>Loading...</button>}
        </form>
      </div>  
    );
}
 
export default Create;