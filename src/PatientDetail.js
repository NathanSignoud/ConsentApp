import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";

const PatientDetail = () => {
    
    const { id } = useParams();
    const { data: patient, error, isPending} = useFetch('http://localhost:8000/PatientList/' + id)
    const history = useHistory();

    const handleDelete= () => {
        fetch('http://localhost:8000/PatientList/'+ patient.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return ( 
        <div className="patient-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {patient && (
                <article>
                    <h2>{patient.name}</h2>
                    <p>{patient.age} years old</p>
                    <p>Pathologies :</p>
                    <ul>
                        {patient.pathologies.map((pathology, index) => (
                            <li key={index}>{pathology}</li>
                        ))}
                    </ul>

                    <button onClick={handleDelete}>Delete Patient </button>
                </article>
            )}
        </div>
     );
}
 
export default PatientDetail;