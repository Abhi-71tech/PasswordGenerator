import { use, useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setNumberAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 my-12 text-orange-400 bg-gray-900">
        <h1 className="text-center text-2xl font-bold text-white mb-6">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-6 bg-gray-800">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-2 px-4 bg-gray-700 text-white text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
            aria-label="Generated password"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-orange-500 hover:bg-orange-600 transition-colors text-white py-2 px-4 font-semibold"
            aria-label="Copy password"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer accent-orange-500"
              onChange={(e) => setLength(Number(e.target.value))}
              aria-label="Password length"
            />
            <label className="text-white font-medium">Length: <span className="text-orange-400">{length}</span></label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              id="numberInput"
              className="accent-orange-500"
            />
            <label htmlFor="numberInput" className="text-white font-medium">Numbers</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              id="charInput"
              className="accent-orange-500"
            />
            <label htmlFor="charInput" className="text-white font-medium">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
