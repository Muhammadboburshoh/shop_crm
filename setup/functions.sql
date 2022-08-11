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



--create function product_add_p_id() returns trigger language plpgsql as $$ begin
-- insert into
--   product_items(product_id)
-- values
--   (NEW.id);

-- return NEW;

-- end;
-- $$;

-- create trigger product_add_p_id_trigger
-- after
-- insert
--   on products for each row execute procedure product_add_p_id();