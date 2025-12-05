create database supermercados;

use supermercados;

create table usuarios (
	id int auto_increment primary key, -- ID UNICO
    nome varchar(50) not null,
    usuario varchar(50) not null, -- NOME
    senha varchar(50) not null
);

INSERT INTO usuarios(nome, usuario, senha) VALUES
('Rodrigo Terribas Saraiva', 'terribas', 'terribas123'),
('Marcela Campos', 'marcelacampos', 'campos321');

select * from usuarios;

create table cadastro (
	id int auto_increment primary key, -- ID UNICO
    produto varchar(20) not null, -- NOME
    preco varchar(10) not null
);

INSERT INTO cadastro(produto, preco) VALUES
('Patinho', 'R$ 45,00 kg'),
('Arroz Namorado', 'R$ 20,00 5kg');

ALTER TABLE cadastro MODIFY preco VARCHAR(30);

select * from cadastro;

CREATE TABLE dados_pessoais (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID ÚNICO
    nome VARCHAR(50) NOT NULL,          -- NOME
    idade INT,                          -- IDADE (número)
    cpf VARCHAR(14),                    -- FORMATO: 000.000.000-00
    telefone VARCHAR(20),               -- ACEITA DDD E TRAÇOS
    email VARCHAR(100),                 -- E-MAILS COSTUMAM SER MAIORES
    endereco VARCHAR(110)               -- CORRIGIDO: tirar acento do nome da coluna
);

INSERT INTO dados_pessoais(nome, idade, cpf, telefone, email, endereco) VALUES
('Rodrigo Terribas Saraiva', '35', '411.281.358-92', '(11) 97681-7558', 'terribas@supermercados.com.br', 'Rua casamento'),
('Marcela Campos', '50', '444.585.363-55', '(11) 96658-5858', 'campos@supermercados.com.br', 'Rua farofa');

select * from dados_pessoais;