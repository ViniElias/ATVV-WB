import { Router } from 'express';
import { connection } from '../database/connection';

const routerProduto = Router();

routerProduto.get('/', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM produtos');
  res.json(rows);
});

routerProduto.get('/geral', async (req, res) => {
  const [rows] = await connection.query(
    `SELECT * FROM produtos
    UNION ALL
    SELECT * FROM servicos
    ORDER BY vendas DESC`);
  res.json(rows);
});

routerProduto.get('/masculino', async (req, res) => {
  const [rows] = await connection.query(
    `SELECT * FROM produtos
    UNION ALL
    SELECT * FROM servicos
    ORDER BY vendasH DESC`);
  res.json(rows);
});

routerProduto.get('/feminino', async (req, res) => {
  const [rows] = await connection.query(
    `SELECT * FROM produtos
    UNION ALL
    SELECT * FROM servicos
    ORDER BY vendasM DESC`);
  res.json(rows);
});

routerProduto.post('/cadastrarProduto', async (req, res) => {
  try {
    const { nome, preco, vendas, vendasH, vendasM, tipo } = req.body;

    await connection.query(
      'INSERT INTO produtos (nome, preco, vendas, vendasH, vendasM, tipo) VALUES (?, ?, 0, 0, 0, "produto")',
      [nome, preco, vendas, tipo, vendasH, vendasM]
    );

    res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ message: 'Erro ao cadastrar produto' });
  }
});

routerProduto.delete('/excluirProduto/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await connection.query('DELETE FROM produtos WHERE id = ?', [id]);

    // @ts-ignore
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.json({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ message: 'Erro interno ao excluir produto.' });
  }
});

routerProduto.put('/atualizarProduto/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  try {
    const [result] = await connection.query(
      `UPDATE produtos
       SET nome = ?, preco = ?
       WHERE id = ?`,
      [nome, preco, id]
    );

    // @ts-ignore
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    res.json({ message: 'Produto atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar produto.' });
  }
});

export default routerProduto;