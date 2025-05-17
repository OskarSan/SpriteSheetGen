import { useState } from 'react'
import './App.css'

function App() {

  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await fetch('http://localhost:3000/prompt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || 'No response');
  };

  return (
    <>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask ChatGPT..."
      />
      <button onClick={handleSend}>Send</button>
      <div>{response}</div>
    </>
  )
}

export default App
