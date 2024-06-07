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
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);

CREATE TABLE schema3 (
    schema3_id SERIAL PRIMARY KEY,
    image_name VARCHAR(80) NOT NULL UNIQUE,
    image_path VARCHAR(255) NOT NULL UNIQUE,
    position_id SMALLINT NOT NULL,
    inclinaison_id SMALLINT NOT NULL,
    angle SMALLINT NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);

CREATE TABLE schema4 (
    schema4_id SERIAL PRIMARY KEY,
    image_name VARCHAR(80) NOT NULL UNIQUE,
    image_path VARCHAR(255) NOT NULL UNIQUE,
    position_id SMALLINT NOT NULL,
    inclinaison_id SMALLINT NOT NULL,
    angle SMALLINT NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);

CREATE TABLE inclinaisons (
    inclinaison_id SERIAL PRIMARY KEY,
    label VARCHAR(30) NOT NULL UNIQUE,
    degres_min SMALLINT NOT NULL UNIQUE,
    degres_max SMALLINT NOT NULL UNIQUE,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);

CREATE TABLE reponses (
    reponse_id SERIAL PRIMARY KEY,
    user_id SMALLINT NOT NULL,
    position_id SMALLINT NOT NULL,
    inclinaison_id SMALLINT NOT NULL,
    ennonce SMALLINT NOT NULL,
    nom VARCHAR(60) NOT NULL,
    abreviation VARCHAR(10) NOT NULL,
    schema1_angle SMALLINT NOT NULL,
    schema1_inclinaison SMALLINT NOT NULL,
    schema2_angle SMALLINT NOT NULL,
    schema2_inclinaison SMALLINT NOT NULL,
    schema3_id SMALLINT NOT NULL,
    schema4_id SMALLINT NOT NULL,
    corr_nom BOOLEAN NOT NULL DEFAULT TRUE,
    corr_abreviation BOOLEAN NOT NULL DEFAULT TRUE,
    corr_schema1_angle BOOLEAN NOT NULL DEFAULT TRUE,
    corr_schema1_inclinaison BOOLEAN NOT NULL DEFAULT TRUE,
    corr_schema2_angle BOOLEAN NOT NULL DEFAULT TRUE,
    corr_schema2_inclinaison BOOLEAN NOT NULL DEFAULT TRUE,
    corr_schema3_id BOOLEAN NOT NULL DEFAULT TRUE,
    corr_schema4_id BOOLEAN NOT NULL DEFAULT TRUE,
    remarque_nom VARCHAR(60),
    remarque_abreviation VARCHAR(60),
    remarque_schema1_angle VARCHAR(60),
    remarque_schema1_inclinaison VARCHAR(60),
    remarque_schema2_angle VARCHAR(60),
    remarque_schema2_inclinaison VARCHAR(60),
    remarque_schema3_id VARCHAR(60),
    remarque_schema4_id VARCHAR(60),
    difficulte SMALLINT NOT NULL DEFAULT 1,
    created_at timestamp with time zone NOT NULL DEFAULT current_timestamp
);