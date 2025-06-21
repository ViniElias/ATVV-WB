import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const CadProduto = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'nome':
        setNome(value);
        break;
      case 'preco':
        setPreco(value);
        break;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/produtos/cadastrarProduto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          preco
        })
      });

      if (response.ok) {
        setMensagem('Produto cadastrado com sucesso!');
        setNome('');
        setPreco('');
      } else {
        const erro = await response.json();
        setMensagem('Erro ao cadastrar: ' + erro.message);
      }
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="form">
      <h3>Cadastrar</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input
          type="text" id="nome" name="nome"
          value={nome} onChange={handleChange}
          required pattern="[A-Za-zÀ-ÿ\s]+"
          title="Apenas letras e espaços são permitidos"
        />

        <label htmlFor="preco">Preço (R$)</label>
        <input
          type="number" id="preco" name="preco"
          value={preco} onChange={handleChange}
          required step="any" min="0"
          title="Valor inválido."
        />

        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && (
        <p className="mensagem">{mensagem}</p>
      )}
    </div>
  );
};

export default CadProduto;