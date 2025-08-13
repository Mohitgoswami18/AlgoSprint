import MonacoEditor from "react-monaco-editor";
const CodeEditor = () => {
  return (
    <div>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
      />
    </div>
  );
}

export default CodeEditor
