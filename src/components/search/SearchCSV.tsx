import { mockSearch } from "./MockSearch";

/**
 * Stores inputs into searchCSV. Contains arguments used with search, length of
 * input, and current loaded file name.
 */
export interface SearchProps {
  splitInput: string[];
  inputLength: number;
  fileName: string
}

/**
 * Contains search functionality, outputting result of search request. Search 
 * results come from MockSearch, which models backend call.
 * 
 * @param props inputs needed to carry out search. specified in interface comment
 * @returns table containing search results
 */
export function searchCSV(props: SearchProps) {
  let searchOutput: string[][] = [];

  if (props.inputLength === 2) {
    searchOutput = mockSearch("", props.splitInput[1].toLowerCase(), props.fileName);
  } else {
    const column = props.splitInput[1];
    const toSearch = props.splitInput[2];

    searchOutput = mockSearch(
      column.toLowerCase(),
      toSearch.toLowerCase(),
      props.fileName
    );
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
}
