DROP DATABASE IF EXISTS grabaphone;
CREATE DATABASE grabaphone;

\c grabaphone;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE keys (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users
);

CREATE TABLE manufacturers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  manufacturer_id INT REFERENCES manufacturers,
  name TEXT NOT NULL
);