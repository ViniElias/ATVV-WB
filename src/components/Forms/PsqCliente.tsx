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
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-sky-900 text-white">
                            <th className="px-4 py-3 text-left">NCM</th>
                            <th className="px-4 py-3 text-left">Nome</th>
                            <th className="px-4 py-3 text-left">País</th>
                            <th className="px-4 py-3 text-left">Via</th>
                            <th className="px-4 py-3 text-left">Valor Agregado</th>
                            <th className="px-4 py-3 text-left">Peso (Kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td className="px-4 py-2">teste</td>
                        <td className="px-4 py-2">teste</td>
                        <td className="px-4 py-2">teste</td>
                        <td className="px-4 py-2">teste</td>
                        <td className="px-4 py-2">teste</td>
                        <td className="px-4 py-2">teste</td>
                    </tbody>
                </table>
            </div>
        );
    };
};