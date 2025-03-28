import {Router} from 'express';
import { EnderecoRepository } from '../modules/endereco/repositories/EnderecoRepository';

const enderecoRoutes = Router();
const enderecoRepository = new EnderecoRepository();

enderecoRoutes.post('/create', (request, response) => {
    enderecoRepository.create(request, response)
});

enderecoRoutes.delete("/delete/:id", (request, response) => {
    enderecoRepository.delete(request, response)
  });

  export { enderecoRoutes };
