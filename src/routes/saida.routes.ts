import {Router} from 'express';
import { SaidaRepository } from '../modules/saida/repositories/SaidaRepository';

const saidaRoutes = Router();
const saidaRepository = new SaidaRepository();

saidaRoutes.post('/venda', (request, response) => {
    saidaRepository.create(request, response)
});

  export { saidaRoutes };