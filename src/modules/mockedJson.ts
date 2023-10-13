/**
 * Holds all the files that we're using for our mock, similar to the way they
 * were formatted for Server
 * @param fileName
 * @returns
 */
export default function mockedJson(fileName: string) {
  // normal file with headers
  if (fileName === "file1") {
    return {
      data: {
        headers: [
          "State",
          "Data Type",
          "Average Weekly Earnings",
          "Number of Workers",
          "Earnings Disparity",
          "Employed Percent",
        ],
        body: [
          ["WA", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
          ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
          [
            "CA",
            "Native American/American Indian",
            " $471.07 ",
            "2315.505646",
            " $0.45 ",
            "0%",
          ],
          [
            "OH",
            "Asian-Pacific Islander",
            '" $1,080.09 "',
            "18956.71657",
            " $1.02 ",
            "4%",
          ],
          [
            "NE",
            "Hispanic/Latino",
            " $673.14 ",
            "74596.18851",
            " $0.64 ",
            "14%",
          ],
          ["TX", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
          ["DE", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%", "White"],
          ["AL", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
        ],
      },
    };
    // normal file without headers
  } else if (fileName === "file1noheaders") {
    return {
      data: {
        headers: [],
        body: [
          ["WA", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
          ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
          [
            "CA",
            "Native American/American Indian",
            " $471.07 ",
            "2315.505646",
            " $0.45 ",
            "0%",
          ],
          [
            "OH",
            "Asian-Pacific Islander",
            '" $1,080.09 "',
            "18956.71657",
            " $1.02 ",
            "4%",
          ],
          [
            "NE",
            "Hispanic/Latino",
            " $673.14 ",
            "74596.18851",
            " $0.64 ",
            "14%",
          ],
          ["TX", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
          ["DE", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%", "White"],
          ["AL", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
        ],
      },
    };
    // file with only one column
  } else if (fileName === "oneCol") {
    return {
      data: {
        headers: [],
        body: [
          ["RI"],
          ["White"],
          ['" $1,058.47 "'],
          ["395773.6521"],
          [" $1.00 "],
          ["75%"],
        ],
      },
    };
    // file with only one row
  } else if (fileName === "oneRow") {
    return {
      data: {
        headers: [],
        body: [
          ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
        ],
      },
    };
    // file with only one cell
  } else if (fileName === "oneItem") {
    return {
      data: {
        headers: [],
        body: [["herro"]],
      },
    };
    // empty file
  } else if (fileName === "empty") {
    return {
      data: {
        headers: [],
        body: [[]],
      },
    };
  }

  // if none of the file names match
  return {
    data: {
      headers: [],
      body: [],
    },
  };
}
