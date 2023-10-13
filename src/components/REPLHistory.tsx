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
          <div aria-label="command" className="command" key={value.input}>
            <div className="command-header">Command:</div>
            <div>{value.input}</div>
            <div className="output-header">Output:</div>
            <div>{value.output}</div>
          </div>
        );
      } else {
        return (
          <div aria-label="command" className="command" key={value.input}>
            <div>{value.output}</div>
          </div>
        );
      }
    }
  );

  return <div className="repl-history">{hist}</div>;
}
