import "../styles/main.css";

/**
 * Props for REPL history, passed in thru REPL
 */
interface REPLHistoryProps {
  // Fill with some shared state tracking all the pushed commands
  submittedCommands: JSX.Element[];
  submittedInputs: {
    input: string;
    output: JSX.Element;
  }[];
  mode: string;
}

/**
 * Displays past inputs for commands and the outputs of those commands
 * @param props - passed in by the REPL
 * @returns - display for past commands and outputs of those commands
 */
export function REPLHistory(props: REPLHistoryProps) {
  const { submittedCommands, mode, submittedInputs } = props;

  const hist = submittedInputs.map(
    (value: { input: string; output: JSX.Element }) => {
      if (mode === "Verbose") {
        // handles verbose mode
        return (
          <div aria-label="command" className="command" key={value.input}>
            <div className="command-header">Command:</div>
            <div>{value.input}</div>
            <div className="output-header">Output:</div>
            <div>{value.output}</div>
          </div>
        );
      } else {
        // handles brief mode
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
