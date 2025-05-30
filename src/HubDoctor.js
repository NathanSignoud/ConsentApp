import PatientList from "./PatientList";
import useFetch from "./useFetch";

const Home = () => {

    const {data : patientList, isPending, error} = useFetch('http://localhost:5000/api/patients')
    
    return ( 
        <div className="home">
            {error && <div> {error} </div>}
            {isPending && <div>Loading...</div>}
            {patientList && <PatientList patients={patientList} title = "Patient List" />}
            </div>
     );
}

export default Home;