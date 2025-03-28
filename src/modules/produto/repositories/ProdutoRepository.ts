import { pool } from '../../../mysql';
import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';


class ProdutoRepository {
    create(request: Request, response: Response){
        const {descricao, quantidade_max, quantidade_min, id_categoria, id_endereco} = request.body;
        pool.getConnection((err: any, connection: any ) => {
            connection.query(
                'INSERT INTO produto (id_produto, descricao, quantidade_max, quantidade_min, id_categoria, id_endereco) VALUES (?, ?, ?, ?, ?, ?)',
                [uuidv4(), descricao, quantidade_max, quantidade_min, id_categoria, id_endereco],
                (error: any, result: any, fields: any) => {
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({message: 'Produto criado com sucesso!'})
                    connection.release();
                }
            )
        });
    }

    delete(request: Request, response: Response){
        const { id } = request.params;
        pool.getConnection((err: any, connection: any) => {
            if (err) {
                return response.status(500).json({ error: "Erro ao conectar ao banco de dados" });
            }
        
            connection.query(
                "DELETE FROM produto WHERE id_produto = ?",
                [id],
                (error: any, result: any) => {
                connection.release();
        
                if (error) {
                    return response.status(400).json({ error: "Erro ao excluir produto" });
                }
        
                if (result.affectedRows === 0) {
                    return response.status(404).json({ error: "Produto não encontrada" });
                }
        
                response.status(200).json({ success: true, message: "Produto excluído com sucesso" });
                }
            );
        });
    }

    getProdutos(request: Request, response: Response){
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT * FROM produto',
                [],
                (error: any, results: any, fields: any) => {
                    connection.release();
                    if(error){
                        return response.status(400).json({error: 'Erro ao buscar produtos!'})
                    }
                    response.status(200).json({ success: true, message: "Produtos listados!", produtos: results });
                }
            )
        })
    }

    getProdutosLoc(request: Request, response: Response){
        const { id } = request.params;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT produto.descricao, endereco.rua, endereco.bloco FROM produto INNER JOIN endereco ON produto.id_endereco = endereco.id_endereco WHERE produto.id_produto = ?',
                [id],
                (error: any, results: any, fields: any) => {
                    connection.release();
                    if(error){
                        return response.status(400).json({error: 'Erro ao buscar produtos!'})
                    }
                    response.status(200).json({ success: true, message: "Produtos listados!", produtos: results });
                }
            )
        })
    }

    getRastrearProd(request: Request, response: Response){
        const { rua, bloco } = request.body;
        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'SELECT produto.descricao, endereco.rua, endereco.bloco FROM produto INNER JOIN endereco ON produto.id_endereco = endereco.id_endereco WHERE endereco.rua = ? AND endereco.bloco = ?',
                [rua, bloco],
                (error: any, results: any, fields: any) => {
                    connection.release();
                    if(error){
                        return response.status(400).json({error: 'Erro ao buscar produtos!'})
                    }
                    response.status(200).json({ success: true, message: "Produtos listados!", produtos: results });
                }
            )
        })
    }



}

export { ProdutoRepository };