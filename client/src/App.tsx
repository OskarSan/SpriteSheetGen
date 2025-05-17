import { useState } from 'react'
import './App.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Padding } from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function App() {

  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for previewing the uploaded image


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
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <h1>AI Spritesheet Generator</h1>
      <br/>
      
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleImageUpload}
          multiple
        />
      </Button>
      <br/>
      <br/>
      {previewImage && (
        <div>
          <h3>Uploaded Image Preview:</h3>
          <img src={previewImage} alt="Uploaded Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
      
      <button onClick={handleSend}>Send</button>
      <div>{response}</div>
    </>
  )
}

export default App
