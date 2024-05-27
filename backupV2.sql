PGDMP                       |           maieutiquedb    16.2    16.2 4    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16414    maieutiquedb    DATABASE        CREATE DATABASE maieutiquedb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';
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
       public          AdminMaieutique    false    215            �           0    0    inclinaisons_inclinaison_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.inclinaisons_inclinaison_id_seq OWNED BY public.inclinaisons.inclinaison_id;
          public          AdminMaieutique    false    216            �            1259    16506    schema3    TABLE     5  CREATE TABLE public.schema3 (
    schema3_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
       public          AdminMaieutique    false    217            �           0    0    schema3_schema3_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema3_schema3_id_seq OWNED BY public.schema3.schema3_id;
          public          AdminMaieutique    false    218            �            1259    16511    schema4    TABLE     5  CREATE TABLE public.schema4 (
    schema4_id integer NOT NULL,
    image_name character varying(80) NOT NULL,
    image_path character varying(255) NOT NULL,
    position_id smallint NOT NULL,
    inclinaison_id smallint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
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
       public          AdminMaieutique    false    219            �           0    0    schema4_schema4_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.schema4_schema4_id_seq OWNED BY public.schema4.schema4_id;
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
       public          AdminMaieutique    false    221            �           0    0    sets_position_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.sets_position_id_seq OWNED BY public.sets.position_id;
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
       public          AdminMaieutique    false    223            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          AdminMaieutique    false    224            .           2604    16528    inclinaisons inclinaison_id    DEFAULT     �   ALTER TABLE ONLY public.inclinaisons ALTER COLUMN inclinaison_id SET DEFAULT nextval('public.inclinaisons_inclinaison_id_seq'::regclass);
 J   ALTER TABLE public.inclinaisons ALTER COLUMN inclinaison_id DROP DEFAULT;
       public          AdminMaieutique    false    216    215            0           2604    16529    schema3 schema3_id    DEFAULT     x   ALTER TABLE ONLY public.schema3 ALTER COLUMN schema3_id SET DEFAULT nextval('public.schema3_schema3_id_seq'::regclass);
 A   ALTER TABLE public.schema3 ALTER COLUMN schema3_id DROP DEFAULT;
       public          AdminMaieutique    false    218    217            2           2604    16530    schema4 schema4_id    DEFAULT     x   ALTER TABLE ONLY public.schema4 ALTER COLUMN schema4_id SET DEFAULT nextval('public.schema4_schema4_id_seq'::regclass);
 A   ALTER TABLE public.schema4 ALTER COLUMN schema4_id DROP DEFAULT;
       public          AdminMaieutique    false    220    219            4           2604    16531    sets position_id    DEFAULT     t   ALTER TABLE ONLY public.sets ALTER COLUMN position_id SET DEFAULT nextval('public.sets_position_id_seq'::regclass);
 ?   ALTER TABLE public.sets ALTER COLUMN position_id DROP DEFAULT;
       public          AdminMaieutique    false    222    221            6           2604    16532    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          AdminMaieutique    false    224    223            �          0    16501    inclinaisons 
   TABLE DATA           a   COPY public.inclinaisons (inclinaison_id, label, degres_min, degres_max, created_at) FROM stdin;
    public          AdminMaieutique    false    215   ?       �          0    16506    schema3 
   TABLE DATA           n   COPY public.schema3 (schema3_id, image_name, image_path, position_id, inclinaison_id, created_at) FROM stdin;
    public          AdminMaieutique    false    217   y?       �          0    16511    schema4 
   TABLE DATA           n   COPY public.schema4 (schema4_id, image_name, image_path, position_id, inclinaison_id, created_at) FROM stdin;
    public          AdminMaieutique    false    219   $@       �          0    16516    sets 
   TABLE DATA           e   COPY public.sets (position_id, nom, abreviation, descriptif, angle1, angle2, created_at) FROM stdin;
    public          AdminMaieutique    false    221   �@       �          0    16521    users 
   TABLE DATA           [   COPY public.users (id, username, passhash, email, statut, cohorte, created_at) FROM stdin;
    public          AdminMaieutique    false    223   �A                   0    0    inclinaisons_inclinaison_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.inclinaisons_inclinaison_id_seq', 2, true);
          public          AdminMaieutique    false    216                       0    0    schema3_schema3_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.schema3_schema3_id_seq', 4, true);
          public          AdminMaieutique    false    218                       0    0    schema4_schema4_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.schema4_schema4_id_seq', 4, true);
          public          AdminMaieutique    false    220                       0    0    sets_position_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.sets_position_id_seq', 5, true);
          public          AdminMaieutique    false    222                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 9, true);
          public          AdminMaieutique    false    224            9           2606    16534 (   inclinaisons inclinaisons_degres_max_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_max_key UNIQUE (degres_max);
 R   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_degres_max_key;
       public            AdminMaieutique    false    215            ;           2606    16536 (   inclinaisons inclinaisons_degres_min_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_degres_min_key UNIQUE (degres_min);
 R   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_degres_min_key;
       public            AdminMaieutique    false    215            =           2606    16538 #   inclinaisons inclinaisons_label_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_label_key UNIQUE (label);
 M   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_label_key;
       public            AdminMaieutique    false    215            ?           2606    16540    inclinaisons inclinaisons_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.inclinaisons
    ADD CONSTRAINT inclinaisons_pkey PRIMARY KEY (inclinaison_id);
 H   ALTER TABLE ONLY public.inclinaisons DROP CONSTRAINT inclinaisons_pkey;
       public            AdminMaieutique    false    215            A           2606    16542    schema3 schema3_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_name_key;
       public            AdminMaieutique    false    217            C           2606    16544    schema3 schema3_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_image_path_key;
       public            AdminMaieutique    false    217            E           2606    16546    schema3 schema3_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema3
    ADD CONSTRAINT schema3_pkey PRIMARY KEY (schema3_id);
 >   ALTER TABLE ONLY public.schema3 DROP CONSTRAINT schema3_pkey;
       public            AdminMaieutique    false    217            G           2606    16548    schema4 schema4_image_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_name_key UNIQUE (image_name);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_name_key;
       public            AdminMaieutique    false    219            I           2606    16550    schema4 schema4_image_path_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_image_path_key UNIQUE (image_path);
 H   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_image_path_key;
       public            AdminMaieutique    false    219            K           2606    16552    schema4 schema4_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.schema4
    ADD CONSTRAINT schema4_pkey PRIMARY KEY (schema4_id);
 >   ALTER TABLE ONLY public.schema4 DROP CONSTRAINT schema4_pkey;
       public            AdminMaieutique    false    219            M           2606    16554    sets sets_abreviation_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_abreviation_key UNIQUE (abreviation);
 C   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_abreviation_key;
       public            AdminMaieutique    false    221            O           2606    16556    sets sets_angle1_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle1_key UNIQUE (angle1);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle1_key;
       public            AdminMaieutique    false    221            Q           2606    16558    sets sets_angle2_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_angle2_key UNIQUE (angle2);
 >   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_angle2_key;
       public            AdminMaieutique    false    221            S           2606    16560    sets sets_nom_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_nom_key UNIQUE (nom);
 ;   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_nom_key;
       public            AdminMaieutique    false    221            U           2606    16562    sets sets_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.sets
    ADD CONSTRAINT sets_pkey PRIMARY KEY (position_id);
 8   ALTER TABLE ONLY public.sets DROP CONSTRAINT sets_pkey;
       public            AdminMaieutique    false    221            W           2606    16564    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            AdminMaieutique    false    223            Y           2606    16566    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            AdminMaieutique    false    223            [           2606    16568    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            AdminMaieutique    false    223            �   L   x�eʱ�0�ڞ�%z��Dd�4 �e�!J�>�u^�Kq�(���#|�ז���A�w)����[�wVU} ��I      �   �   x�u��
�0�s�ޥ��f���
���y /�-X��A�9�J����7iz��xN��MzOjY���ԯ�*�@2^�� q�%> 0�PZo�wG ���_/V=,�<L������֫XX,�o��,��;�-����O,?�,Rkk���M
!>:rPi      �   �   x�u��
�@�����u��q���|�."RAv���\\H(��4�Φ�>��\�c�M�|��m����ʖ�����| HAUə�̃�Z��w�d�h5����!y�z>g$A�:��=��-�6��K�c��ߓDK���4�4�����
�2G�j�1��Pi      �     x���1n�0��ٜ����g��)R�	�t�B��Z���r�\���!�o���odyU���Md�l�=���ۛ�we��������tU8-�pΐ�����B@͕FH�c@�pY����fp�|����ܡŚ��C��L�f�/��-7��9�_��j�G�)�M�pu1�#.���L#���4S������l��cȕLZ�Lr��]Y�����?��/,��k-y�	����Z�v���f�����Z�Iŉ�)ɑx�� ����      �   �   x�m�KO�@��5�
�L'sC(�vh�iKjHZ�q3��} �P�_��t��囇�Ƞ7,Y[S�v�+�о�"8�D��!)�!9�'=_E�.�q���(T����ג��M5�]��z�)Y�(n��MT���)�|���{�y�A�q9㏘�k#nAe��5���끉�;x_��9LrvCۏ�k2�v��cU��Y��o�/�P����`�Բk{��?�/b{�E&������XV�     