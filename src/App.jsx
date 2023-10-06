import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(13);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isNumberAllowed) str += "0123456789";
    if (isCharAllowed) {
      str += "!@#$%^&*()-_=+[]{};:<>,.?/";
      console.log("Updated String with chars allowed:" + str);
    }

    console.log("Final string: " + str);
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }
    console.log(pass);
    setPassword(pass);
  }, [length, isNumberAllowed, isCharAllowed]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard
      .writeText(password)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharAllowed]);

  const handleLength = (e) => {
    setLength(e.target.value);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-slate-800">
      <div className="md:w-[35rem] w-[90%] bg-slate-700 rounded-lg flex flex-col p-5 mt-10">
        <h1 className="text-3xl font-bold text-white mb-5 text-center md:text-left">
          Password Generator
        </h1>
        <div className="flex justify-center">
          <input
            type="text"
            className="p-2 w-full rounded-bl-lg rounded-tl-lg border border-black/10 text-orange-500 outline-none"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            className="px-4 py-2 bg-blue-700 rounded-br-lg rounded-tr-lg hover:bg-blue-600 text-white"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex md:flex-row flex-col md:space-x-6 md:space-y-0 space-y-2 justify-center mt-5">
          <div className="flex md:flex-row flex-col-reverse md:items-center md:space-x-2">
            <input
              type="range"
              name="lengthSlider"
              min={6}
              max={100}
              value={length}
              onChange={handleLength}
              className="cursor-pointer md:w-100 w-20"
            />
            <label
              htmlFor="lengthSlider"
              className="text-orange-500 font-semibold"
            >
              Length: {length}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isNumber"
              id="isNumber"
              defaultChecked={isNumberAllowed}
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="isNumber" className="text-orange-500 font-semibold">
              Numbers
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isChar"
              id="isChar"
              defaultChecked={isCharAllowed}
              onChange={() => {
                setIsCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="isChar" className="text-orange-500 font-semibold">
              Characters
            </label>
          </div>
        </div>
      </div>
      {copySuccess && (
        <div className="mt-2 bg-green-500 text-white text-sm px-2 py-1 rounded">
          Successfully copied to clipboard
        </div>
      )}
    </div>
  );
};

export default App;
