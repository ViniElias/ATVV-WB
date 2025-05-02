import { ChangeEvent, Component, FormEvent } from "react";
import "./Form.css"

type State = {
    nome: string;
    nomeSocial: string;
    genero: string;
    numeroCpf: string;
    dataCpf: string;
    mensagem: string;
};

export default class PsqCliente extends Component<{}, State> {
    state: State = {
        nome: '',
        nomeSocial: '',
        genero: '',
        numeroCpf: '',
        dataCpf: '',
        mensagem: ''
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        this.setState({
            nome: '',
            nomeSocial: '',
            genero: '',
            numeroCpf: '',
            dataCpf: '',
            mensagem: 'Resultado da pesquisa:'
        });
    };
    render() {
        const { nome, nomeSocial, genero, numeroCpf, dataCpf } = this.state;

        return (
            <div className="form">
                <h3>Pesquisar</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text" id="nome" name="nome"
                        value={nome} onChange={this.handleChange}
                        required pattern="[A-Za-zÀ-ÿ\s]+"
                        title="Apenas letras e espaços são permitidos"
                    />

                    <label htmlFor="nomeSocial">Nome social</label>
                    <input
                        type="text" id="nomeSocial" name="nomeSocial"
                        value={nomeSocial} onChange={this.handleChange}
                        required pattern="[A-Za-zÀ-ÿ\s]+"
                        title="Apenas letras e espaços são permitidos"
                    />

                    <fieldset id="fieldGenero">
                        <legend>Gênero</legend>
                        <div>
                            <input type="radio" id="masculino" name="genero" value="Masculino" checked={genero === 'Masculino'} onChange={this.handleChange} required />
                            <label htmlFor="nome">Masculino</label>
                        </div>
                        <div>
                            <input type="radio" id="feminino" name="genero" value="Feminino" checked={genero === 'Feminino'} onChange={this.handleChange} required />
                            <label htmlFor="nome">Feminino</label>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>CPF</legend>
                        <div className="cpfGroup">
                            <div>
                                <label htmlFor="cpf">Número </label>
                                <input
                                    type="text" id="numeroCpf" name="numeroCpf"
                                    value={numeroCpf} onChange={this.handleChange}
                                    required pattern="\d{11}" maxLength={11}
                                    title="Apenas números são aceitos."
                                />
                            </div>
                            <div>
                                <label htmlFor="nome">Data de emissão </label>
                                <input
                                    type="date" id="dataCpf" name="dataCpf"
                                    value={dataCpf} onChange={this.handleChange} required
                                    min="1925-01-01" max={new Date().toISOString().split('T')[0]} />
                            </div>
                        </div>
                    </fieldset>

                    <button type="submit">Pesquisar</button>
                </form>
                {this.state.mensagem && (
                    <p className="mensagem">{this.state.mensagem}</p>
                )}
            </div>
        );
    };
};