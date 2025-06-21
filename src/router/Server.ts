import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

import routerCliente from './Clientes';
app.use('/clientes', routerCliente);

import routerProduto from './Produtos';
app.use('/produtos', routerProduto);

import routerServico from './Servicos';
app.use('/servicos', routerServico);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});