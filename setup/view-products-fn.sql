-- search for sale Products function
drop function searching_products_for_sale;
create or replace function searching_products_for_sale(_search text, _page int, _limit int) returns table(
  id int,
  name text,
  barcode varchar,
  description text,
  count integer,
  markup_price bigint
) language plpgsql as $$
begin
  return query
    select
      p.id as id,
      p.name as name,
      p.barcode as barcode,
      p.description as description,
      sum(pi.count)::integer as count,
      CASE
        WHEN MIN(pi.status) = 'A' THEN max(pi.markup_price)::bigint
      END as markup_price
    from
      products as p
    join
      product_items as pi on pi.product_id = p.id
    where
      p.name ilike '%' || _search || '%' or p.barcode ilike '%' || _search || '%'
    group by
      p.id,
      p.name,
      p.description
    order by
      p.id
    offset (_page - 1) * _limit limit _limit;
end;
$$;

-- all Products for sale function
drop function products_for_sale;
create or replace function products_for_sale(_page int, _limit int) returns table(
  id int,
  name text,
  barcode varchar,
  description text,
  count integer,
  markup_price bigint
) language plpgsql as $$
begin
  return query
    select
      p.id as id,
      p.name as name,
      p.barcode as barcode,
      p.description as description,
      sum(pi.count)::integer as count,
      CASE
        WHEN MIN(pi.status) = 'A' THEN max(pi.markup_price)::bigint
      END as markup_price
    from
      products as p
    join
      product_items as pi on pi.product_id = p.id
    group by
      p.id,
      p.name,
      p.description
    order by
      p.id
    offset (_page - 1) * _limit limit _limit;
end;
$$;

---------------------------------------------------------
-- Admin productlarni tahhrirlashi uchun olib berilgan productlar
drop function searching_products;
create or replace function searching_products(_search text, _page int, _limit int) returns table(
  id int,
  name text,
  barcode varchar,
  description text,
  pi_id int [],
  count int [],
  original_price varchar [],
  markup_price varchar []
) language plpgsql as $$
begin
  return query
    select
      p.id as id,
      p.name as name,
      p.barcode as barcode,
      p.description as description,
      array_agg(pi.id) as pi_id,
      array_agg(pi.count) as count,
      array_agg(pi.original_price) as original_price,
      array_agg(pi.markup_price) as markup_price
    from
      products as p
    left join
      product_items as pi on pi.product_id = p.id
    where
      p.name ilike '%' || _search || '%' or p.barcode ilike '%' || _search || '%'
    group by
      p.id,
      p.name,
      p.description
    order by
      p.id
    offset (_page - 1) * _limit limit _limit;
end;
$$;

-- Admin productlarni tahhrirlashi uchun olib berilgan productlar
drop function all_products;
create or replace function all_products(_page int, _limit int) returns table(
  id int,
  name text,
  barcode varchar,
  description text,
  pi_id int [],
  count int [],
  original_price varchar [],
  markup_price varchar []
) language plpgsql as $$
begin
  return query
    select
      p.id as id,
      p.name as name,
      p.barcode as barcode,
      p.description as description,
      array_agg(pi.id) as pi_id,
      array_agg(pi.count) as count,
      array_agg(pi.original_price) as original_price,
      array_agg(pi.markup_price) as markup_price
    from
      products as p
    left join
      product_items as pi on pi.product_id = p.id
    group by
      p.id,
      p.name,
      p.description
    order by
      p.id
    offset (_page - 1) * _limit limit _limit;
end;
$$;

------------------------------------------
--searching product count
drop function search_products_count;
create or replace function search_products_count(_search text) returns integer language plpgsql as $$
begin
  return 
    (select
      count(*) as count
    from
      products
    where
      name ilike '%' || _search || '%' or barcode ilike '%' || _search || '%');
end;
$$;

------------------------------------------
--Find product
drop function find_product;
create or replace function find_product(_p_id int) returns table(
  id int,
  name text,
  barcode varchar,
  description text
) language plpgsql as $$
begin
  return query
    select
      p.id as id,
      p.name as name,
      p.barcode as barcode,
      p.description as description
    from
      products as p
    where
      p.id = _p_id;
end;
$$;

--Find product and product details
drop function find_product_details;
create or replace function find_product_details(_p_id int, _pi_id int) returns table(
  id int,
  name text,
  barcode varchar,
  description text,
  pi_id int,
  count int,
  original_price varchar,
  markup_price varchar
) language plpgsql as $$
begin
  return query
    select
      p.id as id,
      p.name as name,
      p.barcode as barcode,
      p.description as description,
      pi.id as pi_id,
      pi.count as count,
      pi.original_price as original_price,
      pi.markup_price as markup_price
    from
      products as p
    join
      product_items as pi on pi.product_id = p.id
    where
      p.id = _p_id and pi.id = _pi_id;
end;
$$;
