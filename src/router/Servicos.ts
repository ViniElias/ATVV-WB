import { Router } from 'express';
import { connection } from '../database/connection';

const routerServico = Router();

routerServico.get('/', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM servicos');
  res.json(rows);
});

routerServico.post('/cadastrarServico', async (req, res) => {
  try {
    const { nome, preco } = req.body;

    await connection.query(
      'INSERT INTO servicos (nome, preco) VALUES (?, ?)',
      [nome, preco]
    );

    res.status(201).json({ message: 'Serviço cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar serviço:', error);
    res.status(500).json({ message: 'Erro ao cadastrar serviço' });
  }
});

routerServico.delete('/excluirServico/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.query('DELETE FROM servicos WHERE id = ?', [id]);

    // @ts-ignore
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    res.json({ message: 'Serviço excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir serviço:', error);
    res.status(500).json({ message: 'Erro interno ao excluir serviço.' });
  }
});

routerServico.put('/atualizarServico/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  try {
    const [result] = await connection.query(
      `UPDATE servicos
       SET nome = ?, preco = ?
       WHERE id = ?`,
      [nome, preco, id]
    );

    // @ts-ignore
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    res.json({ message: 'Serviço atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar serviço.' });
  }
});

export default routerServico;