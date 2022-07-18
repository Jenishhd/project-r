import AceEditor from "react-ace";
import { useState } from "react";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect } from "react";
import Output from "./Output";

const Code = () => {    
    const [language, setLanguage] = useState('C++');
    const [ text, setText ] = useState('');

    useEffect(() => {
        setLanguage(window.localStorage.getItem('language'));
        updateText(language);
      }, []);

    useEffect(() => {
        window.localStorage.setItem('language', language);
        updateText();
    }, [language]);

    const updateText = () => {
        if (language === "C++") {
            setText("here is c++ code solution function")
        }
        else if (language === "Java") {            
            setText("class Solution {\n    public boolean makesquare(int[] matchsticks) {\n        \n    }\n}")
        }
        else {
            setText("not c++ or java")
        }
    }

    const run = () => {
        console.log("send post request with solution class to server, combine with rest main class and run trials");
        console.log(text);
    }
    
    const submit = () => {
    }

    const onChange = (text) => {
        setText(text);
    }

    return ( 
        // <div>
            <div className="code">
            <button onClick={run} type="button">Run Codle</button>
            <button onClick={submit} type="button">Submit Codle</button>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} >
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python 3">Python 3</option>
                <option value="Javascript">Javascript</option>
            </select>
                <AceEditor
                    mode="java"
                    theme="twilight"
                    className="code"
                    width="auto"
                    value={text}
                    onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true}}
                />
                <Output/>
            </div>
        // </div>
     );
}
 
export default Code;