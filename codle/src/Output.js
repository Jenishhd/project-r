import React from 'react'
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import ResizeObserver from "react-resize-observer";
import "./xterm.css";

let term;
const fitAddon = new FitAddon();

class Output extends React.Component {
    constructor(props) {
        super(props)
        // Create a ref
        this.xtermRef = React.createRef()
        
        this.state = {
            input: "",
            writing: false
        }
    }

    delay = (milliseconds) => {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    async write(input) {
      this.setState({writing: true});
      for (var i = 0; i < input.length; i++) {
        term.write(input.charAt(i));
        await this.delay(2);
      }
      this.prompt();
      this.setState({writing: false});
    }

    componentDidMount() {
        term = new Terminal({
          convertEol: true,
          fontFamily: `'Fira Mono', monospace`,
          fontSize: 15,
          fontWeight: 900,
          cursorBlink: true
        });

        // Load Fit Addon
        term.loadAddon(fitAddon);

        // Open the terminal in #terminal-container
        term.open(document.getElementById("xterm"));

        // Make the terminal's size and geometry fit the size of #terminal-container
        fitAddon.fit();

        const ignoreKeyCodes = new Set([37, 38, 39, 40, 9, 17, 91, 18, 93, 46]);

        term.onKey(key => {
          if (!this.state.writing) {
            const char = key.domEvent.key;
            const keyCode = key.domEvent.keyCode;
            
            if (keyCode === 13) {
                if (this.state.input === "help") {
                  term.write("\r\n")
                  this.write("  Pass the CODLE in six submissions.\r\n  Compile errors do not count as submissions. Hit Run Codle or enter run codle in the terminal.\r\n  After each submission, the color of the tiles in the terminal change to show if you passed the testcase, or ran out of time/space.\r\n  ########################################\r\n  Examples\r\n  🟩 🟩 🟨 ⬜ ⬜ \r\n  🟩 🟩 🟩 🟩 🟩\r\n  ########################################\r\n  A new CODLE will be available each day!\r\n");
                }
                else if (this.state.input === "codle") {
                  term.write("\r\n")
                  this.write("   🟩🟩🟩🟩🟩🟩    🟩🟩🟩🟩🟩🟩    🟨🟨🟨🟨🟨🟨    ⬜⬜        ⬜⬜⬜⬜⬜⬜⬜\r\n  🟩🟩        🟩🟩    🟩🟩   🟨🟨   🟨🟨   ⬜⬜        ⬜⬜\r\n  🟩🟩        🟩🟩    🟩🟩   🟨🟨   🟨🟨   ⬜⬜        ⬜⬜⬜⬜⬜\r\n  🟩🟩        🟩🟩    🟩🟩   🟨🟨   🟨🟨   ⬜⬜        ⬜⬜\r\n   🟩🟩🟩🟩🟩🟩    🟩🟩🟩🟩🟩🟩    🟨🟨🟨🟨🟨🟨    ⬜⬜⬜⬜⬜⬜⬜   ⬜⬜⬜⬜⬜⬜⬜\r\n");
                }
                else if (this.state.input === "run codle") {
                  term.write("\r\n");
                  this.write("  Running submission 1 of 6...");
                  this.write("\r\n  🟩 🟩 🟨 ⬜ ⬜\r\n")
                }
                else {
                  this.prompt();
                }
                this.setState({input: ""});
            } else if (keyCode === 8) {
                if (term._core.buffer.x > 2) {
                  term.write("\b \b");
                  this.setState({input: this.state.input.slice(0, -1)}
                  );
                }
            } else if (!ignoreKeyCodes.has(keyCode)) {
                this.setState({input: this.state.input + char});
                term.write(char);
            }
          }
        });

        this.prompt();

    }

    prompt = () => {
        var shellprompt = "$ ";
        term.write("\r\n" + shellprompt);
    };

    render() {
        return (
            <div className="term" style={{ background: "" }}>
                <div id="xterm" style={{ height: "30vh", width: "100%" }} />
                <ResizeObserver
                  onResize={rect => {
                    fitAddon.fit();
                  }}
                />
            </div>
          );
    }
}

export default Output
