-- Criar uma tabela com o nome usuarios
create table usuarios (
	id int auto_increment primary key, -- ID UNICO
    nome varchar(120) not null, -- NOME
    email varchar(140) not null,
    idade varchar(20),
    endereco varchar(200)
);

INSERT INTO usuarios (nome, email, idade, endereco) VALUE
('Maria Madalena', 'mada@usuario.com.br', '66', 'Rua X'),
('Caique', 'caca@usuarios.com.br', '20', 'Rua sem fim'),
('Karla Maria', 'kama@usuarios.com.br', '22', 'Rua ali'),
('Tom Maier', 'tomtom@usuarios.com.br', '50', 'Rua Caramba'),
('Camila', 'cami@usuario.com.br', '23', 'Rua dois'),
('Mario', 'mario@usuarios.com.br', '56', 'Rua casamento'),
('Josefa Campos', 'josefa@usuarios.com.br', '15', 'Rua Março'),
('Luiz Carlos', 'lulu@usuarios.com.br', '68', 'Rua Alameda sem fim'),
('Samantha', 'sasa@usuarios.com.br', '40', 'Rua sentada'),
('Roberto', 'roro@usuarios.com.br', '80', 'Rua não sei');

select * from usuarios;

drop table usuarios;

drop database sistema_produtos;