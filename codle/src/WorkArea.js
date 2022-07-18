import Code from "./Code"
import Loading from "./Loading"
import Question from "./Question"
import FetchQuestion from "./FetchQuestion"
import ResizePanel from "react-resize-panel";

const WorkArea = () => {

    // const [active, setActive] = useState(0);
    const {question, isLoading, error} = FetchQuestion('https://project-r-70a76-default-rtdb.firebaseio.com/questions/7-8-22.json');

    // const showQuestion = () => {
    //     setActive(0);
    // }

    // const showCode = () => {
    //     setActive(1);
    // }

    // const showOutput = () => {
    //     setActive(2);
    // }

    // const runCode = () => {
    //     setActive(2);
    // }
    

    return ( 
        <div>
            {/* <div className="changingInfo"> */}
            { error && <div>{error}</div> }
            { isLoading && <Loading/> }
            {/* { active === 0 && !error && !isLoading && <Question data={question}/> }
            { active === 1 && !error && !isLoading && <Code/> }
            { active === 2 && !error && !isLoading && <Output/> } */}
            {/* </div> */}
            {/* <div className="buttons"> */}
                {/* <button onClick={showQuestion}>Question</button>
                <button onClick={showCode}>Code</button>
                <button onClick={showOutput}>Output</button>
                <button onClick={runCode}>Run Code</button> */}
            {/* </div> */}
            <div className="column">
                {!error && !isLoading && 
            <ResizePanel direction="e">
                 <Question data={question} className="left"/> 
            </ResizePanel> }
                { !error && !isLoading && <Code className="right"/> }
            </div>
        </div>
     );
}
 
export default WorkArea;