DROP DATABASE IF EXISTS grabaphone;
CREATE DATABASE grabaphone;

\c grabaphone;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT false,
  password TEXT NOT NULL
);

CREATE TABLE keys (
  id SERIAL PRIMARY KEY,
  api_key TEXT NOT NULL,
  user_id INT REFERENCES users,
  restricted BOOLEAN DEFAULT false
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

CREATE TABLE specifications (
  id SERIAL PRIMARY KEY,
  device_id INT REFERENCES devices,
  category TEXT,
  key TEXT,
  value TEXT
);
