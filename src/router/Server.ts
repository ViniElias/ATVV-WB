const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const clientesRouter = require('./router/clientes');
app.use('/api/clientes', clientesRouter);

// Export vazio para resolver o problema de --isolatedModules
export {};