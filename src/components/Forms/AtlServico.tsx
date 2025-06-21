import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const AtlServico = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'id':
        setId(value);
        break;
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
      const response = await fetch(`http://localhost:3001/servicos/atualizarServico/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          preco
        })
      });

      if (response.ok) {
        setMensagem('Serviço atualizado com sucesso!');
      } else {
        const erro = await response.json();
        setMensagem('Erro: ' + erro.message);
      }
    } catch (err) {
      console.error('Erro ao atualizar serviço:', err);
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="form">
      <h3>Atualizar</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID</label>
        <input
          type="text" id="id" name="id"
          value={id} onChange={handleChange}
          required pattern="\d{1}" maxLength={1}
          title="Apenas números são aceitos."
        />

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

        <button type="submit">Atualizar</button>
      </form>

      {mensagem && (
        <p className="mensagem">{mensagem}</p>
      )}
    </div>
  );
};

export default AtlServico;
