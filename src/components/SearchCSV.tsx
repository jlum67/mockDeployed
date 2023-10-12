
export interface SearchProps {
  // Fill with some shared state tracking all the pushed commands
  splitInput: string[];
  inputLength: number;
}

export function searchCSV(props: SearchProps) {

    const noNameOrIndex = [ //getter or setter or something 
      ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
      ["RI", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
    ];

    const name = [ // data type column
      ["RI", "Hispanic/Latino", " $673.14 ", "74596.18851", " $0.64 ", "14%"],
    ];

    const index = [ // column 2
      ["RI", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
    ];

    let searchOutput: string[][] = [];

    //TODO: check that search inputs such as column name and index are correct, otherwise output could not be found or something
    if (props.inputLength === 2) { //no column name or index provided
        searchOutput = noNameOrIndex;
    } else {
        const column = props.splitInput[1]
        const toSearch = props.splitInput[2];

        const isNumber = parseInt(column);

        if (isNaN(isNumber)) {
            searchOutput = name;
        } else {
            searchOutput = index;
        }
    }

    const out: JSX.Element[] = [];
    const body: string[] = [];
    searchOutput.forEach((stringArr: string[]) => {
            //looping through list of lists
        let tempStr = "";
        stringArr.forEach((str: string) => {
            tempStr += str + ", ";
        });
        body.push(tempStr.substring(0, tempStr.length - 2));
        tempStr = "";
    });

    body.forEach((str: string) => {
        out.push(<div>{str}</div>);
    });

    return <div>{out}</div>

}