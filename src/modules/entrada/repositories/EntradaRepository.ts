import { pool } from '../../../mysql';
import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';

class EntradaRepository {
    create(request: Request, response: Response){
        const {preco_unidade, quantidade, produto_id_produto} = request.body;
        pool.getConnection((err: any, connection: any ) => {
            connection.query(
                'INSERT INTO entrada (id_entrada, preco_unidade, quantidade, produto_id_produto) VALUES (?, ?, ?, ?)',
                [uuidv4(), preco_unidade, quantidade, produto_id_produto]
            );
            connection.query(
                'UPDATE produto SET quantidade = quantidade + ? WHERE id_produto = ?',
                [quantidade, produto_id_produto],
                (error: any, result: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({message: 'Entrada registrada!'})
                }
            );
        });
    }
}

export { EntradaRepository };