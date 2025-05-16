import express, {Express} from 'express';
import dotenv from 'dotenv';
import router from './routes/route';


dotenv.config();
const app = express();
const port = 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});