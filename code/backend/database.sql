CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    statut VARCHAR(30) NOT NULL,
    cohorte VARCHAR(30) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp 
    
);

INSERT INTO users (username, passhash, email, statut, cohorte) VALUES ('AdminRoot', 'rootroot', 'test@test.com', 'Admin', 'Admin');

CREATE TABLE sets (
    position_id SERIAL PRIMARY KEY,
    nom VARCHAR(60) NOT NULL UNIQUE,
    abreviation VARCHAR(10) NOT NULL UNIQUE,
    descriptif VARCHAR(255),
    angle1 SMALLINT NOT NULL UNIQUE,
    angle2 SMALLINT NOT NULL UNIQUE,
    schema1_tete VARCHAR(255) NOT NULL,
    schema1_bassin VARCHAR(255) NOT NULL,
    schema1_fontanelle VARCHAR(255) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);

CREATE TABLE schema3 (
    schema3_id SERIAL PRIMARY KEY,
    image_name VARCHAR(80) NOT NULL UNIQUE,
    image_path VARCHAR(255) NOT NULL UNIQUE,
    position_id SMALLINT NOT NULL,
    inclinaison_id SMALLINT NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);

CREATE TABLE schema4 (
    schema4_id SERIAL PRIMARY KEY,
    image_name VARCHAR(80) NOT NULL UNIQUE,
    image_path VARCHAR(255) NOT NULL UNIQUE,
    position_id SMALLINT NOT NULL,
    inclinaison_id SMALLINT NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);

CREATE TABLE inclinaisons (
    inclinaison_id SERIAL PRIMARY KEY,
    label VARCHAR(30) NOT NULL UNIQUE,
    degres_min SMALLINT NOT NULL UNIQUE,
    degres_max SMALLINT NOT NULL UNIQUE,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);