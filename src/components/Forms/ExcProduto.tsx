import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const ExcProduto = () => {
  const [id, setId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setId(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setId('');
    setMensagem('Produto excluído com sucesso!');
  };

  return (
    <div className="form">
      <h3>Excluir</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID</label>
        <input
          type="text" id="id" name="id"
          value={id} onChange={handleChange}
          required pattern="\d{11}" maxLength={3}
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
