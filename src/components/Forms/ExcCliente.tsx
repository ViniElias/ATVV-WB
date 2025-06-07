import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const ExcCliente = () => {
  const [cpf, setCpf] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCpf(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCpf('');
    setMensagem('Cliente excluído com sucesso!');
  };

  return (
    <div className="form">
      <h3>Excluir</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cpf">CPF</label>
        <input
          type="text" id="cpf" name="cpf"
          value={cpf} onChange={handleChange}
          required pattern="\d{11}" maxLength={11}
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

export default ExcCliente;
