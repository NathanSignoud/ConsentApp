import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Create = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [pathologies, setPathologies] = useState(['']);
  const [isPending, setIsPending] = useState(false);
  const [pdfFiles, setPdfFiles] = useState([]);
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
    setIsPending(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('pathologies', JSON.stringify(pathologies));
    pdfFiles.forEach(file => formData.append('pdfs', file));

    fetch('/api/patients', {
      method: 'POST',
      body: formData,
      }).then(() => {
        console.log('New Patient Added')
        setIsPending(false);
        history.push('/')
    }).catch((err) => {
      console.log('Error incountered');
      setIsPending(false);
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
      <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={(e) => setPdfFiles([...e.target.files])}
      />
      {!isPending && <button>Submit Patient</button>}
      { isPending && <button disabled>Loading...</button>}
        </form>
      </div>  
    );
}
 
export default Create;