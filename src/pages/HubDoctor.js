import { useState } from "react";
import useFetch from "../hooks/useFetch";
import PatientList from "../components/PatientList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { data: patientList, isPending, error } = useFetch('http://localhost:5000/api/patients');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patientList?.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.pathologies.some(path => path.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="home">
      <h2>Recherche de patients</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {filteredPatients && <PatientList patients={filteredPatients} title="Liste des patients" />}
    </div>
  );
};

export default Home;
