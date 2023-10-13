import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { searchCSV, SearchProps } from "./search/SearchCSV";
import { loadCSV, LoadProps } from "./load/LoadCSV";
import { viewCSV, ViewProps } from "./view/ViewCSV";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  // Add some kind of shared state that holds all the commands submitted.
  const [submittedCommands, setSubmittedCommands] = useState<JSX.Element[]>([]);
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
  const [fileName, setFileName] = useState("")

  /**
   * Pushes a new command to the REPL history
   * @param str - the command to be pushed
   */
  function addCommand(str: string) {
    const newCommand = parseCommandLine(str);
    //setSubmittedInputs([...submittedInputs, str]);
    setSubmittedInputs([
      ...submittedInputs,
      { input: str, output: newCommand },
    ]);
    setSubmittedCommands([...submittedCommands, newCommand]);
  }

  /**
   * Parses the inputted command line
   * @param str - the inputted command
   * @returns - a div with the output of the command to be pass
   */
  const parseCommandLine = (str: string) => {
    const newCommands: JSX.Element[] = []; //list of type JSX.Element
    const splitInput = str.split(" ");
    const inputLength = splitInput.length;
    const usage = splitInput[0];

    if (usage === "view") {
      // handles calls to view csv
      if (inputLength > 1) {
        newCommands.push(<div>Improper arguments used.</div>);
      } else if (!fileLoaded) {
        newCommands.push(<div>No file loaded.</div>);
      } else {
        const props: ViewProps = {
          currentFile: currentFile,
        };
        newCommands.push(viewCSV(props));
      }
    } else if (usage === "search") {
      // handles calls to search csv
      if (inputLength > 3 || inputLength == 1) {
        newCommands.push(<div>Improper arguments used.</div>);
      } else if (!fileLoaded) {
        newCommands.push(<div>No file loaded.</div>);
      } else {
        const props: SearchProps = {
          splitInput: splitInput,
          inputLength: inputLength,
          fileName: fileName
        };
        newCommands.push(searchCSV(props));
      }
    } else if (usage == "load_file") {
      // handles calls to load csv
      // setFileName(splitInput[1]);
      const props: LoadProps = {
        fileName: splitInput[1],
        setCurrentFile: setCurrentFile,
        setFileLoaded: setFileLoaded,
        setFileName: setFileName
      };
      newCommands.push(loadCSV(props));
    } else {
      // handles cases that aren't any of the above three
      newCommands.push(<div>Unknown command was inputted.</div>);
    }

    return <div>{newCommands}</div>;
  };

  /**
   * Handles whenever a user clicks the Mode button to change the mode between
   * Brief and Verbose
   */
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
