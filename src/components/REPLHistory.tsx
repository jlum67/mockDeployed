import "../styles/main.css";

interface REPLHistoryProps {
  // Fill with some shared state tracking all the pushed commands
  submittedCommands: JSX.Element[];
  submittedInputs: string[];
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {
  const { submittedCommands, mode, submittedInputs } = props;

  const hist = submittedCommands.map((value: JSX.Element) => {
    if (mode === "Verbose") {
      return (
        <div key={value.key}>
          <div>{submittedInputs}</div>{" "}
          {/* TODO: fix to just be for the corresponding input*/}
          <div>{value}</div>
        </div>
      );
    }
    return <div key={value.key}>{value}</div>;
  });

  return <div className="repl-history">{hist}</div>;
}
