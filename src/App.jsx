import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    numberAllowed ? (str += "0123456789") : str;
    charAllowed ? (str += "!@#$%^&*(()_-+={[}]:;'<,>.?/|") : str;
    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            placeholder="password"
            readOnly
            className="outline-none w-full py-2 px-4 text-gray-800 bg-amber-300 font-bold text-lg"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-600 active:bg-blue-800"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              id="rangeLength"
              type="range"
              className="cursor-pointer"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="rangeLength">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="numCheck"
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            <label htmlFor="numCheck">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="charCheck"
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
            />
            <label htmlFor="charCheck">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
