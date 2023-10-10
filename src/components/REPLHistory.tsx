import "../styles/main.css";

interface REPLHistoryProps {
  // Fill with some shared state tracking all the pushed commands
  submittedCommands: string[];
}
export function REPLHistory(props: REPLHistoryProps) {
  const { submittedCommands } = props;

  const hist = submittedCommands.map((value: string) => {
    return <div key={value}>{value}</div>;
  });

  return <div className="repl-history">{hist}</div>;
}
