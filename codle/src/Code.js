import AceEditor from "react-ace";
import { useState } from "react";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const Code = () => {    
    const [language, setLanguage] = useState('C++');

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
            <AceEditor
                mode="java"
                theme="github"
                className="code"
                // onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
            />
        </div>
     );
}
 
export default Code;