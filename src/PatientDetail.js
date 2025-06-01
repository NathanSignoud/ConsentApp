import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import PdfViewer from "./PdfViewer";

const PatientDetail = () => {
  const { id } = useParams(); // id dans l'URL
  console.log("ID reçu :", id);
  const [patient, setPatient] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:5000/api/patients/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("Patient not found");
        }
        return res.json();
      })
      .then((data) => {
        setPatient(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/patients/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur lors de la suppression');
        }
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
        alert('Suppression impossible');
      });
  };

  return (
    <div className="patient-details">
      {isPending && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
          {patient.pdfs && patient.pdfs.length > 0 && (
            <>
              <p>PDFs :</p>
              <p>Documents PDF :</p>
                <ul>
                  {patient.pdfs && patient.pdfs.map((pdf) => (
                    <li key={pdf._id}>
                      <Link to={`/patient/${id}/pdf/${pdf._id}`}>
                        {pdf.filename}
                      </Link>
                    </li>
                  ))}
                </ul>
            </>
          )}
          <button onClick={handleDelete}>Delete Patient</button>
        </article>
      )}
    </div>
  );
};

export default PatientDetail;
