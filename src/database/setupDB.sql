CREATE DATABASE IF NOT EXISTS WorldBeauty;
USE WorldBeauty;

CREATE TABLE Clientes (
    id INT AUTO_INCREMENT KEY,
    nome VARCHAR(100),
    nomeSocial VARCHAR(100),
    genero VARCHAR(1),
    cpf VARCHAR(11) UNIQUE,
    rg VARCHAR(9) UNIQUE,
    telefone VARCHAR(15) UNIQUE
);

CREATE TABLE Produtos (
    id INT AUTO_INCREMENT KEY,
    nome VARCHAR(50),
    preco INT
);

CREATE TABLE Servicos (
    id INT AUTO_INCREMENT KEY,
    nome VARCHAR(50),
    preco INT
);

CREATE TABLE ClientesProdutos (
    idCliente INT,
    idProduto INT,
    quantidade INT,
    PRIMARY KEY (idCliente, idProduto),
    FOREIGN KEY (idCliente) REFERENCES Clientes(id),
    FOREIGN KEY (idProduto) REFERENCES Produtos(id)
);

CREATE TABLE ClientesServicos (
    idCliente INT,
    idServico INT,
    quantidade INT,
    PRIMARY KEY (idCliente, idServico),
    FOREIGN KEY (idCliente) REFERENCES Clientes(id),
    FOREIGN KEY (idServico) REFERENCES Servicos(id)
);