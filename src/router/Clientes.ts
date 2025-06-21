import { Router } from 'express';
import { connection } from '../database/connection';

const router = Router();

router.get('/', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM clientes');
  res.json(rows);
});

router.post('/cadastrarCliente', async (req, res) => {
  try {
    const { nome, nomesocial, genero, cpf, rg, telefone } = req.body;

    await connection.query(
      'INSERT INTO clientes (nome, nomesocial, genero, cpf, rg, telefone) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, nomesocial, genero, cpf, rg, telefone]
    );

    res.status(201).json({ message: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ message: 'Erro ao cadastrar cliente' });
  }
});


export default router;
