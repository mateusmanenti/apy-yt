import { pool } from '../../../mysql';
import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';


class EnderecoRepository {
    create(request: Request, response: Response){
        const {rua, bloco} = request.body;
        pool.getConnection((err: any, connection: any ) => {
            connection.query(
                'INSERT INTO endereco (id_endereco, rua, bloco) VALUES (?, ?, ?)',
                [uuidv4(), rua, bloco],
                (error: any, result: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({message: 'Endereco criado com sucesso!'})
                    
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
                "DELETE FROM endereco WHERE id_endereco = ?",
                [id],
                (error: any, result: any) => {
                connection.release();
        
                if (error) {
                    return response.status(400).json({ error: "Erro ao excluir endereço" });
                }
        
                if (result.affectedRows === 0) {
                    return response.status(404).json({ error: "Endereço não encontrada" });
                }
        
                response.status(200).json({ success: true, message: "Endereço excluído com sucesso" });
                }
            );
        });
    }
}


export { EnderecoRepository };