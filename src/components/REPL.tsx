import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import mockedJson from "../modules/mockedJson";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  // Add some kind of shared state that holds all the commands submitted.
  //const submittedCommands: string[] = [];
  const [submittedCommands, setSubmittedCommands] = useState<JSX.Element[]>([]);
  const [submittedInputs, setSubmittedInputs] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("Brief");
  const file1 = mockedJson().file1;

  function addCommand(str: string) {
    const newCommand = parseCommandLine(str);
    setSubmittedInputs([...submittedInputs, str]);
    setSubmittedCommands([...submittedCommands, newCommand]);
  }

  const parseCommandLine = (str: string) => {
    const newCommands: JSX.Element[] = [];
    if (str.includes("load_file")) {
      const body: string[] = [];
      file1.data.body.forEach((stringArr: string[]) => {
        let tempStr = "";
        stringArr.forEach((str: string) => {
          tempStr += str + ", ";
        });
        body.push(tempStr.substring(0, tempStr.length - 2));
        tempStr = "";
      });

      body.forEach((str: string) => {
        newCommands.push(<div>{str}</div>);
      });
    }

    return <div>{newCommands}</div>;
  };

  function handleMode() {
    if (mode === "Brief") {
      setMode("Verbose");
    } else {
      setMode("Brief");
    }
  }

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* Update your REPLHistory and REPLInput to take in new shared state as props */}
      <div className="mode">
        Mode:
        <button className="mode" onClick={handleMode}>
          {mode}
        </button>
      </div>
      <REPLHistory
        mode={mode}
        submittedCommands={submittedCommands}
        submittedInputs={submittedInputs}
      />
      <hr></hr>
      <REPLInput addCommand={addCommand} />
    </div>
  );
}
