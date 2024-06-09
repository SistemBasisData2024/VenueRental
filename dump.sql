CREATE TYPE "type_available" AS ENUM (
  'Available',
  'Inavailable'
);

CREATE TYPE "type_role" AS ENUM (
  'Buyer',
  'Owner'
);

CREATE TABLE "reviews" (
  "review_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" integer REFERENCES users(user_id) NOT NULL,
  "venue_id" integer REFERENCES venues(venue_id) NOT NULL,
  "rating" integer NOT NULL,
  "comment" text NOT NULL,
  "review_date" timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "phone_number" varchar NOT NULL,
  "role" type_role NOT NULL
);

CREATE TABLE "venues" (
  "venue_id" SERIAL PRIMARY KEY NOT NULL,
  "owner_id" integer REFERENCES users(user_id) NOT NULL,
  "name" varchar NOT NULL,
  "location" varchar NOT NULL,
  "description" text NOT NULL,
  "capacity" integer NOT NULL,
  "price" decimal NOT NULL,
  "facilities" text NOT NULL,
  "availability" type_available NOT NULL,
  "images" text NOT NULL
);

CREATE TABLE "bookings" (
  "booking_id" SERIAL PRIMARY KEY NOT NULL,
  "user_id" integer REFERENCES users(user_id) NOT NULL,
  "venue_id" integer REFERENCES venues(venue_id) NOT NULL,
  "booking_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "event_date" date NOT NULL,
  "duration" integer NOT NULL,
  "total_price" decimal NOT NULL,
  "status" varchar NOT NULL
);
