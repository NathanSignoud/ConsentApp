import { Link } from "react-router-dom/cjs/react-router-dom";

const PatientList = ({patients, title, handleDelete}) => {
    
    return ( 
        <div className="patient-list">
            <h2>{ title }</h2>
            {patients.map(patient => (
                <div className="list" key={patient.id}>
                    <Link to={`/patient/${patient._id}`}>
                        <h2>{patient.name} ({patient.age} years old)</h2>
                    </Link>
                    <p>Pathologies :</p>
                    <ul>
                        {patient.pathologies.map((pathology, index) => (
                            <li key={index}>{pathology}</li>
                        ))}
                    </ul>
                </div>
            ))}
            
        </div>
    );
}
 
export default PatientList;