import React, { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [numbers, toggleNumbers] = useState(false)
  const [charc, toggleChar] = useState(false)
  const [passwd, setPasswd] = useState("")

  const passRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbers) {
      str += "0123456789"
    }
    if (charc) {
      str += "{}[]!@#$%^&()*~"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPasswd(pass);

  }, [length, setPasswd, numbers, charc])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbers, charc, passwordGenerator])

  const cpPassClipBoard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(passwd)
  }, [passwd])

  return (
    <div className='w-full max-w-md mx-auto  shadow-md rounded-lg px-4 my-8 py-3 text-orange-200 bg-gray-700'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex shadow-rounded-lg overflow-hidden bg-white mb-4 px-5 py-5 rounded-lg '>
        <input type="text"
          value={passwd}
          className='outline-none w-full py-1 px-3 rounded-lg'
          placeholder='password'
          readOnly
          ref={passRef}
        />
        <button onClick={cpPassClipBoard} className='bg-slate-900 rounded-lg px-5'>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-2'>
          <input type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer outline-none'
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <label>Length : {length}</label>
          <input type="checkbox"
            defaultChecked={numbers}
            id='numberInput'
            className='outline-none '
            onChange={() => {
              toggleNumbers((prev) => !prev)
            }}
          />
          <label htmlFor="numberInput">Numbers</label>

          <input type="checkbox"
            defaultChecked={charc}
            id='charInput'
            className='outline-none'
            onChange={() => {
              toggleChar((prev) => !prev)
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>

      </div>

    </div>
  )
}

export default App