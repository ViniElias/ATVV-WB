import { Router } from 'express';
import { connection } from '../database/connection';

const routerCliente = Router();

routerCliente.get('/', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM clientes');
  res.json(rows);
});

routerCliente.post('/cadastrarCliente', async (req, res) => {
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

routerCliente.delete('/excluirCliente/:cpf', async (req, res) => {
  const { cpf } = req.params;

  try {
    const [result] = await connection.query('DELETE FROM clientes WHERE cpf = ?', [cpf]);

    // @ts-ignore
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.json({ message: 'Cliente excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    res.status(500).json({ message: 'Erro interno ao excluir cliente.' });
  }
});

routerCliente.put('/atualizarCliente/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const { nome, nomesocial, genero, rg, telefone } = req.body;

  try {
    const [result] = await connection.query(
      `UPDATE clientes
       SET nome = ?, nomesocial = ?, genero = ?, rg = ?, telefone = ?
       WHERE cpf = ?`,
      [nome, nomesocial, genero, rg, telefone, cpf]
    );

    // @ts-ignore
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.json({ message: 'Cliente atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar cliente.' });
  }
});

export default routerCliente;
