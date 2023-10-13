import mockedJson from "../../modules/mockedJson";

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

export function loadCSV(props: LoadProps) {
  if (
    mockedJson(props.fileName).data.headers.length === 0 &&
    mockedJson(props.fileName).data.body.length === 0
  ) {
    return <div>Failed to load file.</div>;
  } else {
    props.setCurrentFile(mockedJson(props.fileName));
    props.setFileLoaded(true);
    return <div>{props.fileName} successfully loaded!</div>;
  }
}
