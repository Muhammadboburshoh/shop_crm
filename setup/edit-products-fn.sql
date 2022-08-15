--add new and detalis product
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

--update product and detalis
drop function update_product;
create function update_product(
  _p_id int,
  _pi_id int,
  _name text,
  _barcode text,
  _count int,
  _original_price text,
  _markup_price text,
  _des text
) returns int language plpgsql as $$ declare p_last_id int;
declare
  _p_last_id int;
  _pi_last_id int;
begin

    update products
    set
      name = _name,
      barcode = _barcode,
      description = _des
    where
      id = _p_id
    returning id into _p_last_id;

    if _pi_id = 0 then
      insert into
          product_items(product_id, count, original_price, markup_price)
        values
        (
          _p_last_id,
          _count,
          _original_price,
          _markup_price
        ) returning id into _pi_last_id;
    else
      update product_items
      set
        count = _count,
        original_price = _original_price,
        markup_price = _markup_price
      where
        id = _pi_id 
      returning id into _pi_last_id;
    end if;

    if _p_last_id > 0 and _pi_last_id > 0 then
      return 1;
    else
      return 0;
    end if;
end;
$$;