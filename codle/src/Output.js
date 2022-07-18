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
            writing: false,
            history: 0
        }
    }

    promisedSetState = (newState) => new Promise(resolve => this.setState(newState, resolve));
    
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
          cursorBlink: true,
        });

        // Load Fit Addon
        term.loadAddon(fitAddon);

        // Open the terminal in #terminal-container
        term.open(document.getElementById("xterm"));

        // Make the terminal's size and geometry fit the size of #terminal-container
        fitAddon.fit();

        const ignoreKeyCodes = new Set([37, 39, 9, 17, 91, 18, 93, 46]);

        const termHistory = [];

        term.onKey(async key => {
          if (!this.state.writing) {
            const char = key.domEvent.key;
            const keyCode = key.domEvent.keyCode;
            
            if (keyCode === 13) {
                var currentInput = this.state.input.replace(/\s/g, "");
                if (currentInput === "help") {
                  term.write("\r\n")
                  this.write("  Pass the CODLE in six submissions.\r\n  Compile errors do not count as submissions. Hit Run Codle or enter run codle in the terminal.\r\n  After each submission, the color of the tiles in the terminal change to show if you passed the testcase, or ran out of time/space.\r\n  ---------------------------------------------\r\n  Examples\r\n  🟩 🟩 🟨 ⬜ ⬜ \r\n  🟩 🟩 🟩 🟩 🟩\r\n  ---------------------------------------------\r\n  A new CODLE will be available each day!\r\n");
                  termHistory.push(this.state.input);
                }
                else if (currentInput === "codle") {
                  term.write("\r\n")
                  this.write("   🟩🟩🟩🟩🟩🟩    🟩🟩🟩🟩🟩🟩    🟨🟨🟨🟨🟨🟨    ⬜⬜        ⬜⬜⬜⬜⬜⬜⬜\r\n  🟩🟩        🟩🟩    🟩🟩   🟨🟨   🟨🟨   ⬜⬜        ⬜⬜\r\n  🟩🟩        🟩🟩    🟩🟩   🟨🟨   🟨🟨   ⬜⬜        ⬜⬜⬜⬜⬜\r\n  🟩🟩        🟩🟩    🟩🟩   🟨🟨   🟨🟨   ⬜⬜        ⬜⬜\r\n   🟩🟩🟩🟩🟩🟩    🟩🟩🟩🟩🟩🟩    🟨🟨🟨🟨🟨🟨    ⬜⬜⬜⬜⬜⬜⬜   ⬜⬜⬜⬜⬜⬜⬜\r\n");
                  termHistory.push(this.state.input);
                }
                else if (currentInput === "runcodle") {
                  term.write("\r\n");
                  this.write("  Running codle...\r\n  std out:\r\n  code output\r\n");
                  termHistory.push(this.state.input);
                }
                else if (currentInput === "submitcodle") {
                  term.write("\r\n");
                  this.write("  Submitting codle 1 of 6...\r\n  🟩 🟩 🟨 ⬜ ⬜\r\n");
                  termHistory.push(this.state.input);
                }
                else {
                  if (currentInput.length > 0) {
                    term.write("\r\n");
                    this.write("  command not found: " + this.state.input + "\r\n");
                    termHistory.push(this.state.input);
                  }
                  else {
                    this.prompt();
                  }
                }
                this.setState({history: 0})
                this.setState({input: ""});
            } else if (keyCode === 8) {
                if (term._core.buffer.x > 2) {
                  term.write("\b \b");
                  this.setState({input: this.state.input.slice(0, -1)}
                  );
                }
            } else if (keyCode === 38) {
                term.write("\x9B2K\x9B" + this.state.input.length + 2 + "D$ ");
                await this.promisedSetState({history: Math.min(this.state.history + 1, termHistory.length)});
                await this.promisedSetState({input: termHistory[termHistory.length - this.state.history]});
                term.write(this.state.input);
            } else if (keyCode === 40) {
                term.write("\x9B2K\x9B" + this.state.input.length + 2 + "D$ ");
                await this.promisedSetState({history: Math.max(this.state.history - 1, 0)});
                if (this.state.history > 0) {
                  await this.promisedSetState({input: termHistory[termHistory.length - this.state.history]});
                }
                else {
                  await this.promisedSetState({input: ""});
                }
                term.write(this.state.input);
            } else if (!ignoreKeyCodes.has(keyCode)) {
                this.setState({input: this.state.input + char});
                term.write(char);
            }
          }
        });

        this.prompt();

    }

    prompt = () => {
        term.write("\r\n$ ");
    };

    render() {
        return (
            <div className="term" style={{ background: "" }}>
                <div id="xterm" style={{ height: "30vh", width: "auto"  }} />
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
