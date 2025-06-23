import { ChangeEvent, FormEvent, useState } from "react";
import "./Form.css";

const Compra = () => {
    const [idCliente, setIdCliente] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [idServico, setIdServico] = useState('');
    const [qtdProduto, setQtdProduto] = useState('');
    const [qtdServico, setQtdServico] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case 'idCliente':
                setIdCliente(value);
                break;
            case 'idProduto':
                setIdProduto(value);
                break;
            case 'idServico':
                setIdServico(value);
                break;
            case 'qtdProduto':
                setQtdProduto(value);
                break;
            case 'qtdServico':
                setQtdServico(value);
                break;
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/clientes/registrarCompra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idCliente,
                    idProduto,
                    idServico,
                    qtdProduto,
                    qtdServico,
                })
            });

            if (response.ok) {
                setMensagem('Compra realizada com sucesso!');
                setIdCliente('');
                setIdProduto('');
                setIdServico('');
                setQtdProduto('');
                setQtdServico('');
            } else {
                const erro = await response.json();
                setMensagem('Erro ao cadastrar: ' + erro.message);
            }
        } catch (err) {
            console.error('Erro ao cadastrar compra:', err);
            setMensagem('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="form">
            <h3>Comprar</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="idCliente">ID do Cliente</label>
                <input
                    type="text" id="idCliente" name="idCliente"
                    value={idCliente} onChange={handleChange}
                    required maxLength={2}
                    title="Apenas números são permitidos"
                />

                <label htmlFor="idProduto">ID do Produto</label>
                <input
                    type="text" id="idProduto" name="idProduto"
                    value={idProduto} onChange={handleChange}
                    required maxLength={2}
                    title="Apenas números são permitidos"
                />

                <label htmlFor="qtdProduto">Quantidade do produto</label>
                <input
                    type="number" id="qtdProduto" name="qtdProduto"
                    value={qtdProduto} onChange={handleChange}
                    required maxLength={2}
                />

                <label htmlFor="idServico">ID do Serviço</label>
                <input
                    type="text" id="idServico" name="idServico"
                    value={idServico} onChange={handleChange}
                    required maxLength={2}
                    title="Apenas números são permitidos"
                />

                <label htmlFor="qtdServico">Quantidade do Serviço</label>
                <input
                    type="number" id="qtdServico" name="qtdServico"
                    value={qtdServico} onChange={handleChange}
                    required
                />
                <button type="submit">Comprar</button>
            </form>

            {mensagem && (
                <p className="mensagem">{mensagem}</p>
            )}
        </div>
    );
};

export default Compra;