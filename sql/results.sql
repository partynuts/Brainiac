drop table if exists results cascade;

create table results(
  id serial primary key,
  score Integer(250),
  user_id INTEGER REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
