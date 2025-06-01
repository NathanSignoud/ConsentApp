import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = () => {
  const { id, pdfId } = useParams();
  console.log('Patient ID:', id, 'PDF ID:', pdfId);
  const [summary, setSummary] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [filename, setFilename] = useState(null);

  
    useEffect(() => {
    fetch(`http://localhost:5000/api/patients/${id}`)
      .then(res => {
        if (!res.ok) throw Error('Patient not found');
        return res.json();
      })
      .then(data => {
        const pdf = data.pdfs.find(p => p._id === pdfId);
        if (!pdf) throw Error('PDF not found');
        console.log(pdf.path)
        setPdfUrl(`http://localhost:5000/uploads/${pdf.path}`);
      })
      .catch(err => setError(err.message));
  }, [id, pdfId]);

  const handleSummary = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/summarize/${id}/${pdfId}`);
    if (!res.ok) throw Error("Erreur lors du résumé");
    const data = await res.json();
    setSummary(data.summary);
  } catch (err) {
    setSummary("Erreur lors du résumé.");
  }
};

  return (
    <div className="pdf-viewer">
      <h2>Visualisation du PDF</h2>
       <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {pdfUrl && (
            <div className="pdf-preview">
            <Document file={pdfUrl} onLoadError={(err) => setError(err.message)}>
                <Page pageNumber={1} scale={0.8} />
            </Document>
            </div>
        )}
        </div>

      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
        Voir le PDF complet
      </a>

      <button onClick={handleSummary}>Générer un résumé</button>
      <div className="summary-box">
        {summary ? summary : "Aucun résumé généré pour l’instant."}
      </div>
    </div>
  );
};

export default PdfViewer;
