/**
 * Props passed in by REPL to specify what file to display
 */
export interface ViewProps {
  // Fill with some shared state tracking all the pushed commands
  currentFile: {
    data: {
      headers: string[];
      body: string[][];
    };
  };
}

/**
 * Displays the currently loaded CSV file
 * @param props - passed in by REPL
 * @returns the CSV loaded in (if it exists)
 */
export function viewCSV(props: ViewProps) {
  return (
    // map each CSV row to a table row, then map each CSV cell to a table
    // cell
    <table>
      <thead>
        <tr className="table-headers">
          {props.currentFile.data.headers.map((header: string) => (
            <td>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.currentFile.data.body.map((stringArr: string[]) => (
          <tr>
            {stringArr.map((str: string) => (
              <td>{str}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
