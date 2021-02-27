import Express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(routes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening at port ${port} 🚀🚀`);
});