import {Router, Request, Response} from 'express';
import axios from 'axios';
import fs from "fs";
import OpenAI, { toFile } from "openai";
import multer from "multer";


const router : Router = Router();
const upload = multer({ dest: 'uploads/' });


router.post('/prompt', upload.single("image"), async (req: Request, res: Response) => {
  
  
  console.log("Received request:", req.body);
  const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  
    const imageFilePath = req.file?.path;
    const receivedImageFile = [
        await toFile(fs.createReadStream(imageFilePath!), null, {
            type: "image/png",
        }),
    ];

  const imageFiles = [
      "example_dude.png",
      "example_dude_transparent.png"
  ];
  //handle image upload with multer
  /*
  if (req.body.image) {
      imageFiles.push(req.body.image);
  };
  */
//   console.log("Image files:", imageFiles);
//   const images = await Promise.all(
//       imageFiles.map(async (file) =>
//           await toFile(fs.createReadStream(file), null, {
//               type: "image/png",
//           })
//       ),
//   );
  console.log(req.body.message)
  const rsp = await client.images.edit({
      model: "dall-e-2",
      image: receivedImageFile[0],
      //mask: images[1],
      prompt: req.body.message,
  });
  
  console.log("Response from OpenAI:", rsp);
  // Save the image to a file
  if (!rsp.data || !Array.isArray(rsp.data) || !rsp.data[0]?.b64_json) {
      res.status(500).json({ error: "No image data returned from OpenAI." });
      return;
    }
  const image_base64 = rsp.data[0].b64_json;
  const image_bytes = Buffer.from(image_base64, "base64");
  const outputPath = "result.png";
  fs.writeFileSync(outputPath, image_bytes);
    res.json({imageUrl: `http://localhost:3000/${outputPath}`});
});


export default router;