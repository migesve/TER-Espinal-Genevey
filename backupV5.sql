toc.dat                                                                                             0000600 0004000 0002000 00000037266 14627564466 0014501 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP                       |           maieutiquedb    16.2    16.2 4    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    16414    maieutiquedb    DATABASE        CREATE DATABASE maieutiquedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE maieutiquedb;
                AdminMaieutique    false         �            1259    16501    inclinaisons    TABLE       CREATE TABLE public.inclinaisons (
    inclinaison_id integer NOT NULL,
    label character varying(30) NOT NULL,
    degres_min smallint NOT NULL,
    degres_max smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.inclinaisons;
       public         heap    AdminMaieutique    false         �            1259    16505    inclinaisons_inclinaison_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inclinaisons_inclinaison_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.inclinaisons_inclinaison_id_seq;
       public          AdminMaieutique    false    215         �           0    0    inclinaisons_inclinaison_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.inclinaisons_inclinaison_id_seq OWNED BY public.inclinaisons.inclinaison_id;
          public          AdminMaieutique    false    216         �            1259    16506    schema3    TABLE     R  CREATE TABLE public.schema3 (
    schema3_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint NOT NULL
);
    DROP TABLE public.schema3;
       public         heap    AdminMaieutique    false         �            1259    16510    schema3_schema3_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schema3_schema3_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.schema3_schema3_id_seq;
       public          AdminMaieutique    false    217         �           0    0    schema3_schema3_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema3_schema3_id_seq OWNED BY public.schema3.schema3_id;
          public          AdminMaieutique    false    218         �            1259    16511    schema4    TABLE     I  CREATE TABLE public.schema4 (
    schema4_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint
);
    DROP TABLE public.schema4;
       public         heap    AdminMaieutique    false         �            1259    16515    schema4_schema4_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schema4_schema4_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.schema4_schema4_id_seq;
       public          AdminMaieutique    false    219         �           0    0    schema4_schema4_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema4_schema4_id_seq OWNED BY public.schema4.schema4_id;
          public          AdminMaieutique    false    220         �            1259    16516    sets    TABLE     F  CREATE TABLE public.sets (
    position_id integer NOT NULL,
    nom character varying(60) NOT NULL,
    abreviation character varying(10) NOT NULL,
    descriptif character varying(255),
    angle1 smallint NOT NULL,
    angle2 smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.sets;
       public         heap    AdminMaieutique    false         �            1259    16520    sets_position_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sets_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.sets_position_id_seq;
       public          AdminMaieutique    false    221         �           0    0    sets_position_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.sets_position_id_seq OWNED BY public.sets.position_id;
          public          AdminMaieutique    false    222         �            1259    16521    users    TABLE     Z  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    passhash character varying NOT NULL,
    email character varying(50) NOT NULL,
    statut character varying(30) NOT NULL,
    cohorte character varying(30) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap    AdminMaieutique    false         �            1259    16527    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          AdminMaieutique    false    223         �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          AdminMaieutique    false    224         .           2604    16528    inclinaisons inclinaison_id    DEFAULT     �   ALTER TABLE ONLY public.inclinaisons ALTER COLUMN inclinaison_id SET DEFAULT nextval('public.inclinaisons_inclinaison_id_seq'::regclass);
 J   ALTER TABLE public.inclinaisons ALTER COLUMN inclinaison_id DROP DEFAULT;
       public          AdminMaieutique    false    216    215         0           2604    16529    schema3 schema3_id    DEFAULT     x   ALTER TABLE ONLY public.schema3 ALTER COLUMN schema3_id SET DEFAULT nextval('public.schema3_schema3_id_seq'::regclass);
 A   ALTER TABLE public.schema3 ALTER COLUMN schema3_id DROP DEFAULT;
       public          AdminMaieutique    false    218    217         2           2604    16530    schema4 schema4_id    DEFAULT     x   ALTER TABLE ONLY public.schema4 ALTER COLUMN schema4_id SET DEFAULT nextval('public.schema4_schema4_id_seq'::regclass);
 A   ALTER TABLE public.schema4 ALTER COLUMN schema4_id DROP DEFAULT;
       public          AdminMaieutique    false    220    219         4           2604    16531    sets position_id    DEFAULT     t   ALTER TABLE ONLY public.sets ALTER COLUMN position_id SET DEFAULT nextval('public.sets_position_id_seq'::regclass);
 ?   ALTER TABLE public.sets ALTER COLUMN position_id DROP DEFAULT;
       public          AdminMaieutique    false    222    221         6           2604    16532    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          AdminMaieutique    false    224    223         �          0    16501    inclinaisons 
   TABLE DATA           a   COPY public.inclinaisons (inclinaison_id, label, degres_min, degres_max, created_at) FROM stdin;
    public          AdminMaieutique    false    215       4843.dat �          0    16506    schema3 
   TABLE DATA           u   COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
    public          AdminMaieutique    false    217       4845.dat �          0    16511    schema4 
   TABLE DATA           u   COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
    public          AdminMaieutique    false    219       4847.dat �          0    16516    sets 
   TABLE DATA           e   COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM stdin;
    public          AdminMaieutique    false    221       4849.dat �          0    16521    users 
   TABLE DATA           [   COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM stdin;
    public          AdminMaieutique    false    223       4851.dat             0    0    inclinaisons_inclinaison_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.inclinaisons_inclinaison_id_seq', 2, true);
          public          AdminMaieutique    false    216                    0    0    schema3_schema3_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.schema3_schema3_id_seq', 11, true);
          public          AdminMaieutique    false    218                    0    0    schema4_schema4_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.schema4_schema4_id_seq', 10, true);
          public          AdminMaieutique    false    220                    0    0    sets_position_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sets_position_id_seq', 5, true);
          public          AdminMaieutique    false    222                    0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 9, true);
          public          AdminMaieutique    false    224         9           2606    16534 (   inclinaisons inclinaisons_degres_max_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_max_key UNIQUE (degres_max);
 R   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_degres_max_key;
       public            AdminMaieutique    false    215         ;           2606    16536 (   inclinaisons inclinaisons_degres_min_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_min_key UNIQUE (degres_min);
 R   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_degres_min_key;
       public            AdminMaieutique    false    215         =           2606    16538 #   inclinaisons inclinaisons_label_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_label_key UNIQUE (label);
 M   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_label_key;
       public            AdminMaieutique    false    215         ?           2606    16540    inclinaisons inclinaisons_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_pkey PRIMARY KEY (inclinaison_id);
 H   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_pkey;
       public            AdminMaieutique    false    215         A           2606    16542    schema3 schema3_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_name_key;
       public            AdminMaieutique    false    217         C           2606    16544    schema3 schema3_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_path_key;
       public            AdminMaieutique    false    217         E           2606    16546    schema3 schema3_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_pkey PRIMARY KEY (schema3_id);
 >   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_pkey;
       public            AdminMaieutique    false    217         G           2606    16548    schema4 schema4_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_name_key;
       public            AdminMaieutique    false    219         I           2606    16550    schema4 schema4_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_path_key;
       public            AdminMaieutique    false    219         K           2606    16552    schema4 schema4_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_pkey PRIMARY KEY (schema4_id);
 >   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_pkey;
       public            AdminMaieutique    false    219         M           2606    16554    sets sets_abreviation_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_abreviation_key UNIQUE (abreviation);
 C   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_abreviation_key;
       public            AdminMaieutique    false    221         O           2606    16556    sets sets_angle1_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle1_key UNIQUE (angle1);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle1_key;
       public            AdminMaieutique    false    221         Q           2606    16558    sets sets_angle2_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle2_key UNIQUE (angle2);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle2_key;
       public            AdminMaieutique    false    221         S           2606    16560    sets sets_nom_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_nom_key UNIQUE (nom);
 ;   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_nom_key;
       public            AdminMaieutique    false    221         U           2606    16562    sets sets_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (position_id);
 8   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_pkey;
       public            AdminMaieutique    false    221         W           2606    16564    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            AdminMaieutique    false    223         Y           2606    16566    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            AdminMaieutique    false    223         [           2606    16568    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            AdminMaieutique    false    223                                                                                                                                                                                                                                                                                                                                                  4843.dat                                                                                            0000600 0004000 0002000 00000000161 14627564466 0014276 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	peu flèchie	15	30	2024-05-24 10:43:07.656349+02
2	fortement flèchie 	0	14	2024-05-24 10:43:41.276715+02
\.


                                                                                                                                                                                                                                                                                                                                                                                                               4845.dat                                                                                            0000600 0004000 0002000 00000001434 14627564466 0014304 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	schema3OSIncl	src/images/schema3/P1I2.PNG	1	2	2024-05-24 10:42:13.058178+02	0
2	schema3OS	src/images/schema3/P1I1.PNG	1	1	2024-05-24 14:02:44.140495+02	0
3	schema3OIDP	src/images/schema3/P2I1.PNG	2	1	2024-05-24 14:04:20.336677+02	45
4	schemaOIDPIncl	src/images/schema3/P2I2.PNG	2	2	2024-05-24 14:05:21.686089+02	45
6	schema3OIDT	src/images/schema3/P3I1.PNG	3	1	2024-05-27 17:32:23.449649+02	90
7	schemaOIDA	src/images/schema3/P4I1.PNG	4	1	2024-05-27 17:33:32.688832+02	135
8	schemaOP	src/images/schema3/P5I1.PNG	5	1	2024-05-27 17:34:47.926608+02	180
9	schemaOIGA	src/images/schema3/P6I1.PNG	6	1	2024-05-27 17:37:19.694252+02	225
10	schemaOIGT	src/images/schema3/P7I1.PNG	7	1	2024-05-27 17:37:19.694252+02	270
11	schemaOIGP	src/images/schema3/P8I1.PNG	8	1	2024-05-27 17:38:05.696597+02	315
\.


                                                                                                                                                                                                                                    4847.dat                                                                                            0000600 0004000 0002000 00000001433 14627564466 0014305 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	schema4OS	src/images/schema3/P1I1.PNG	1	1	2024-05-24 10:40:42.684658+02	0
2	schema3OSIncl	src/images/schema3/P1I2.PNG	1	2	2024-05-27 11:04:41.376702+02	0
3	schema3OIDP	src/images/schema3/P2I1.PNG	2	1	2024-05-27 11:06:31.657904+02	45
4	schemaOIDPIncl	src/images/schema3/P2I2.PNG	2	2	2024-05-27 11:07:36.404611+02	45
5	schema3OIDT	src/images/schema3/P3I1.PNG	3	1	2024-05-27 17:32:23.449649+02	90
6	schemaOIDA	src/images/schema3/P4I1.PNG	4	1	2024-05-27 17:33:32.688832+02	135
7	schemaOP	src/images/schema3/P5I1.PNG	5	1	2024-05-27 17:34:47.926608+02	180
8	schemaOIGT	src/images/schema3/P7I1.PNG	7	1	2024-05-27 17:37:19.694252+02	270
9	schemaOIGA	src/images/schema3/P6I1.PNG	6	1	2024-05-27 17:37:19.694252+02	225
10	schemaOIGP	src/images/schema3/P8I1.PNG	8	1	2024-05-27 17:38:05.696597+02	315
\.


                                                                                                                                                                                                                                     4849.dat                                                                                            0000600 0004000 0002000 00000001245 14627564466 0014310 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Occipito-iliaque droite postérieure	OIDP	desc OIDP	6	84	2024-05-23 12:03:54.132418+02
3	Occipito-iliaque droite transverse	OIDT	desc OIDT	85	95	2024-05-23 12:08:28.115344+02
4	Occipito-iliaque droite antérieure	OIDA	desc OIDA	96	174	2024-05-23 12:08:28.115344+02
6	Occipito-iliaque gauche antérieure	OIGA	desc OIGA	186	264	2024-05-23 12:08:28.115344+02
7	Occipito-iliaque gauche transverse	OIGT	desc OIGT	265	275	2024-05-23 12:08:28.115344+02
8	Occipito-iliaque gauche postérieure	OIGP	desc OIGP	276	354	2024-05-23 12:09:23.280798+02
1	Occipito-sacré	OS	desc OS	355	5	2024-05-24 10:31:50.944227+02
5	Occipito-pubien	OP	desc OP	175	185	2024-05-24 10:33:38.645735+02
\.


                                                                                                                                                                                                                                                                                                                                                           4851.dat                                                                                            0000600 0004000 0002000 00000000436 14627564466 0014302 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	miges	$2b$10$yRWOCk7ebR5XwBMLDBpCaudjJR1Kt6tzXBl.VcLDguMHBimkGszjq	miguelangelespinal@gmail.com	Admin	admin	2024-05-22 10:23:47.378434+02
9	coemgen	$2b$10$em8OPK3BoxMY9RfURdh3v.AZb4t1zc5hffwkkhyUtw3CneVJjhRBC	coemgen.genevey@laposte.net	Admin	admin	2024-05-24 10:15:48.701205+02
\.


                                                                                                                                                                                                                                  restore.sql                                                                                         0000600 0004000 0002000 00000031442 14627564466 0015414 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE maieutiquedb;
--
-- Name: maieutiquedb; Type: DATABASE; Schema: -; Owner: AdminMaieutique
--

CREATE DATABASE maieutiquedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';


ALTER DATABASE maieutiquedb OWNER TO "AdminMaieutique";

\connect maieutiquedb

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: inclinaisons; Type: TABLE; Schema: public; Owner: AdminMaieutique
--

CREATE TABLE public.inclinaisons (
    inclinaison_id integer NOT NULL,
    label character varying(30) NOT NULL,
    degres_min smallint NOT NULL,
    degres_max smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.inclinaisons OWNER TO "AdminMaieutique";

--
-- Name: inclinaisons_inclinaison_id_seq; Type: SEQUENCE; Schema: public; Owner: AdminMaieutique
--

CREATE SEQUENCE public.inclinaisons_inclinaison_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inclinaisons_inclinaison_id_seq OWNER TO "AdminMaieutique";

--
-- Name: inclinaisons_inclinaison_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: AdminMaieutique
--

ALTER SEQUENCE public.inclinaisons_inclinaison_id_seq OWNED BY public.inclinaisons.inclinaison_id;


--
-- Name: schema3; Type: TABLE; Schema: public; Owner: AdminMaieutique
--

CREATE TABLE public.schema3 (
    schema3_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint NOT NULL
);


ALTER TABLE public.schema3 OWNER TO "AdminMaieutique";

--
-- Name: schema3_schema3_id_seq; Type: SEQUENCE; Schema: public; Owner: AdminMaieutique
--

CREATE SEQUENCE public.schema3_schema3_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schema3_schema3_id_seq OWNER TO "AdminMaieutique";

--
-- Name: schema3_schema3_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: AdminMaieutique
--

ALTER SEQUENCE public.schema3_schema3_id_seq OWNED BY public.schema3.schema3_id;


--
-- Name: schema4; Type: TABLE; Schema: public; Owner: AdminMaieutique
--

CREATE TABLE public.schema4 (
    schema4_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint
);


ALTER TABLE public.schema4 OWNER TO "AdminMaieutique";

--
-- Name: schema4_schema4_id_seq; Type: SEQUENCE; Schema: public; Owner: AdminMaieutique
--

CREATE SEQUENCE public.schema4_schema4_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schema4_schema4_id_seq OWNER TO "AdminMaieutique";

--
-- Name: schema4_schema4_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: AdminMaieutique
--

ALTER SEQUENCE public.schema4_schema4_id_seq OWNED BY public.schema4.schema4_id;


--
-- Name: sets; Type: TABLE; Schema: public; Owner: AdminMaieutique
--

CREATE TABLE public.sets (
    position_id integer NOT NULL,
    nom character varying(60) NOT NULL,
    abreviation character varying(10) NOT NULL,
    descriptif character varying(255),
    angle1 smallint NOT NULL,
    angle2 smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.sets OWNER TO "AdminMaieutique";

--
-- Name: sets_position_id_seq; Type: SEQUENCE; Schema: public; Owner: AdminMaieutique
--

CREATE SEQUENCE public.sets_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sets_position_id_seq OWNER TO "AdminMaieutique";

--
-- Name: sets_position_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: AdminMaieutique
--

ALTER SEQUENCE public.sets_position_id_seq OWNED BY public.sets.position_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: AdminMaieutique
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    passhash character varying NOT NULL,
    email character varying(50) NOT NULL,
    statut character varying(30) NOT NULL,
    cohorte character varying(30) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO "AdminMaieutique";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: AdminMaieutique
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "AdminMaieutique";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: AdminMaieutique
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: inclinaisons inclinaison_id; Type: DEFAULT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.inclinaisons ALTER COLUMN inclinaison_id SET DEFAULT nextval('public.inclinaisons_inclinaison_id_seq'::regclass);


--
-- Name: schema3 schema3_id; Type: DEFAULT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema3 ALTER COLUMN schema3_id SET DEFAULT nextval('public.schema3_schema3_id_seq'::regclass);


--
-- Name: schema4 schema4_id; Type: DEFAULT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema4 ALTER COLUMN schema4_id SET DEFAULT nextval('public.schema4_schema4_id_seq'::regclass);


--
-- Name: sets position_id; Type: DEFAULT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.sets ALTER COLUMN position_id SET DEFAULT nextval('public.sets_position_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: inclinaisons; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.inclinaisons (inclinaison_id, label, degres_min, degres_max, created_at) FROM stdin;
\.
COPY public.inclinaisons (inclinaison_id, label, degres_min, degres_max, created_at) FROM '$$PATH$$/4843.dat';

--
-- Data for Name: schema3; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
\.
COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM '$$PATH$$/4845.dat';

--
-- Data for Name: schema4; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
\.
COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM '$$PATH$$/4847.dat';

--
-- Data for Name: sets; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM stdin;
\.
COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM '$$PATH$$/4849.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM stdin;
\.
COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM '$$PATH$$/4851.dat';

--
-- Name: inclinaisons_inclinaison_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.inclinaisons_inclinaison_id_seq', 2, true);


--
-- Name: schema3_schema3_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.schema3_schema3_id_seq', 11, true);


--
-- Name: schema4_schema4_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.schema4_schema4_id_seq', 10, true);


--
-- Name: sets_position_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.sets_position_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: inclinaisons inclinaisons_degres_max_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_max_key UNIQUE (degres_max);


--
-- Name: inclinaisons inclinaisons_degres_min_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_min_key UNIQUE (degres_min);


--
-- Name: inclinaisons inclinaisons_label_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_label_key UNIQUE (label);


--
-- Name: inclinaisons inclinaisons_pkey; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_pkey PRIMARY KEY (inclinaison_id);


--
-- Name: schema3 schema3_image_name_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_name_key UNIQUE (image_name);


--
-- Name: schema3 schema3_image_path_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_path_key UNIQUE (image_path);


--
-- Name: schema3 schema3_pkey; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_pkey PRIMARY KEY (schema3_id);


--
-- Name: schema4 schema4_image_name_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_name_key UNIQUE (image_name);


--
-- Name: schema4 schema4_image_path_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_path_key UNIQUE (image_path);


--
-- Name: schema4 schema4_pkey; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_pkey PRIMARY KEY (schema4_id);


--
-- Name: sets sets_abreviation_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_abreviation_key UNIQUE (abreviation);


--
-- Name: sets sets_angle1_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle1_key UNIQUE (angle1);


--
-- Name: sets sets_angle2_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle2_key UNIQUE (angle2);


--
-- Name: sets sets_nom_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_nom_key UNIQUE (nom);


--
-- Name: sets sets_pkey; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (position_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              