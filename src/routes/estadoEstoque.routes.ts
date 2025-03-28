import {Router} from 'express';
import { EstadoEstoqueRepository } from '../modules/estadoEstoque/repositories/EstadoEstoque';


const estadoEstoque = Router();
const estadoEstoqueRepository = new EstadoEstoqueRepository();


estadoEstoque.get('/estado', (request, response) => {
    estadoEstoqueRepository.getEstadoEstoque(request, response)
});

  export { estadoEstoque };