import {Router} from 'express';
import { ProdutoRepository } from '../modules/produto/repositories/ProdutoRepository';

const produtoRoutes = Router();
const produtoRepository = new ProdutoRepository

produtoRoutes.post('/create', (request, response) => {
    produtoRepository.create(request, response)
});

produtoRoutes.delete("/delete/:id", (request, response) => {
    produtoRepository.delete(request, response)
  });

  produtoRoutes.get("/get-produtos", (request, response) => {
    produtoRepository.getProdutos(request, response)
  });

  produtoRoutes.get("/get-produtosLoc/:id", (request, response) => {
    produtoRepository.getProdutosLoc(request, response)
  });

  produtoRoutes.get("/get-rastrearProd", (request, response) => {
    produtoRepository.getRastrearProd(request, response)
  });

  export { produtoRoutes };
