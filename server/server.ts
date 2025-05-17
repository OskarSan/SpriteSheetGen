import express, {Express} from 'express';
import dotenv from 'dotenv';
import router from './routes/route';
import cors, {CorsOptions} from 'cors'

dotenv.config();
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());
app.use('/', router);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});