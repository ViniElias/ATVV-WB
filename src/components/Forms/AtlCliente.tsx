import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const AtlCliente = () => {
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [genero, setGenero] = useState('');
    const [numeroCpf, setNumeroCpf] = useState('');
    const [dataCpf, setDataCpf] = useState('');
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
            case 'numeroCpf':
                setNumeroCpf(value);
                break;
            case 'dataCpf':
                setDataCpf(value);
                break;
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        setNome('');
        setNomeSocial('');
        setGenero('');
        setNumeroCpf('');
        setDataCpf('');
        setMensagem('Cliente atualizado com sucesso!');
    };

    return (
        <div className="form">
            <h3>Atualizar</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cpf">CPF</label>
                <input
                    type="text" id="numeroCpf" name="numeroCpf"
                    value={numeroCpf} onChange={handleChange}
                    required pattern="\d{11}" maxLength={11}
                    title="Apenas números são aceitos."
                />

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
                        <input
                            type="radio" id="masculino" name="genero" value="Masculino"
                            checked={genero === 'Masculino'} onChange={handleChange} required
                        />
                        <label htmlFor="masculino">Masculino</label>
                    </div>
                    <div>
                        <input
                            type="radio" id="feminino" name="genero" value="Feminino"
                            checked={genero === 'Feminino'} onChange={handleChange} required
                        />
                        <label htmlFor="feminino">Feminino</label>
                    </div>
                </fieldset>

                <button type="submit">Atualizar</button>
            </form>

            {mensagem && (
                <p className="mensagem">{mensagem}</p>
            )}
        </div>
    );
};

export default AtlCliente;