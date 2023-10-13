export interface ViewProps {
  // Fill with some shared state tracking all the pushed commands
  currentFile: {
    data: {
      headers: string[];
      body: string[][];
    };
  };
}

export function viewCSV(props: ViewProps) {


    return (
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
