import { pool } from '../../../mysql';
import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';


class CategoriaRepository {
    create(request: Request, response: Response){
        const {nome} = request.body;
        pool.getConnection((err: any, connection: any ) => {
            connection.query(
                'INSERT INTO categoria (id_categoria, nome) VALUES (?, ?)',
                [uuidv4(), nome],
                (error: any, result: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({message: 'Categoria criada com sucesso!'})
                    
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
                "DELETE FROM categoria WHERE id_categoria = ?",
                [id],
                (error: any, result: any) => {
                connection.release();
        
                if (error) {
                    return response.status(400).json({ error: "Erro ao excluir categoria" });
                }
        
                if (result.affectedRows === 0) {
                    return response.status(404).json({ error: "Categoria não encontrada" });
                }
        
                response.status(200).json({ success: true, message: "Categoria excluída com sucesso" });
                }
            );
        });
    }
}



export { CategoriaRepository };