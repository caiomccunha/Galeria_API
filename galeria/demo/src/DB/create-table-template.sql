use banco_imagens;

CREATE TABLE imagens(  
    id BIGINT primary key AUTO_INCREMENT not null unique,
    name varchar (400) not null, 
    url TEXT
) 