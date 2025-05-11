import { ChangeEvent, Component, FormEvent } from "react";
import "./Form.css"

type State = {
    id: string;
    mensagem: string;
};

export default class ExcServico extends Component<{}, State> {
    state: State = {
        id: '',
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
            mensagem: 'Serviço excluído com sucesso!'
        });
    };

    render() {
        const { id } = this.state;

        return (
            <div className="form">
                <h3>Excluir</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="id">ID</label>
                    <input
                        type="text" id="id" name="id"
                        value={id} onChange={this.handleChange}
                        required pattern="\d{3}" maxLength={3}
                        title="Apenas números são aceitos."
                    />
                    <button type="submit">Excluir</button>
                </form>
                {this.state.mensagem && (
                    <p className="mensagem">{this.state.mensagem}</p>
                )}
            </div>
        );
    };
};