drop table if exists results cascade;

create table results(
  id serial primary key,
  score Integer,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  letters VARCHAR(250),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
