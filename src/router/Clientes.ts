import { Router } from 'express';
import { connection } from '../database/connection';

const router = Router();

// Listar clientes
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.query('SELECT * FROM clientes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Cadastrar cliente
router.post('/', async (req, res) => {
  const { nome, nomeSocial, genero, cpf } = req.body;

  try {
    const [result] = await connection.execute(
      'INSERT INTO clientes (nome, nomeSocial, genero, cpf) VALUES (?, ?, ?, ?)',
      [nome, nomeSocial, genero, cpf]
    );

    res.status(201).json({ id: (result as any).insertId, nome, nomeSocial, genero, cpf });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// Excluir cliente
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await connection.execute('DELETE FROM clientes WHERE id = ?', [id]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

export default router;