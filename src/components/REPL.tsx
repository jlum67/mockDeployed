import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import mockedJson from "../modules/mockedJson";
import { searchCSV, SearchProps } from "./SearchCSV";
import { loadCSV, LoadProps } from "./LoadCSV";
import { viewCSV, ViewProps } from "./viewCSV";



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
  //const [submittedInputs, setSubmittedInputs] = useState<string[]>([]);
  const [fileLoaded, setFileLoaded] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<{
    data: {
      headers: string[];
      body: string[][];
    };
  }>({ data: { headers: [], body: [] } });
  const [submittedInputs, setSubmittedInputs] = useState<
    {
      input: string;
      output: JSX.Element;
    }[]
  >([]);
  const [mode, setMode] = useState<string>("Brief");

  function addCommand(str: string) {
    const newCommand = parseCommandLine(str);
    //setSubmittedInputs([...submittedInputs, str]);
    setSubmittedInputs([
      ...submittedInputs,
      { input: str, output: newCommand },
    ]);
    setSubmittedCommands([...submittedCommands, newCommand]);
  }

  const parseCommandLine = (str: string) => {
    const newCommands: JSX.Element[] = []; //list of type JSX.Element
    const splitInput = str.split(" ");
    const inputLength = splitInput.length;
    const usage = splitInput[0];

    if (usage === "view") {
      if (inputLength > 1) {
        newCommands.push(<div>Improper arguments used.</div>);
      } else if (!fileLoaded) {
        newCommands.push(<div>No file loaded.</div>);
      } else {
        const props: ViewProps = {
          currentFile: currentFile
        };
        newCommands.push(
          viewCSV(props)
        );
      }
    } else if (usage === "search") {
      if (inputLength > 3 || inputLength == 1) {
        newCommands.push(<div>Improper arguments used.</div>);
      } else if (!fileLoaded) {
        newCommands.push(<div>No file loaded.</div>);
      } else {
        const props: SearchProps = {
          splitInput: splitInput,
          inputLength: inputLength,
        };
        newCommands.push(searchCSV(props));
      }
    } else if (usage == "load_file") {
      const props: LoadProps = {
        fileName: splitInput[1],
        setCurrentFile: setCurrentFile,
        setFileLoaded: setFileLoaded,
      };
      newCommands.push(loadCSV(props));
    } else {
      newCommands.push(<div>Unknown command was inputted.</div>);
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
      <div className="mode" aria-label="Mode-Header">
        Mode:
        <button className="mode" onClick={handleMode} aria-label="Mode">
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
