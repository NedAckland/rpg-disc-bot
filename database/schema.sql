CREATE DATABASE dungeon;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user__id BIGINT
);
CREATE TABLE items (
   id SERIAL PRIMARY KEY,
   owner__id BIGINT,
   name VARCHAR(255),
   value INT,
   buff VARCHAR(255),
   category VARCHAR(255)
);
CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    user__id BIGINT,
    name VARCHAR(255),
    wallet INT,
    level INT,
    xp INT
);

-- INSERT INTO users(name) VALUES ('Cao');
INSERT INTO items(name, owner__id, value, buff, category) VALUES ('Axe of the damned', 469233017995657226, 500, 'Damage', 'Weapon');
INSERT INTO items(name, owner__id, value, buff, category) VALUES ('Shield', 469233017995657226, 20, 'Defense', 'Armour');
INSERT INTO items(name, owner__id, value, buff, category) VALUES ('Apple', 469233017995657226, 5, 'Health', 'Food');

