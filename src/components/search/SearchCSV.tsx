import { mockSearch } from "./MockSearch";

export interface SearchProps {
  // Fill with some shared state tracking all the pushed commands
  splitInput: string[];
  inputLength: number;
}

export function searchCSV(props: SearchProps) {
  let searchOutput: string[][] = [];

  if (props.inputLength === 2) {
    //no column name or index provided
    searchOutput = mockSearch("", props.splitInput[1].toLowerCase());
  } else {
    const column = props.splitInput[1];
    const toSearch = props.splitInput[2];

    searchOutput = mockSearch(column.toLowerCase(), toSearch.toLowerCase());
    console.log("here1");
  }

  if (searchOutput == undefined) {
    console.log("here");
    searchOutput = [];
  }

  const out: JSX.Element[] = [];
  const body: string[] = [];

  if (searchOutput.length === 0) {
    out.push(<div>Search request could not be found.</div>);
    return <div>{out}</div>;
  } else {
    // searchOutput.forEach((stringArr: string[]) => {
    //   //looping through list of lists
    //   let tempStr = "";
    //   stringArr.forEach((str: string) => {
    //     tempStr += str + ", ";
    //   });
    //   body.push(tempStr.substring(0, tempStr.length - 2));
    //   tempStr = "";
    // });

    // body.forEach((str: string) => {
    //   out.push(<div>{str}</div>);
    // });

    return (
      <table>
        <tbody>
          {searchOutput.map((stringArr: string[]) => (
            <tr className="table-headers">
              {stringArr.map((str: string) => (
                <td className="custom-cell">{str}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  // return <div>{out}</div>;
}
