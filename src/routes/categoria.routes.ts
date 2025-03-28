import {Router} from 'express';
import { CategoriaRepository } from '../modules/categoria/repositories/CategoriaRepository';

const categoriaRoutes = Router();
const categoriaRepository = new CategoriaRepository();

categoriaRoutes.post('/create', (request, response) => {
    categoriaRepository.create(request, response)
});

categoriaRoutes.delete("/delete/:id", (request, response) => {
    categoriaRepository.delete(request, response)
  });

  export { categoriaRoutes };
