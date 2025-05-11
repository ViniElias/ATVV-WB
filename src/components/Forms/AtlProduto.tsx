import { ChangeEvent, Component, FormEvent } from "react";
import "./Form.css"

type State = {
    id: string,
    nome: string;
    preco: string,
    mensagem: string;
};

export default class AtlProduto extends Component<{}, State> {
    state: State = {
        id: '',
        nome: '',
        preco: '',
        mensagem: ''
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        this.setState({
            id: '',
            nome: '',
            preco: '',
            mensagem: 'Produto atualizado com sucesso!'
        });
    };
    render() {
        const { id, nome, preco } = this.state;

        return (
            <div className="form">
                <h3>Atualizar</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="id">ID</label>
                    <input
                        type="text" id="id" name="id"
                        value={id} onChange={this.handleChange}
                        required pattern="\d{3}" maxLength={3}
                        title="Apenas números são aceitos."
                    />
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text" id="nome" name="nome"
                        value={nome} onChange={this.handleChange}
                        required pattern="[A-Za-zÀ-ÿ\s]+"
                        title="Apenas letras e espaços são permitidos"
                    />

                    <label htmlFor="preco">Preço (R$)</label>
                    <input
                        type="number" id="preco" name="preco"
                        value={preco} onChange={this.handleChange}
                        required step="any" min="0"
                        title="Valor inválido."
                    />

                    <button type="submit">Atualizar</button>
                </form>
                {this.state.mensagem && (
                    <p className="mensagem">{this.state.mensagem}</p>
                )}
            </div>
        );
    };
};