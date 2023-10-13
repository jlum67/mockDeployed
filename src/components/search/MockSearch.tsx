
export function mockSearch(column: string, toSearch: string): string[][] {

    const possibleOutputs: { [key: string]: { [key: string]: string[][] } } = {
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