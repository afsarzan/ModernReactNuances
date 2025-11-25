-- Schema for generated_pokaimon table
CREATE TABLE IF NOT EXISTS generated_pokaimon (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(100),
  powers JSONB,
  characteristics TEXT,
  image_url TEXT,
  doodle_source TEXT,
  like_count INTEGER NOT NULL DEFAULT 0,
  action_images JSONB DEFAULT '{}'::jsonb
);
