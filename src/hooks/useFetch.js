import { useEffect, useState } from "react";

const useFetch = (url) => {

    const[data , setData] = useState(null);
    const[isPending, setIsPending] = useState(true)
    const[error, setError] = useState(null)

    useEffect(() => {

        const abortCont = new AbortController();

        fetch(url, { signal : abortCont.signal})
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch the data from that ressource');
                }
                return res.json()
            })
            .then(data => {
                setError(null)
                setData(data)
                setIsPending(false)
            })
            .catch(err => { 
                if(err.name === 'AbortError'){
                    console.log('fetch Aborted')
                }
                else{
                    setIsPending(false)
                    setError(err.message)
                }
            })
            return () => abortCont.abort();
    }, [url]);
    return {data, isPending, error};
}



export default useFetch