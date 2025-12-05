-- Cria o banco de dados onde vamos criar
create database sistema_produtos;

use sistema_produtos;

-- Cria a tabela produtos com algumas colunas basicas
create table produtos(
	id int auto_increment primary key, -- ID UNICO
    nome varchar(100) not null, -- NOME PRODUTO
    email varchar(120) not null, -- EMAIL (EXEMPLO GENÉRICO)
    telefone varchar(20), -- TELEFONE
    cpf varchar(14), -- CPF
    endereco varchar(150) -- ENDEREÇO SIMPLES
);

-- Insere dois registros
insert into produtos (nome, email, telefone, cpf, endereco) value
	('Eduardo Ramos', 'edu.ramos@produtos.com', '125245452-2525', '54545454782178', 'Rua Orutos F'),
    ('Juliana Clara', 'juliana@produtos.com', '214531654561245', '4537456486456', 'Rua Orutos');
    
-- Seleciona o registro onde o ID = 1
select * from produtos where id = 2;
select * from produtos where id = 1;

-- Delete o registro onde o id=1
delete from produtos where id=1;

-- Inserir mais 1 registo
INSERT INTO produtos (nome, email, telefone, cpf, endereco) VALUE
('Zeze Campos', 'zezecampos@produtos.com', '11968546452', '25448187585485', 'João Campos'),
('Rodrigo Campo', 'rorocampos@produtos.com', '119685454558', '254481875858', 'Rua dos Bobos');

delete from produtos where id=4;

-- Atuliza o nome onde o id=3;
update produtos 
set nome = 'Zeze Campos Dev'
where id=3;

select * from produtos;