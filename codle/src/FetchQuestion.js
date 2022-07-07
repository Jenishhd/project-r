import { useState, useEffect } from "react"

const FetchQuestion = (url) => {
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setQuestion("here is the question & here is the " + url);
        setIsLoading(false);
    //     const abortCont = new AbortController();

    //     fetch(url, {signal: abortCont.signal})
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw Error('could not fetch the data for that resource')
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             setError(null);
    //             setQuestion(data);
    //             setIsLoading(false);
    //         })
    //         .catch(err => {
    //             if (err.name === 'AbortError') {
    //                 console.log('fetch aborted');
    //             }
    //             else {
    //                 setIsLoading(false);
    //                 setError(err.message);
    //             }
    //         });

    //     return () => abortCont.abort();

    }, [url]);

    return {question, isLoading, error}
}
 
export default FetchQuestion;