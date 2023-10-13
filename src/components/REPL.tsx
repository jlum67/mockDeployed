import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import mockedJson from "../modules/mockedJson";
import { searchCSV, SearchProps } from "./SearchCSV";

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
        newCommands.push(
          <table>
            <thead>
              <tr className="table-headers">
                {currentFile.data.headers.map((header: string) => (
                  <td>{header}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentFile.data.body.map((stringArr: string[]) => (
                <tr>
                  {stringArr.map((str: string) => (
                    <td>{str}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );

        // currentFile.data.body.map((stringArr: string[]) => {
        //   //looping through list of lists
        //   //let tempStr = "";
        //   stringArr.map((str: string) => {
        //     //tempStr += str + ", ";
        //     <td>{str}</td>;
        //   });
        //   // body.push(tempStr.substring(0, tempStr.length - 2));
        //   // tempStr = "";

        //   return <tr>{cells}</tr>;
        // });

        // console.log(<table>{rows}</table>);
        //newCommands.push(<table>{rows}</table>);
        // body.forEach((str: string) => {
        //   newCommands.push(<tr>{str}</tr>);
        // });
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
      const fileName = splitInput[1];
      if (
        mockedJson(fileName).data.headers.length === 0 &&
        mockedJson(fileName).data.body.length === 0
      ) {
        newCommands.push(<div>Failed to load file.</div>);
      } else {
        setCurrentFile(mockedJson(fileName));
        setFileLoaded(true);
        newCommands.push(<div>{fileName} successfully loaded!</div>);
      }
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
