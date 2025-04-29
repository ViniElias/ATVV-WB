import { ChangeEvent, Component, FormEvent } from "react";
import "./Form.css"

type State = {
    nome: string;
    nomeSocial: string;
    genero: string;
    numeroCpf: string;
    dataCpf: string;
};

export default class FormCadastro extends Component<{}, State> {
    state: State = {
        nome: '',
        nomeSocial: '',
        genero: '',
        numeroCpf: '',
        dataCpf: ''
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        this.setState({[name]: value} as Pick<State, keyof State>);
    };

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();

    };
    render() {
        const {nome, nomeSocial, genero, numeroCpf, dataCpf} = this.state;

        return (
            <div className="form">
                <h3>Cadastrar</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" name="nome" value={nome} onChange={this.handleChange} required/>

                    <label htmlFor="nomeSocial">Nome social</label>
                    <input type="text" id="nomeSocial" name="nomeSocial" value={nomeSocial} onChange={this.handleChange} required/>

                    <p>Gênero</p>
                    <label htmlFor="nome">Masculino</label>
                    <input type="radio" id="masculino" name="genero" value="Masculino" checked={genero === 'Masculino'} onChange={this.handleChange} required/>
                    <label htmlFor="nome">Feminino</label>
                    <input type="radio" id="feminino" name="genero" value="Feminino"  checked={genero === 'Feminino'} onChange={this.handleChange} required/>

                    <h4>CPF</h4>
                    <label htmlFor="cpf">Número</label>
                    <input type="text" id="numeroCpf" name="numeroCpf" value={numeroCpf} onChange={this.handleChange} required/>
                    <label htmlFor="nome">Data de emissão</label>
                    <input type="date" id="dataCpf" name="dataCpf" value={dataCpf} onChange={this.handleChange} required/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    };
};