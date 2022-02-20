import { useEffect, useState } from "react";
import Code from "./Code";
import { Copied, Copy, Logo } from "./Icons";
import { parseHTMLTableElem } from "./utils";
import copy from "copy-to-clipboard";
const JSONPlaceholder = "Your JSON will show here";
function App() {
  const [tableText, setTableText] = useState("");
  const [json, setJson] = useState(JSONPlaceholder);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (tableText) {
      try {
        setJson(parseHTMLTableElem(tableText));
      } catch {
        setJson("Not a valid table");
      }
    } else {
      setJson(JSONPlaceholder);
    }
  }, [tableText]);
  return (
    <>
      <header className="py-12">
        <Logo className="w-24 m-auto block h-24" />
        <h1 className="sr-only">HTML Tables to JSON</h1>
      </header>
      <main className="grid grid-cols-2  h-full">
        <textarea
          className="p-4 text-slate-200 text-sm"
          placeholder="Copy a table's HTML here"
          value={tableText}
          onChange={(e) => setTableText(e.target.value)}
        />

        <div className="h-full overflow-auto relative text-white">
          <button
            className="absolute right-4 top-4 text-slate-300"
            onClick={() => {
              copy(JSON.stringify(json, null, 2));
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1000);
            }}
          >
            {copied ? <Copied className="text-green-600" /> : <Copy />}
          </button>
          <Code code={JSON.stringify(json, null, 2)}></Code>
        </div>
      </main>
    </>
  );
}

export default App;
