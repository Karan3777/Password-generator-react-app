import { useCallback, useEffect, useRef, useState } from "react";
import Generator from "./Components/Generator";

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();
  const [isCopied, setIsCopied] = useState("Copy");
  const handleClickEvent = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();

    setIsCopied("Copied");
    setTimeout(() => {
      setIsCopied("Copy");
    }, 2000);
    
    
  };
 


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()-_=+[]{}|;:,.<>?/";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const passwordRef = useRef(null);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <h1 className="text-white bg-slate-800 p-6 text-center text-4xl">
        Password Generator
      </h1>
      <div className="mt-8">
        <div className="flex justify-center mb-5 align-center ">
          <input
            className="border border-slate-800 mt-5 ml-5 p-1 shadow-md rounded-tl-md rounded-bl-md  "
            value={password}
            type="text"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={handleClickEvent}
            className="bg-blue-400 h-1/2 mt-5 p-1  hover:bg-blue-700  hover:text-white rounded-tr-md rounded-br-md py-2 "
          >
            {isCopied}
          </button>
        </div>

        <div className=" flex align-center w-1/2 m-auto justify-center bg-slate-800 text-white  gap-3 p-8 rounded ">
          <input
            type="range"
            className="cursor-pointer"
            min={8}
            max={20}
            onChange={(e) => {
              setLength(e.target.value);
            }}
            value={length}
          />
          <label>Length {length}</label>

          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="">Add Numbers</label>

          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="">Add Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
