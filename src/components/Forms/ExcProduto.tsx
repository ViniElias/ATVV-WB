import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const ExcProduto = () => {
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/produtos/excluirProduto/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMensagem('Produto excluído com sucesso!');
      } else {
        const erro = await response.json();
        setMensagem('Erro: ' + erro.message);
      }
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      setMensagem('Erro ao conectar com o servidor.');
    }

    setId('');
  };

  return (
    <div className="form">
      <h3>Excluir</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID</label>
        <input
          type="text" id="id" name="id"
          value={id} onChange={handleChange}
          required pattern="\d{1}" maxLength={1}
          title="Apenas números são aceitos."
        />
        <button type="submit">Excluir</button>
      </form>
      {mensagem && (
        <p className="mensagem">{mensagem}</p>
      )}
    </div>
  );
};

export default ExcProduto;
