import { Router } from 'express';
import { showContas, createConta } from '../controllers';

const routes = Router();

routes.get('/contas', showContas);
routes.post('/conta', createConta);

export default routes;