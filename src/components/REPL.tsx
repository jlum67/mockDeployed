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
  const [submittedCommands, setSubmittedCommands] = useState<string[]>([]);
  const file1 = mockedJson().file1;

  function addCommand(str: string) {
    const newCommand = parseCommandLine(str);
    setSubmittedCommands([...submittedCommands, newCommand]);
  }

  const parseCommandLine = (str: string) => {
    let newLine = "";
    if (str.includes("load_file")) {
      file1.data.body.forEach((stringArr: string[]) => {
        stringArr.forEach((str: string) => {
          newLine += str;
        });
      });
    }
    return newLine;
  };

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory submittedCommands={submittedCommands} />
      <hr></hr>
      <REPLInput addCommand={addCommand} />
    </div>
  );
}
