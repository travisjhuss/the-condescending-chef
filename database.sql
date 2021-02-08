-- create database named 'the-condescending-chef'


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 1,
    "profile_photo" VARCHAR
);

-- table to hold recipe data
CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"description" VARCHAR,
	"photo" VARCHAR,
	"marked_for_review" BOOLEAN DEFAULT false,
	"url" VARCHAR,
	"date" TIMESTAMP DEFAULT NOW() NOT NULL,
	"chef_grade" VARCHAR,
	"chef_feedback" VARCHAR
);

-- ingredient data joins on recipe id
CREATE TABLE "ingredients" (
	"id" SERIAL PRIMARY KEY,
	"recipe_id" INT REFERENCES "recipes" NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"unit" VARCHAR(100) NOT NULL,
	"amount" INT NOT NULL
);

-- list of tags for the recipes
CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"tag" VARCHAR(100) NOT NULL
);

-- joins tags and recipes
CREATE TABLE "tags_recipes" (
	"id" SERIAL PRIMARY KEY,
	"tags_id" INT REFERENCES "tags" NOT NULL,
	"recipes_id" INT REFERENCES "recipes" NOT NULL
);

-- joins user and recipes they favorite
CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"recipes_id" INT REFERENCES "recipes" NOT NULL
);