drop table if exists results cascade;

create table results(
  id serial primary key,
  score Integer(250),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
