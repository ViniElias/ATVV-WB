import express from 'express';
import cors from 'cors';
import router from './Clientes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/clientes', router);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
