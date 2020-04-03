CREATE DATABASE app;
CREATE ROLE manager WITH LOGIN PASSWORD 'manager.test';
GRANT ALL PRIVILEGES ON DATABASE app TO manager;
\c app

CREATE TABLE lost_pet (
  ID SERIAL PRIMARY KEY,
  description VARCHAR(60),
  photo VARCHAR(30),
  latitude Decimal(9,6),
  longitude Decimal(9,6)
);

INSERT INTO lost_pet (description, photo, latitude, longitude)
VALUES
('Este es un perrito muy consentido',               '', 5.543523, -73.349775),
('Tiene guantes color chocolate',                   '', 5.556764, -73.345462),
('Le gusta revolcarse en el pasto',                 '', 5.555942, -73.350311),
('Tiene un collar con una placa dorada',            '', 5.551791, -73.356699),
('Esta muy gordo',                                  '', 5.552278, -73.350448),
('Este es un perrito muy bonito',                   '', 5.546861, -73.357879),
('Tiene un parche color chocolate',                 '', 5.545825, -73.358748),
('Le gusta ladrarle a los pajaritos',               '', 5.546861, -73.357879),
('Tiene un collar rojo que dice Nicolas Gutierrez', '', 5.546861, -73.357879),
('Nivel de gordura: 120%',                          '', 5.545825, -73.358748);

ALTER TABLE lost_pet OWNER TO manager;
COMMIT;
