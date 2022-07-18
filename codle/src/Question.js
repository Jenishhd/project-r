const Question = ({data}) => {
    return ( 
        <div className="question">
            <h2>Question</h2>
            <p>{data.info}</p>
            <h2>Test Case</h2>
            <h5>Input</h5>
            <code>{data.test_case.input}</code>
            <h5>Output</h5>
            <code>{data.test_case.output}</code>
            <h5>Explanation</h5>
            <code>{data.test_case.explanation}</code>
        </div>
     );
}
 
export default Question;
