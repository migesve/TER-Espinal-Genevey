PGDMP  ,            
        |           maieutiquedb    16.2    16.2 ;               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16414    maieutiquedb    DATABASE        CREATE DATABASE maieutiquedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
    DROP DATABASE maieutiquedb;
                AdminMaieutique    false            �            1259    16501    inclinaisons    TABLE       CREATE TABLE public.inclinaisons (
    inclinaison_id integer NOT NULL,
    label character varying(30) NOT NULL,
    degres_min smallint NOT NULL,
    degres_max smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
     DROP TABLE public.inclinaisons;
       public         heap    AdminMaieutique    false            �            1259    16505    inclinaisons_inclinaison_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inclinaisons_inclinaison_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.inclinaisons_inclinaison_id_seq;
       public          AdminMaieutique    false    215                       0    0    inclinaisons_inclinaison_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.inclinaisons_inclinaison_id_seq OWNED BY public.inclinaisons.inclinaison_id;
          public          AdminMaieutique    false    216            �            1259    24632    reponses    TABLE     �  CREATE TABLE public.reponses (
    reponse_id integer NOT NULL,
    user_id smallint NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    ennonce smallint NOT NULL,
    nom character varying(60) NOT NULL,
    abreviation character varying(10) NOT NULL,
    schema1_angle smallint NOT NULL,
    schema1_inclinaison smallint NOT NULL,
    schema2_angle smallint NOT NULL,
    schema2_inclinaison smallint NOT NULL,
    schema3_id smallint NOT NULL,
    schema4_id smallint NOT NULL,
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
    difficulte smallint DEFAULT 1 NOT NULL
);
    DROP TABLE public.reponses;
       public         heap    AdminMaieutique    false            �            1259    24631    reponses_reponse_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reponses_reponse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.reponses_reponse_id_seq;
       public          AdminMaieutique    false    226                       0    0    reponses_reponse_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.reponses_reponse_id_seq OWNED BY public.reponses.reponse_id;
          public          AdminMaieutique    false    225            �            1259    16506    schema3    TABLE     R  CREATE TABLE public.schema3 (
    schema3_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint NOT NULL
);
    DROP TABLE public.schema3;
       public         heap    AdminMaieutique    false            �            1259    16510    schema3_schema3_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schema3_schema3_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.schema3_schema3_id_seq;
       public          AdminMaieutique    false    217                       0    0    schema3_schema3_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema3_schema3_id_seq OWNED BY public.schema3.schema3_id;
          public          AdminMaieutique    false    218            �            1259    16511    schema4    TABLE     I  CREATE TABLE public.schema4 (
    schema4_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    angle smallint
);
    DROP TABLE public.schema4;
       public         heap    AdminMaieutique    false            �            1259    16515    schema4_schema4_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schema4_schema4_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.schema4_schema4_id_seq;
       public          AdminMaieutique    false    219                       0    0    schema4_schema4_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema4_schema4_id_seq OWNED BY public.schema4.schema4_id;
          public          AdminMaieutique    false    220            �            1259    16516    sets    TABLE     F  CREATE TABLE public.sets (
    position_id integer NOT NULL,
    nom character varying(60) NOT NULL,
    abreviation character varying(10) NOT NULL,
    descriptif character varying(255),
    angle1 smallint NOT NULL,
    angle2 smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.sets;
       public         heap    AdminMaieutique    false            �            1259    16520    sets_position_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sets_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.sets_position_id_seq;
       public          AdminMaieutique    false    221                       0    0    sets_position_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.sets_position_id_seq OWNED BY public.sets.position_id;
          public          AdminMaieutique    false    222            �            1259    16521    users    TABLE     Z  CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    passhash character varying NOT NULL,
    email character varying(50) NOT NULL,
    statut character varying(30) NOT NULL,
    cohorte character varying(30) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap    AdminMaieutique    false            �            1259    16527    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          AdminMaieutique    false    223                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          AdminMaieutique    false    224            3           2604    16528    inclinaisons inclinaison_id    DEFAULT     �   ALTER TABLE ONLY public.inclinaisons ALTER COLUMN inclinaison_id SET DEFAULT nextval('public.inclinaisons_inclinaison_id_seq'::regclass);
 J   ALTER TABLE public.inclinaisons ALTER COLUMN inclinaison_id DROP DEFAULT;
       public          AdminMaieutique    false    216    215            =           2604    24635    reponses reponse_id    DEFAULT     z   ALTER TABLE ONLY public.reponses ALTER COLUMN reponse_id SET DEFAULT nextval('public.reponses_reponse_id_seq'::regclass);
 B   ALTER TABLE public.reponses ALTER COLUMN reponse_id DROP DEFAULT;
       public          AdminMaieutique    false    226    225    226            5           2604    16529    schema3 schema3_id    DEFAULT     x   ALTER TABLE ONLY public.schema3 ALTER COLUMN schema3_id SET DEFAULT nextval('public.schema3_schema3_id_seq'::regclass);
 A   ALTER TABLE public.schema3 ALTER COLUMN schema3_id DROP DEFAULT;
       public          AdminMaieutique    false    218    217            7           2604    16530    schema4 schema4_id    DEFAULT     x   ALTER TABLE ONLY public.schema4 ALTER COLUMN schema4_id SET DEFAULT nextval('public.schema4_schema4_id_seq'::regclass);
 A   ALTER TABLE public.schema4 ALTER COLUMN schema4_id DROP DEFAULT;
       public          AdminMaieutique    false    220    219            9           2604    16531    sets position_id    DEFAULT     t   ALTER TABLE ONLY public.sets ALTER COLUMN position_id SET DEFAULT nextval('public.sets_position_id_seq'::regclass);
 ?   ALTER TABLE public.sets ALTER COLUMN position_id DROP DEFAULT;
       public          AdminMaieutique    false    222    221            ;           2604    16532    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          AdminMaieutique    false    224    223            �          0    16501    inclinaisons 
   TABLE DATA           a   COPY public.inclinaisons (inclinaison_id, label, degres_min, degres_max, created_at) FROM stdin;
    public          AdminMaieutique    false    215   mN                 0    24632    reponses 
   TABLE DATA           ;  COPY public.reponses (reponse_id, user_id, position_id, inclinaison_id, ennonce, nom, abreviation, schema1_angle, schema1_inclinaison, schema2_angle, schema2_inclinaison, schema3_id, schema4_id, corr_nom, corr_abreviation, corr_schema1_angle, corr_schema1_inclinaison, corr_schema2_angle, corr_schema2_inclinaison, corr_schema3_id, corr_schema4_id, remarque_nom, remarque_abreviation, remarque_schema1_angle, remarque_schema1_inclinaison, remarque_schema2_angle, remarque_schema2_inclinaison, remarque_schema3_id, remarque_schema4_id, created_at, difficulte) FROM stdin;
    public          AdminMaieutique    false    226   �N       �          0    16506    schema3 
   TABLE DATA           u   COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
    public          AdminMaieutique    false    217   6O                 0    16511    schema4 
   TABLE DATA           u   COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at, angle) FROM stdin;
    public          AdminMaieutique    false    219   �P                 0    16516    sets 
   TABLE DATA           e   COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM stdin;
    public          AdminMaieutique    false    221   <R                 0    16521    users 
   TABLE DATA           [   COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM stdin;
    public          AdminMaieutique    false    223   ^S                  0    0    inclinaisons_inclinaison_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.inclinaisons_inclinaison_id_seq', 2, true);
          public          AdminMaieutique    false    216                       0    0    reponses_reponse_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.reponses_reponse_id_seq', 1, true);
          public          AdminMaieutique    false    225                       0    0    schema3_schema3_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.schema3_schema3_id_seq', 17, true);
          public          AdminMaieutique    false    218                       0    0    schema4_schema4_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.schema4_schema4_id_seq', 16, true);
          public          AdminMaieutique    false    220                       0    0    sets_position_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sets_position_id_seq', 5, true);
          public          AdminMaieutique    false    222                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 9, true);
          public          AdminMaieutique    false    224            I           2606    16534 (   inclinaisons inclinaisons_degres_max_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_max_key UNIQUE (degres_max);
 R   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_degres_max_key;
       public            AdminMaieutique    false    215            K           2606    16536 (   inclinaisons inclinaisons_degres_min_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_min_key UNIQUE (degres_min);
 R   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_degres_min_key;
       public            AdminMaieutique    false    215            M           2606    16538 #   inclinaisons inclinaisons_label_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_label_key UNIQUE (label);
 M   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_label_key;
       public            AdminMaieutique    false    215            O           2606    16540    inclinaisons inclinaisons_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_pkey PRIMARY KEY (inclinaison_id);
 H   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_pkey;
       public            AdminMaieutique    false    215            m           2606    24640    reponses reponses_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.reponses
    ADD CONSTRAINT reponses_pkey PRIMARY KEY (reponse_id);
 @   ALTER TABLE ONLY public.reponses DROP CONSTRAINT reponses_pkey;
       public            AdminMaieutique    false    226            Q           2606    16542    schema3 schema3_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_name_key;
       public            AdminMaieutique    false    217            S           2606    16544    schema3 schema3_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_path_key;
       public            AdminMaieutique    false    217            U           2606    16546    schema3 schema3_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_pkey PRIMARY KEY (schema3_id);
 >   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_pkey;
       public            AdminMaieutique    false    217            W           2606    16548    schema4 schema4_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_name_key;
       public            AdminMaieutique    false    219            Y           2606    16550    schema4 schema4_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_path_key;
       public            AdminMaieutique    false    219            [           2606    16552    schema4 schema4_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_pkey PRIMARY KEY (schema4_id);
 >   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_pkey;
       public            AdminMaieutique    false    219            ]           2606    16554    sets sets_abreviation_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_abreviation_key UNIQUE (abreviation);
 C   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_abreviation_key;
       public            AdminMaieutique    false    221            _           2606    16556    sets sets_angle1_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle1_key UNIQUE (angle1);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle1_key;
       public            AdminMaieutique    false    221            a           2606    16558    sets sets_angle2_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle2_key UNIQUE (angle2);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle2_key;
       public            AdminMaieutique    false    221            c           2606    16560    sets sets_nom_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_nom_key UNIQUE (nom);
 ;   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_nom_key;
       public            AdminMaieutique    false    221            e           2606    16562    sets sets_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (position_id);
 8   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_pkey;
       public            AdminMaieutique    false    221            g           2606    16564    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            AdminMaieutique    false    223            i           2606    16566    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            AdminMaieutique    false    223            k           2606    16568    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            AdminMaieutique    false    223            �   _   x�e�;�  й���@�R r7S�������b��ŷ?�MO[���Q�"F�ѱX�"�`�)� m�l�:�r|��?
y�)S|c�1�YA         J   x�3��4���ά�tNCN#(�%@�&!t�vdd`d�k`D
�&V�&V&�z���@��b���� ���      �   y  x���MK�@�u�Wt/�����	�t��ץ)��������$�I�,��9؝���O|�o�y|�N_�������i�?v�S<��v�QG@�ݒl�PE��S�� ��X��gI�"��Ń��9,j��5���,�^�\���J~+����Z	�e�\\�I��E�= O���T��H19sB^/j��5n`�3S�!k�n���1�cR%�B�N=cB��.g3�lΥ�%Z�s6"���rɽ���  ���ٽ<�r�y��<Ɩ��ծ��}-<�Ŷ�*X!G*�>�y��*)Nʜ���Ȋvi�I�Z�ӹ�8r*v�u��in�]���F"�C�6�z�Ln�y��f�w���jf7�f��c!|:�G!         m  x���;KA��:�+�K&�>�N$�	��F��`,��g�c���,�j��o����t�x;��v�8�֟��������;�`�==.�=$+���J�Q�,��h����~�}����=�yi�XA�`�d	�����<�F5�u�_wѬ2F�T@:M4�s�6��|����]����Q�} ��,��Q����+�6�~T�d�q[�����5�?n�۩c:�Z����,f���q��ɹ4�R���y%�ƍ՜�y�4 ܼ��f�����y�%uc�_v�_�^[!,Ѫ�9��,�WwReN�#_O��΂-2J��$��LR���bAP�Ҩ�ԓ��i�f��z�'��f�5��/1���F�           x����j�@���)���;��.P��$�n�ځ�vԾS�#/�1��Q$����sʺ������kt�)�~pi���������y'���5)0��Ȩ̐�-�V
�8
f�(&|B���.�W�8�G0r�t�EC�\���n������rL�/d��߫��X��,�ČT�h�IߍQ�cĄ*N��a6�����1�V��un�4T�����Wu���<�"�x.�_9�2j9���\D=�t�w�-��!2��"��(!5��J�$��n�X         �   x�m�KO�@��5�
�L'sC(�vh�iKjHZ�q3��} �P�_��t��囇�Ƞ7,Y[S�v�+�о�"8�D��!)�!9�'=_E�.�q���(T����ג��M5�]��z�)Y�(n��MT���)�|���{�y�A�q9㏘�k#nAe��5���끉�;x_��9LrvCۏ�k2�v��cU��Y��o�/�P����`�Բk{��?�/b{�E&������XV�     