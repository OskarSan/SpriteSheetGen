import { useState } from 'react'
import './App.css'

function App() {

  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleSend = async () => {
    const formData = new FormData();
    formData.append('message', input);
    if (uploadedImage) {
      formData.append('image', uploadedImage); 
    }

    const res = await fetch('http://localhost:3000/prompt', {
      method: 'POST',
      body: formData, 
    });
    const data = await res.json();
    console.log("Response from server:", data);
    setResponse(data.choices?.[0]?.message?.content || 'No response');
    setImageUrl(data.imageUrl || '');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  return (
    <>
      <h1>AI Spritesheet Generator</h1>
      
      <br/>
      <input type="file" accept="image/png" onChange={handleImageUpload} />
      {uploadedImage && <p>Uploaded Image: {uploadedImage.name}</p>}
      <button onClick={handleSend}>Send</button>
      <div>{response}</div>
    </>
  )
}

export default App
