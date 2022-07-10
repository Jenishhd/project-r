import AceEditor from "react-ace";
import { useState } from "react";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useEffect } from "react";
import Output from "./Output";

const Code = () => {    
    const [language, setLanguage] = useState('C++');

    useEffect(() => {
        setLanguage(window.localStorage.getItem('language'));
        console.log(window.localStorage.getItem('language'));
      }, []);

    useEffect(() => {
        window.localStorage.setItem('language', language);
    }, [language]);

    return ( 
        // <div className="code">
        //     <code>this is where the code goes</code>
        // </div>
        <div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} >
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python 3">Python 3</option>
                <option value="Javascript">Javascript</option>
            </select>
            <div className="code">
                <AceEditor
                    mode="java"
                    theme="github"
                    className="code"
                    // onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />
                <Output/>
            </div>
        </div>
     );
}
 
export default Code;