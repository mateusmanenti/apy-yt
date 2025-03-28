import express from 'express';
import { categoriaRoutes } from './routes/categoria.routes';
import { enderecoRoutes } from './routes/endereco.routes';
import { produtoRoutes } from './routes/produto.routes';
import { entradaRoutes } from './routes/entrada.routes';
import { saidaRoutes } from './routes/saida.routes';
import { estadoEstoque } from './routes/estadoEstoque.routes';

const app = express();

app.use(express.json());
app.use('/categoria', categoriaRoutes);
app.use('/endereco', enderecoRoutes);
app.use('/produto', produtoRoutes);
app.use('/entrada', entradaRoutes);
app.use('/saida', saidaRoutes);
app.use('/estoque', estadoEstoque);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));