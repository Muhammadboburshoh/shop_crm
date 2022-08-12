drop function add_product;
create function add_product(
  _name text,
  _barcode text,
  _count int,
  _original_price text,
  _markup_price text,
  _des text
) returns int language plpgsql as $$ declare p_last_id int;
begin
  insert into
    products(name, barcode, description)
  values
    (_name, _barcode, _des) returning id into p_last_id;

    if p_last_id > 0 then
      insert into
        product_items(product_id, count, original_price, markup_price)
      values
      (
        p_last_id,
        _count,
        _original_price,
        _markup_price
      );
      return 1;
    else
      return 0;
    end if;
end;
$$;

-- search Products function
drop function search_products;
create or replace function search_products(_search text, _page int, _limit int) returns table(
  id int,
  name text,
  barcode varchar,
  description text,
  count integer,
  original_price bigint,
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
      max(pi.original_price)::bigint as original_price,
      max(pi.markup_price)::bigint as markup_price
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


-- all Products function
drop function all_products;
create or replace function all_products(_page int, _limit int) returns table(
  id int,
  name text,
  barcode varchar,
  description text,
  count integer,
  original_price bigint,
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
      max(pi.original_price)::bigint as original_price,
      max(pi.markup_price)::bigint as markup_price
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
