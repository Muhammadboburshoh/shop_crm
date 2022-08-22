create database shop_crm1;

\c shop_crm1;

create table users(
  id int generated by default as identity primary key,
  role smallint not null default 0,
  login varchar(40) not null,
  password varchar(64) not null,
  created_at timestamp with time zone default current_timestamp
);
create unique index uq_user_login_index on users(lower(login));
create extension pgcrypto;


create table products(
  id int generated by default as identity primary key,
  barcode varchar(128),
  name text not null,
  description text,
  sale_price varchar not null,
  is_delete boolean default false,
  user_id int not null,
  created_at timestamp with time zone default current_timestamp,
  CONSTRAINT fk_products_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE SET NULL
);
create unique index uq_product_barcode_index on products(lower(barcode));

create table product_items (
  id int generated by default as identity primary key,
  product_id int not null,
  count int not null,
  original_price varchar,
  created_at timestamp with time zone default current_timestamp,
  CONSTRAINT fk_product_items_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(id)
      ON DELETE SET NULL
);

create table orders(
  id int generated by default as identity primary key,
  status smallint default 0,
  user_id int not null,
  created_at timestamp with time zone default current_timestamp,
  CONSTRAINT fk_orders_user_id
    FOREIGN KEY(user_id) 
      REFERENCES users(id)
      ON DELETE SET NULL
);

create table order_items(
  id int generated by default as identity primary key,
  product_id int not null,
  count int not null,
  price varchar not null,
  original_price varchar not null,
  total_price varchar not null,
  original_total_price varchar not null,
  order_id int not null,
  created_at timestamp with time zone default current_timestamp,
  CONSTRAINT fk_order_items_product_id
    FOREIGN KEY(product_id) 
      REFERENCES products(id)
      ON DELETE SET NULL,
  CONSTRAINT fk_order_items_order_id
    FOREIGN KEY(order_id) 
      REFERENCES orders(id)
      ON DELETE SET NULL
);
