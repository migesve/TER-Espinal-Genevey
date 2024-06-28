toc.dat                                                                                             0000600 0004000 0002000 00000045173 14637545413 0014465 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       '                |           maieutiquedb    16.2    16.2 9               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         
           1262    16414    maieutiquedb    DATABASE        CREATE DATABASE maieutiquedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE maieutiquedb;
                AdminMaieutique    false         �            1259    32843    inclinaisons    TABLE     �   CREATE TABLE public.inclinaisons (
    inclinaison_id integer NOT NULL,
    label character varying(30) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.inclinaisons;
       public         heap    AdminMaieutique    false         �            1259    32847    inclinaisons_inclinaison_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inclinaisons_inclinaison_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.inclinaisons_inclinaison_id_seq;
       public          AdminMaieutique    false    215                    0    0    inclinaisons_inclinaison_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.inclinaisons_inclinaison_id_seq OWNED BY public.inclinaisons.inclinaison_id;
          public          AdminMaieutique    false    216         �            1259    32848    reponses    TABLE     �  CREATE TABLE public.reponses (
    reponse_id integer NOT NULL,
    user_id integer NOT NULL,
    position_id integer NOT NULL,
    inclinaison_id integer NOT NULL,
    nom character varying(60) NOT NULL,
    abreviation character varying(10) NOT NULL,
    schema1_angle smallint NOT NULL,
    schema1_inclinaison smallint NOT NULL,
    schema2_angle smallint NOT NULL,
    schema2_inclinaison smallint NOT NULL,
    schema3_id integer NOT NULL,
    schema4_id integer NOT NULL,
    corr_nom boolean DEFAULT true NOT NULL,
    corr_abreviation boolean DEFAULT true NOT NULL,
    corr_schema1_angle boolean DEFAULT true NOT NULL,
    corr_schema1_inclinaison boolean DEFAULT true NOT NULL,
    corr_schema2_angle boolean DEFAULT true NOT NULL,
    corr_schema2_inclinaison boolean DEFAULT true NOT NULL,
    corr_schema3_id boolean DEFAULT true NOT NULL,
    corr_schema4_id boolean DEFAULT true NOT NULL,
    remarque_nom character varying(60),
    remarque_abreviation character varying(60),
    remarque_schema1_angle character varying(60),
    remarque_schema1_inclinaison character varying(60),
    remarque_schema2_angle character varying(60),
    remarque_schema2_inclinaison character varying(60),
    remarque_schema3_id character varying(60),
    remarque_schema4_id character varying(60),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    difficulte smallint DEFAULT 1 NOT NULL,
    enonce character varying(50) NOT NULL
);
    DROP TABLE public.reponses;
       public         heap    AdminMaieutique    false         �            1259    32863    reponses_reponse_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reponses_reponse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.reponses_reponse_id_seq;
       public          AdminMaieutique    false    217                    0    0    reponses_reponse_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.reponses_reponse_id_seq OWNED BY public.reponses.reponse_id;
          public          AdminMaieutique    false    218         �            1259    32864    schema3    TABLE     R  CREATE TABLE public.schema3 (
    schema3_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint NOT NULL
);
    DROP TABLE public.schema3;
       public         heap    AdminMaieutique    false         �            1259    32868    schema3_schema3_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schema3_schema3_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.schema3_schema3_id_seq;
       public          AdminMaieutique    false    219                    0    0    schema3_schema3_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema3_schema3_id_seq OWNED BY public.schema3.schema3_id;
          public          AdminMaieutique    false    220         �            1259    32869    schema4    TABLE     I  CREATE TABLE public.schema4 (
    schema4_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint
);
    DROP TABLE public.schema4;
       public         heap    AdminMaieutique    false         �            1259    32873    schema4_schema4_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schema4_schema4_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.schema4_schema4_id_seq;
       public          AdminMaieutique    false    221                    0    0    schema4_schema4_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema4_schema4_id_seq OWNED BY public.schema4.schema4_id;
          public          AdminMaieutique    false    222         �            1259    32874    sets    TABLE     F  CREATE TABLE public.sets (
    position_id integer NOT NULL,
    nom character varying(60) NOT NULL,
    abreviation character varying(10) NOT NULL,
    descriptif character varying(255),
    angle1 smallint NOT NULL,
    angle2 smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.sets;
       public         heap    AdminMaieutique    false         �            1259    32878    sets_position_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sets_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.sets_position_id_seq;
       public          AdminMaieutique    false    223                    0    0    sets_position_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.sets_position_id_seq OWNED BY public.sets.position_id;
          public          AdminMaieutique    false    224         �            1259    32879    users    TABLE     Z  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    passhash character varying NOT NULL,
    email character varying(50) NOT NULL,
    statut character varying(30) NOT NULL,
    cohorte character varying(30) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap    AdminMaieutique    false         �            1259    32885    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          AdminMaieutique    false    225                    0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          AdminMaieutique    false    226         3           2604    32886    inclinaisons inclinaison_id    DEFAULT     �   ALTER TABLE ONLY public.inclinaisons ALTER COLUMN inclinaison_id SET DEFAULT nextval('public.inclinaisons_inclinaison_id_seq'::regclass);
 J   ALTER TABLE public.inclinaisons ALTER COLUMN inclinaison_id DROP DEFAULT;
       public          AdminMaieutique    false    216    215         5           2604    32887    reponses reponse_id    DEFAULT     z   ALTER TABLE ONLY public.reponses ALTER COLUMN reponse_id SET DEFAULT nextval('public.reponses_reponse_id_seq'::regclass);
 B   ALTER TABLE public.reponses ALTER COLUMN reponse_id DROP DEFAULT;
       public          AdminMaieutique    false    218    217         @           2604    32888    schema3 schema3_id    DEFAULT     x   ALTER TABLE ONLY public.schema3 ALTER COLUMN schema3_id SET DEFAULT nextval('public.schema3_schema3_id_seq'::regclass);
 A   ALTER TABLE public.schema3 ALTER COLUMN schema3_id DROP DEFAULT;
       public          AdminMaieutique    false    220    219         B           2604    32889    schema4 schema4_id    DEFAULT     x   ALTER TABLE ONLY public.schema4 ALTER COLUMN schema4_id SET DEFAULT nextval('public.schema4_schema4_id_seq'::regclass);
 A   ALTER TABLE public.schema4 ALTER COLUMN schema4_id DROP DEFAULT;
       public          AdminMaieutique    false    222    221         D           2604    32890    sets position_id    DEFAULT     t   ALTER TABLE ONLY public.sets ALTER COLUMN position_id SET DEFAULT nextval('public.sets_position_id_seq'::regclass);
 ?   ALTER TABLE public.sets ALTER COLUMN position_id DROP DEFAULT;
       public          AdminMaieutique    false    224    223         F           2604    32891    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          AdminMaieutique    false    226    225         �          0    32843    inclinaisons 
   TABLE DATA           I   COPY public.inclinaisons (inclinaison_id, label, created_at) FROM stdin;
    public          AdminMaieutique    false    215       4857.dat �          0    32848    reponses 
   TABLE DATA           :  COPY public.reponses (reponse_id, user_id, position_id, inclinaison_id, nom, abreviation, schema1_angle, schema1_inclinaison, schema2_angle, schema2_inclinaison, schema3_id, schema4_id, corr_nom, corr_abreviation, corr_schema1_angle, corr_schema1_inclinaison, corr_schema2_angle, corr_schema2_inclinaison, corr_schema3_id, corr_schema4_id, remarque_nom, remarque_abreviation, remarque_schema1_angle, remarque_schema1_inclinaison, remarque_schema2_angle, remarque_schema2_inclinaison, remarque_schema3_id, remarque_schema4_id, created_at, difficulte, enonce) FROM stdin;
    public          AdminMaieutique    false    217       4859.dat �          0    32864    schema3 
   TABLE DATA           u   COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
    public          AdminMaieutique    false    219       4861.dat �          0    32869    schema4 
   TABLE DATA           u   COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
    public          AdminMaieutique    false    221       4863.dat           0    32874    sets 
   TABLE DATA           e   COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM stdin;
    public          AdminMaieutique    false    223       4865.dat           0    32879    users 
   TABLE DATA           [   COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM stdin;
    public          AdminMaieutique    false    225       4867.dat            0    0    inclinaisons_inclinaison_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.inclinaisons_inclinaison_id_seq', 2, true);
          public          AdminMaieutique    false    216                    0    0    reponses_reponse_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.reponses_reponse_id_seq', 14, true);
          public          AdminMaieutique    false    218                    0    0    schema3_schema3_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.schema3_schema3_id_seq', 25, true);
          public          AdminMaieutique    false    220                    0    0    schema4_schema4_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.schema4_schema4_id_seq', 24, true);
          public          AdminMaieutique    false    222                    0    0    sets_position_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sets_position_id_seq', 5, true);
          public          AdminMaieutique    false    224                    0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 10, true);
          public          AdminMaieutique    false    226         I           2606    32893 #   inclinaisons inclinaisons_label_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_label_key UNIQUE (label);
 M   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_label_key;
       public            AdminMaieutique    false    215         K           2606    32895    inclinaisons inclinaisons_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_pkey PRIMARY KEY (inclinaison_id);
 H   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_pkey;
       public            AdminMaieutique    false    215         M           2606    32897    reponses reponses_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.reponses
    ADD CONSTRAINT reponses_pkey PRIMARY KEY (reponse_id);
 @   ALTER TABLE ONLY public.reponses DROP CONSTRAINT reponses_pkey;
       public            AdminMaieutique    false    217         O           2606    32899    schema3 schema3_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_name_key;
       public            AdminMaieutique    false    219         Q           2606    32901    schema3 schema3_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_path_key;
       public            AdminMaieutique    false    219         S           2606    32903    schema3 schema3_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_pkey PRIMARY KEY (schema3_id);
 >   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_pkey;
       public            AdminMaieutique    false    219         U           2606    32905    schema4 schema4_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_name_key;
       public            AdminMaieutique    false    221         W           2606    32907    schema4 schema4_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_path_key;
       public            AdminMaieutique    false    221         Y           2606    32909    schema4 schema4_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_pkey PRIMARY KEY (schema4_id);
 >   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_pkey;
       public            AdminMaieutique    false    221         [           2606    32911    sets sets_abreviation_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_abreviation_key UNIQUE (abreviation);
 C   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_abreviation_key;
       public            AdminMaieutique    false    223         ]           2606    32913    sets sets_angle1_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle1_key UNIQUE (angle1);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle1_key;
       public            AdminMaieutique    false    223         _           2606    32915    sets sets_angle2_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle2_key UNIQUE (angle2);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle2_key;
       public            AdminMaieutique    false    223         a           2606    32917    sets sets_nom_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_nom_key UNIQUE (nom);
 ;   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_nom_key;
       public            AdminMaieutique    false    223         c           2606    32919    sets sets_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (position_id);
 8   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_pkey;
       public            AdminMaieutique    false    223         e           2606    32921    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            AdminMaieutique    false    225         g           2606    32923    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            AdminMaieutique    false    225         i           2606    32925    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            AdminMaieutique    false    225                                                                                                                                                                                                                                                                                                                                                                                                             4857.dat                                                                                            0000600 0004000 0002000 00000000215 14637545413 0014273 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	bien fléchie	2024-05-24 10:43:07.656349+02
2	peu fléchie	2024-05-24 10:43:41.276715+02
3	mal fléchie	2024-06-25 16:10:24.279394+02
\.


                                                                                                                                                                                                                                                                                                                                                                                   4859.dat                                                                                            0000600 0004000 0002000 00000001012 14637545413 0014271 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	9	1	1	kuh	jhg	10	2	10	2	1	2	t	t	f	t	t	t	f	t	\N	\N	\N	\N	\N	\N	\N	\N	2024-06-06 14:54:49.078883+02	1	Schema 1
13	9	5	2	aaaaa	enonce	0	1	0	1	1	1	t	t	t	t	t	t	t	t									2024-06-19 12:06:44.381312+02	1	Sigle
11	10	3	1	bbbb	aaaa	0	1	309	1	1	1	t	t	t	t	t	t	t	t									2024-06-19 12:01:34.249607+02	1	Schéma très simplifié
12	10	3	1	enonce	aaaaa	302	1	237	1	1	1	t	t	t	t	t	t	t	t									2024-06-19 12:05:07.583766+02	1	Nom
14	10	6	2	rrrr	enonce	0	1	0	1	4	1	t	t	t	t	t	t	t	t									2024-06-19 13:07:15.254405+02	1	Sigle
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      4861.dat                                                                                            0000600 0004000 0002000 00000003747 14637545413 0014303 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        18	P1I3A0.PNG	src/images/schema3/P1I3A0.PNG	1	3	2024-06-28 11:57:08.787472+02	0
19	P2I3A45.PNG	src/images/schema3/P2I3A45.PNG	2	3	2024-06-28 11:58:18.535698+02	45
20	P3I3A90.PNG	src/images/schema3/P3I3A90.PNG	3	3	2024-06-28 12:59:29.052411+02	90
21	P4I3A135.PNG	src/images/schema3/P4I3A135.PNG	4	3	2024-06-28 13:00:35.149221+02	135
22	P5I3A180.PNG	src/images/schema3/P5I3A180.PNG	5	3	2024-06-28 13:03:02.156927+02	180
23	P6I3A225.PNG	src/images/schema3/P6I3A225.PNG	6	3	2024-06-28 13:04:20.268126+02	225
24	P7I3A270.PNG	src/images/schema3/P7I3A270.PNG	7	3	2024-06-28 13:05:16.105895+02	270
25	P8I3A315.PNG	src/images/schema3/P8I3A315.PNG	8	3	2024-06-28 13:06:05.274464+02	315
1	P1I2A0.PNG	src/images/schema3/P1I2A0.PNG	1	2	2024-05-24 10:42:13.058178+02	0
2	P1I1A0.PNG	src/images/schema3/P1I1A0.PNG	1	1	2024-05-24 14:02:44.140495+02	0
3	P2I1A45.PNG	src/images/schema3/P2I1A45.PNG	2	1	2024-05-24 14:04:20.336677+02	45
4	P2I2A45.PNG	src/images/schema3/P2I2A45.PNG	2	2	2024-05-24 14:05:21.686089+02	45
6	P3I1A90.PNG	src/images/schema3/P3I1A90.PNG	3	1	2024-05-27 17:32:23.449649+02	90
7	P4I1A135.PNG	src/images/schema3/P4I1A135.PNG	4	1	2024-05-27 17:33:32.688832+02	135
8	P5I1A180.PNG	src/images/schema3/P5I1A180.PNG	5	1	2024-05-27 17:34:47.926608+02	180
9	P6I1A225.PNG	src/images/schema3/P6I1A225.PNG	6	1	2024-05-27 17:37:19.694252+02	225
10	P7I1A270.PNG	src/images/schema3/P7I1A270.PNG	7	1	2024-05-27 17:37:19.694252+02	270
11	P8I1A315.PNG	src/images/schema3/P8I1A315.PNG	8	1	2024-05-27 17:38:05.696597+02	315
12	P3I2A90.PNG	src/images/schema3/P3I2A90.PNG	3	2	2024-06-10 16:41:08.295959+02	90
13	P4I2A135.PNG	src/images/schema3/P4I2A135.PNG	4	2	2024-06-10 16:42:04.3516+02	135
14	P5I2A180.PNG	src/images/schema3/P5I2A180.PNG	5	2	2024-06-10 16:43:03.370296+02	180
15	P6I2A225.PNG	src/images/schema3/P6I2A225.PNG	6	2	2024-06-10 16:45:38.624461+02	225
16	P7I2A270.PNG	src/images/schema3/P7I2A270.PNG	7	2	2024-06-10 16:45:38.624461+02	270
17	P8I2A315.PNG	src/images/schema3/P8I2A315.PNG	8	2	2024-06-10 16:45:38.624461+02	315
\.


                         4863.dat                                                                                            0000600 0004000 0002000 00000003744 14637545413 0014302 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	P1I1A0.PNG	src/images/schema4/P1I1A0.PNG	1	1	2024-05-24 10:40:42.684658+02	0
2	P1I2A0.PNG	src/images/schema4/P1I2A0.PNG	1	2	2024-05-27 11:04:41.376702+02	0
3	P2I1A45.PNG	src/images/schema4/P2I1A45.PNG	2	1	2024-05-27 11:06:31.657904+02	45
4	P2I2A45.PNG	src/images/schema4/P2I2A45.PNG	2	2	2024-05-27 11:07:36.404611+02	45
5	P3I1A90.PNG	src/images/schema4/P3I1A90.PNG	3	1	2024-05-27 17:32:23.449649+02	90
6	P4I1A135.PNG	src/images/schema4/P4I1A135.PNG	4	1	2024-05-27 17:33:32.688832+02	135
7	P5I1A180.PNG	src/images/schema4/P5I1A180.PNG	5	1	2024-05-27 17:34:47.926608+02	180
8	P7I1A270.PNG	src/images/schema4/P7I1A270.PNG	7	1	2024-05-27 17:37:19.694252+02	270
9	P6I1A225.PNG	src/images/schema4/P6I1A225.PNG	6	1	2024-05-27 17:37:19.694252+02	225
10	P8I1A315.PNG	src/images/schema4/P8I1A315.PNG	8	1	2024-05-27 17:38:05.696597+02	315
11	P3I2A90.PNG	src/images/schema4/P3I2A90.PNG	3	2	2024-06-10 16:48:18.54884+02	90
12	P4I2A135.PNG	src/images/schema4/P4I2A135.PNG	4	2	2024-06-10 16:48:18.54884+02	135
13	P5I2A180.PNG	src/images/schema4/P5I2A180.PNG	5	2	2024-06-10 16:48:18.54884+02	180
14	P7I2A270.PNG	src/images/schema4/P7I2A270.PNG	7	2	2024-06-10 16:53:06.910543+02	270
15	P6I2A225.PNG	src/images/schema4/P6I2A225.PNG	6	2	2024-06-10 16:53:06.910543+02	225
16	P8I2A315.PNG	src/images/schema4/P8I2A315.PNG	8	2	2024-06-10 16:53:06.910543+02	315
17	P1I3A0.PNG	src/images/schema4/P1I3A0.PNG	1	3	2024-06-28 13:08:11.502386+02	0
18	P2I3A45.PNG	src/images/schema4/P2I3A45.PNG	2	3	2024-06-28 13:17:55.578107+02	45
19	P3I3A90.PNG	src/images/schema4/P3I3A90.PNG	3	3	2024-06-28 13:21:54.30969+02	90
20	P4I3A135.PNG	src/images/schema4/P4I3A135.PNG	4	3	2024-06-28 13:23:43.543818+02	135
21	P5I3A180.PNG	src/images/schema4/P5I3A180.PNG	5	3	2024-06-28 13:25:26.367666+02	180
22	P6I3A225.PNG	src/images/schema4/P6I3A225.PNG	6	3	2024-06-28 13:26:57.936266+02	225
23	P7I3A270.PNG	src/images/schema4/P7I3A270.PNG	7	3	2024-06-28 13:28:19.097752+02	270
24	P8I3A315.PNG	src/images/schema4/P8I3A315.PNG	8	3	2024-06-28 13:29:52.441022+02	315
\.


                            4865.dat                                                                                            0000600 0004000 0002000 00000001245 14637545413 0014276 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2	Occipito-iliaque droite postérieure	OIDP	desc OIDP	6	84	2024-05-23 12:03:54.132418+02
3	Occipito-iliaque droite transverse	OIDT	desc OIDT	85	95	2024-05-23 12:08:28.115344+02
4	Occipito-iliaque droite antérieure	OIDA	desc OIDA	96	174	2024-05-23 12:08:28.115344+02
6	Occipito-iliaque gauche antérieure	OIGA	desc OIGA	186	264	2024-05-23 12:08:28.115344+02
7	Occipito-iliaque gauche transverse	OIGT	desc OIGT	265	275	2024-05-23 12:08:28.115344+02
8	Occipito-iliaque gauche postérieure	OIGP	desc OIGP	276	354	2024-05-23 12:09:23.280798+02
1	Occipito-sacré	OS	desc OS	355	5	2024-05-24 10:31:50.944227+02
5	Occipito-pubien	OP	desc OP	175	185	2024-05-24 10:33:38.645735+02
\.


                                                                                                                                                                                                                                                                                                                                                           4867.dat                                                                                            0000600 0004000 0002000 00000000661 14637545413 0014301 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	miges	$2b$10$yRWOCk7ebR5XwBMLDBpCaudjJR1Kt6tzXBl.VcLDguMHBimkGszjq	miguelangelespinal@gmail.com	Admin	admin	2024-05-22 10:23:47.378434+02
9	coemgen	$2b$10$em8OPK3BoxMY9RfURdh3v.AZb4t1zc5hffwkkhyUtw3CneVJjhRBC	coemgen.genevey@laposte.net	Admin	admin	2024-05-24 10:15:48.701205+02
10	studentTest	$2b$10$eU6TDBOHoONzQQpqqbeoo.CRwX3QwZA7R5aLnj6A5WtJDNjfD/wS6	test.test@laposte.net	étudiant	Etidiant	2024-06-12 16:36:05.906974+02
\.


                                                                               restore.sql                                                                                         0000600 0004000 0002000 00000040122 14637545413 0015377 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
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
-- Name: reponses; Type: TABLE; Schema: public; Owner: AdminMaieutique
--

CREATE TABLE public.reponses (
    reponse_id integer NOT NULL,
    user_id integer NOT NULL,
    position_id integer NOT NULL,
    inclinaison_id integer NOT NULL,
    nom character varying(60) NOT NULL,
    abreviation character varying(10) NOT NULL,
    schema1_angle smallint NOT NULL,
    schema1_inclinaison smallint NOT NULL,
    schema2_angle smallint NOT NULL,
    schema2_inclinaison smallint NOT NULL,
    schema3_id integer NOT NULL,
    schema4_id integer NOT NULL,
    corr_nom boolean DEFAULT true NOT NULL,
    corr_abreviation boolean DEFAULT true NOT NULL,
    corr_schema1_angle boolean DEFAULT true NOT NULL,
    corr_schema1_inclinaison boolean DEFAULT true NOT NULL,
    corr_schema2_angle boolean DEFAULT true NOT NULL,
    corr_schema2_inclinaison boolean DEFAULT true NOT NULL,
    corr_schema3_id boolean DEFAULT true NOT NULL,
    corr_schema4_id boolean DEFAULT true NOT NULL,
    remarque_nom character varying(60),
    remarque_abreviation character varying(60),
    remarque_schema1_angle character varying(60),
    remarque_schema1_inclinaison character varying(60),
    remarque_schema2_angle character varying(60),
    remarque_schema2_inclinaison character varying(60),
    remarque_schema3_id character varying(60),
    remarque_schema4_id character varying(60),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    difficulte smallint DEFAULT 1 NOT NULL,
    enonce character varying(50) NOT NULL
);


ALTER TABLE public.reponses OWNER TO "AdminMaieutique";

--
-- Name: reponses_reponse_id_seq; Type: SEQUENCE; Schema: public; Owner: AdminMaieutique
--

CREATE SEQUENCE public.reponses_reponse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reponses_reponse_id_seq OWNER TO "AdminMaieutique";

--
-- Name: reponses_reponse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: AdminMaieutique
--

ALTER SEQUENCE public.reponses_reponse_id_seq OWNED BY public.reponses.reponse_id;


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
-- Name: reponses reponse_id; Type: DEFAULT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.reponses ALTER COLUMN reponse_id SET DEFAULT nextval('public.reponses_reponse_id_seq'::regclass);


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

COPY public.inclinaisons (inclinaison_id, label, created_at) FROM stdin;
\.
COPY public.inclinaisons (inclinaison_id, label, created_at) FROM '$$PATH$$/4857.dat';

--
-- Data for Name: reponses; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.reponses (reponse_id, user_id, position_id, inclinaison_id, nom, abreviation, schema1_angle, schema1_inclinaison, schema2_angle, schema2_inclinaison, schema3_id, schema4_id, corr_nom, corr_abreviation, corr_schema1_angle, corr_schema1_inclinaison, corr_schema2_angle, corr_schema2_inclinaison, corr_schema3_id, corr_schema4_id, remarque_nom, remarque_abreviation, remarque_schema1_angle, remarque_schema1_inclinaison, remarque_schema2_angle, remarque_schema2_inclinaison, remarque_schema3_id, remarque_schema4_id, created_at, difficulte, enonce) FROM stdin;
\.
COPY public.reponses (reponse_id, user_id, position_id, inclinaison_id, nom, abreviation, schema1_angle, schema1_inclinaison, schema2_angle, schema2_inclinaison, schema3_id, schema4_id, corr_nom, corr_abreviation, corr_schema1_angle, corr_schema1_inclinaison, corr_schema2_angle, corr_schema2_inclinaison, corr_schema3_id, corr_schema4_id, remarque_nom, remarque_abreviation, remarque_schema1_angle, remarque_schema1_inclinaison, remarque_schema2_angle, remarque_schema2_inclinaison, remarque_schema3_id, remarque_schema4_id, created_at, difficulte, enonce) FROM '$$PATH$$/4859.dat';

--
-- Data for Name: schema3; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
\.
COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM '$$PATH$$/4861.dat';

--
-- Data for Name: schema4; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
\.
COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM '$$PATH$$/4863.dat';

--
-- Data for Name: sets; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM stdin;
\.
COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM '$$PATH$$/4865.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: AdminMaieutique
--

COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM stdin;
\.
COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM '$$PATH$$/4867.dat';

--
-- Name: inclinaisons_inclinaison_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.inclinaisons_inclinaison_id_seq', 2, true);


--
-- Name: reponses_reponse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.reponses_reponse_id_seq', 14, true);


--
-- Name: schema3_schema3_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.schema3_schema3_id_seq', 25, true);


--
-- Name: schema4_schema4_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.schema4_schema4_id_seq', 24, true);


--
-- Name: sets_position_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.sets_position_id_seq', 5, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: AdminMaieutique
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


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
-- Name: reponses reponses_pkey; Type: CONSTRAINT; Schema: public; Owner: AdminMaieutique
--

ALTER TABLE ONLY public.reponses
    ADD CONSTRAINT reponses_pkey PRIMARY KEY (reponse_id);


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

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              