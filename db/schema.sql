DROP DATABASE IF EXISTS websites_dev;
CREATE DATABASE websites_dev;

\c websites_dev;

CREATE TABLE websites (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 url TEXT,
 category TEXT,
 is_favorite BOOLEAN
);

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
 id SERIAL PRIMARY KEY,
 reviewer TEXT,
 title TEXT,
 content TEXT,
 rating NUMERIC,
 CHECK (rating >= 0 AND rating <= 5),
 website_id INTEGER REFERENCES websites (id)
 ON DELETE CASCADE
);