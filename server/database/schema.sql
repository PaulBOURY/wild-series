create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
);

CREATE TABLE category (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100)
);

CREATE TABLE program (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(100) NOT NULL,
  synopsis TEXT NOT NULL,
  poster VARCHAR(255) NOT NULL,
  coutry VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES category(id)
);

