import { pool } from '../../../mysql';
import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';

class EstadoEstoqueRepository {
    getEstadoEstoque(request: Request, response: Response){
        pool.getConnection((err: any, connection: any ) => {
            connection.query(
                'SELECT produto.descricao, produto.quantidade, produto.quantidade_max FROM produto WHERE quantidade >= quantidade_max',
                [],
                (errorExcesso: any, resultsExcesso: any, fieldsExcesso: any) => {
                    if (errorExcesso) {
                        connection.release();
                        return response.status(400).json({error: 'Erro ao buscar produto em excesso!'});
                    }
                    connection.query(
                        'SELECT produto.descricao, produto.quantidade, produto.quantidade_min FROM produto WHERE quantidade <= quantidade_min',
                        [],
                        (errorFalta: any, resultsFalta: any, fieldsFalta: any) => {
                            connection.release();
                            if (errorFalta) {
                                return response.status(400).json({error: 'Erro ao buscar produto com falta em estoque!'});
                            }
                            if(resultsExcesso.length === 0 && resultsFalta.length === 0){
                                return response.status(404).json({message: 'Nenhum produto com falta ou excesso em estoque!'})
                            }
                            response.status(200).json({
                                success: true, 
                                message: 'produtos em falta:', 
                                produtosFalta: resultsFalta,
                                message2: 'produtos em excesso:',
                                produtosExcesso: resultsExcesso
                            })
                            
                        }
                    )
                }
                
            );
           
        });
    }
}

export { EstadoEstoqueRepository };