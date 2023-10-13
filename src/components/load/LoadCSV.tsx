import mockedJson from "../../modules/mockedJson";

/**
 * Props for LoadCSV, passed in by REPL
 */
export interface LoadProps {
  // Fill with some shared state tracking all the pushed commands
  fileName: string;
  setCurrentFile: React.Dispatch<
    React.SetStateAction<{
      data: {
        headers: string[];
        body: string[][];
      };
    }>
  >;
  setFileLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Loads the file in the REPL and returns the correct response
 * @param props - passed in by REPL
 * @returns - the response for whether the file was able to be loaded
 */
export function loadCSV(props: LoadProps) {
  if (
    mockedJson(props.fileName).data.headers.length === 0 &&
    mockedJson(props.fileName).data.body.length === 0
  ) {
    // if file couldn't be loaded for whatever reason
    return <div>Failed to load file.</div>;
  } else {
    // load file
    props.setCurrentFile(mockedJson(props.fileName));
    props.setFileLoaded(true);
    return <div>{props.fileName} successfully loaded!</div>;
  }
}
