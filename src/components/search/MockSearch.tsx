/**
 * Returns mock search results to mode backend call to search. Contains mock 
 * results for different shapes of data and queries. 
 * 
 * @param column column name or index
 * @param toSearch value to find
 * @param fileName file to search through
 * @returns list of list of strings/output
 */
export function mockSearch(column: string, toSearch: string, fileName: string): string[][] {

  let possibleOutputs: { [key: string]: { [key: string]: string[][] } } = {};
  console.log(fileName)
  if (fileName === "file1") {
    possibleOutputs = {
      "": {
        hispanic: [
          [
            "RI",
            "Hispanic/Latino",
            " $673.14 ",
            "74596.18851",
            " $0.64 ",
            "14%",
          ],
          ["RI", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
        ],
      },
      state: {
        de: [["DE", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%", "White"]],
      },
      "1": {
        multiracial: [
          ["RI", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
        ],
      },
    };
  } else if (fileName === "file1noheaders") {
    possibleOutputs = {
      "": {
        white: [
          ["WA", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
          ["DE", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%", "White"],
        ],
      },
    };
  } else if (fileName === "oneCol") {
    console.log("here")
    possibleOutputs = {
      "": {
        white: [["White"]],
      },
    };
  } else if (fileName === "oneRow") {
    possibleOutputs = {
      "": {
        white: [
          ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
        ],
      },
    };
  } else if (fileName === "oneItem") {
    possibleOutputs = {
      "": {
        herro: [["herro"]],
      },
    };
  } else if (fileName === "empty") {
    possibleOutputs = {};
  }

  if (possibleOutputs[column]) {
    if (toSearch in possibleOutputs[column]) {
      return possibleOutputs[column][toSearch];
    } else {
      return [];
    }
  } else {
    return [];
  }
}
