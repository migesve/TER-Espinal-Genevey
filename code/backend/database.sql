CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    statut VARCHAR(30) NOT NULL,
    cohorte VARCHAR(30) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp 
    
);

INSERT INTO users (username, passhash, email, statut, cohorte) VALUES ('admin', 'root', 'test@test.com', 'admin', 'admin');