import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const CadCliente = () => {
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [genero, setGenero] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'nome':
        setNome(value);
        break;
      case 'nomeSocial':
        setNomeSocial(value);
        break;
      case 'genero':
        setGenero(value);
        break;
      case 'cpf':
        setCpf(value);
        break;
      case 'rg':
        setRg(value);
        break;
      case 'telefone':
        setTelefone(value);
        break;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/clientes/cadastrarCliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          nomesocial: nomeSocial,
          genero,
          cpf,
          rg,
          telefone
        })
      });

      if (response.ok) {
        setMensagem('Cliente cadastrado com sucesso!');
        setNome('');
        setNomeSocial('');
        setGenero('');
        setCpf('');
        setRg('');
        setTelefone('');
      } else {
        const erro = await response.json();
        setMensagem('Erro ao cadastrar: ' + erro.message);
      }
    } catch (err) {
      console.error('Erro ao cadastrar cliente:', err);
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

        <label htmlFor="nomeSocial">Nome social</label>
        <input
          type="text" id="nomeSocial" name="nomeSocial"
          value={nomeSocial} onChange={handleChange}
          required pattern="[A-Za-zÀ-ÿ\s]+"
          title="Apenas letras e espaços são permitidos"
        />

        <fieldset id="fieldGenero">
          <legend>Gênero</legend>
          <div>
            <input type="radio" id="masculino" name="genero" value="M" checked={genero === 'M'} onChange={handleChange} required />
            <label htmlFor="masculino">Masculino</label>
          </div>
          <div>
            <input type="radio" id="feminino" name="genero" value="F" checked={genero === 'F'} onChange={handleChange} required />
            <label htmlFor="feminino">Feminino</label>
          </div>
        </fieldset>

        <label htmlFor="cpf">CPF</label>
        <input
          type="text" id="cpf" name="cpf"
          value={cpf} onChange={handleChange}
          required pattern="\d{11}" maxLength={11}
          title="Apenas números são aceitos."
        />

        <label htmlFor="rg">RG</label>
        <input
          type="text" id="rg" name="rg"
          value={rg} onChange={handleChange}
          required pattern="\d{9}" maxLength={9}
          title="Apenas números são aceitos."
        />

        <label htmlFor="telefone">Telefone</label>
        <input
          type="text" id="telefone" name="telefone"
          value={telefone} onChange={handleChange}
          required pattern="\d{11}" maxLength={11}
          title="Apenas números são aceitos."
        />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && (
        <p className="mensagem">{mensagem}</p>
      )}
    </div>
  );
};

export default CadCliente;
