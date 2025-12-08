-- Cria o banco de dados onde vamos criar
create database copa_mundo;

use copa_mundo;

-- Cria a tabela seleçoes com 3 colunas
create table selecoes(
	id int auto_increment primary key,
    selecoes varchar(100) not null,
    grupo char(1) not null
);

INSERT INTO selecoes(selecoes, grupo) VALUES
('Brasil', 'A'),
('França', 'B'),
('Ilhas Solomão', 'C'),
('Nigeria', 'D'),
('Nova Zelandia', 'E'),
('Japão', 'C'),
('Croacia', 'B'),
('Mexico', 'E');

select * from selecoes;