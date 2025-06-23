import { Router } from 'express';
import { connection } from '../database/connection';

const routerCliente = Router();

interface Produto {
  preco: number;
}

interface Servico {
  preco: number;
}

routerCliente.get('/', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM clientes');
  res.json(rows);
});

routerCliente.get('/quantidade', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM clientes ORDER BY quantidade DESC');
  res.json(rows);
});

routerCliente.get('/quantidadeMenor', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM clientes ORDER BY quantidade');
  res.json(rows);
});

routerCliente.get('/valor', async (req, res) => {
  const [rows] = await connection.query('SELECT * FROM clientes ORDER BY valor DESC');
  res.json(rows);
});

routerCliente.post('/cadastrarCliente', async (req, res) => {
  try {
    const { nome, nomesocial, genero, cpf, rg, telefone, quantidade, valor } = req.body;

    await connection.query(
      'INSERT INTO clientes (nome, nomesocial, genero, cpf, rg, telefone, quantidade, valor) VALUES (?, ?, ?, ?, ?, ?, 0, 0)',
      [nome, nomesocial, genero, cpf, rg, telefone, quantidade, valor]
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

routerCliente.post('/registrarCompra', async (req, res) => {
  const { idCliente, idProduto, idServico, qtdProduto, qtdServico } = req.body;

  try {
    const [clienteRows] = await connection.query(
      'SELECT genero FROM clientes WHERE id = ?',
      [idCliente]
    ) as unknown as [{ genero: string }[], any];

    if (clienteRows.length === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    const generoCliente = clienteRows[0].genero;

    const [produtoRows] = await connection.query(
      'SELECT preco FROM produtos WHERE id = ?',
      [idProduto]
    ) as unknown as [Produto[], any];

    if (produtoRows.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    const precoProduto = produtoRows[0].preco;

    const [servicoRows] = await connection.query(
      'SELECT preco FROM servicos WHERE id = ?',
      [idServico]
    ) as unknown as [Servico[], any];

    if (servicoRows.length === 0) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }
    const precoServico = servicoRows[0].preco

    const totalQuantidade = Number(qtdProduto) + Number(qtdServico);
    const totalValor = (precoProduto * qtdProduto) + (precoServico * qtdServico);

    await connection.query(
      `UPDATE clientes
       SET quantidade = quantidade + ?, valor = valor + ?
       WHERE id = ?`,
      [totalQuantidade, totalValor, idCliente]
    );

    if (generoCliente === 'M') {
      await connection.query(
        `UPDATE produtos SET vendas = vendas + ?, vendasH = vendasH + ? WHERE id = ?`,
        [qtdProduto, qtdProduto, idProduto]
      );
      await connection.query(
        `UPDATE servicos SET vendas = vendas + ?, vendasH = vendasH + ? WHERE id = ?`,
        [qtdServico, qtdServico, idServico]
      );
    } else {
      await connection.query(
        `UPDATE produtos SET vendas = vendas + ?, vendasM = vendasM + ? WHERE id = ?`,
        [qtdProduto, qtdProduto, idProduto]
      );
      await connection.query(
        `UPDATE servicos SET vendas = vendas + ?, vendasM = vendasM + ? WHERE id = ?`,
        [qtdServico, qtdServico, idServico]
      );
    }

    res.status(200).json({ message: 'Compra registrada com sucesso!' });

  } catch (error) {
    console.error('Erro ao registrar compra:', error);
    res.status(500).json({ message: 'Erro interno ao registrar compra.' });
  }
});

export default routerCliente;