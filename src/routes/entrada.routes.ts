import {Router} from 'express';
import { EntradaRepository } from '../modules/entrada/repositories/EntradaRepository';

const entradaRoutes = Router();
const entradaRepository = new EntradaRepository();

entradaRoutes.post('/create', (request, response) => {
    entradaRepository.create(request, response)
});

  export { entradaRoutes };