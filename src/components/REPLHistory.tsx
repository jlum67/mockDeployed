import "../styles/main.css";

interface REPLHistoryProps {
  // Fill with some shared state tracking all the pushed commands
  submittedCommands: JSX.Element[];
  submittedInputs: {
    input: string;
    output: JSX.Element;
  }[];
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {
  const { submittedCommands, mode, submittedInputs } = props;

  const hist = submittedInputs.map(
    (value: { input: string; output: JSX.Element }) => {
      if (mode === "Verbose") {
        return (
          <div className="command" key={value.input}>
            <div>Command: {value.input}</div>
            <div>Output: {value.output}</div>
          </div>
        );
      } else {
        return (
          <div className="command" key={value.input}>
            <div>{value.output}</div>
          </div>
        );
      }
    }
  );

  // const hist = submittedCommands.map((value: JSX.Element) => {
  //   if (mode === "Verbose") {
  //     return (
  //       <div key={value.key}>
  //         <div>{submittedInputs[value]}</div>{" "}
  //         {/* TODO: fix to just be for the corresponding input*/}
  //         <div>{value}</div>
  //       </div>
  //     );
  //   }
  //   return <div key={value.key}>{value}</div>;
  // };

  return <div className="repl-history">{hist}</div>;
}
