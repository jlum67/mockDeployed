import React from "react";

export default function mockedJson(fileName: string) {
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
          ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
          ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
          [
            "RI",
            "Native American/American Indian",
            " $471.07 ",
            "2315.505646",
            " $0.45 ",
            "0%",
          ],
          [
            "RI",
            "Asian-Pacific Islander",
            '" $1,080.09 "',
            "18956.71657",
            " $1.02 ",
            "4%",
          ],
          [
            "RI",
            "Hispanic/Latino",
            " $673.14 ",
            "74596.18851",
            " $0.64 ",
            "14%",
          ],
          ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
          ["DE", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%", "White"],
          ["RI", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
        ],
      },
    };
  } else if (fileName === "file1noheaders") {
    return {
      data: {
        headers: [],
        body: [
          ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
          ["RI", "Black", " $770.26 ", "30424.80376", " $0.73 ", "6%"],
          [
            "RI",
            "Native American/American Indian",
            " $471.07 ",
            "2315.505646",
            " $0.45 ",
            "0%",
          ],
          [
            "RI",
            "Asian-Pacific Islander",
            '" $1,080.09 "',
            "18956.71657",
            " $1.02 ",
            "4%",
          ],
          [
            "RI",
            "Hispanic/Latino",
            " $673.14 ",
            "74596.18851",
            " $0.64 ",
            "14%",
          ],
          ["RI", "Multiracial", " $971.89 ", "8883.049171", " $0.92 ", "2%"],
          ["DE", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%", "White"],
          ["RI", "Multiracial", " Hispanic ", "8883.049171", " $0.92 ", "2%"],
        ],
      },
    };
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
  } else if (fileName === "oneRow") {
    return {
      data: {
        headers: [],
        body: [
          ["RI", "White", '" $1,058.47 "', "395773.6521", " $1.00 ", "75%"],
        ],
      },
    };
  } else if (fileName === "oneItem") {
    return {
      data: {
        headers: [],
        body: [["herro"]],
      },
    };
  } else if (fileName === "empty") {
    return {
      data: {
        headers: [],
        body: [[]],
      },
    };
  }

  return {
    data: {
      headers: [],
      body: [],
    },
  };
}
