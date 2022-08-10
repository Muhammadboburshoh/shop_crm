create table admins(
  id int generated by default as identity primary key,
  user_id int references users(id),
  role int default 0
);
create table teacher(
  id int generated by default as identity primary key,
  user_id int references users(id),
  status text default 't'
);

create or replace function test(username text, v int) returns int language plpgsql as $$
  declare 
   id int;
  begin
    insert into users(username) values(username) returns id;
    if v = 0 or v = 1 then
      return id;
    end if;
      return 2;
  end;
$$;

CASE 
      WHEN 'a' >= 0 select 'ok';
END;

create or replace function hello() returns varchar language plpgsql as $$
  begin
    return 'abdulloh';
  end;
$$;

create or replace function age1(val varchar) returns int language plpgsql as $$
  begin
    return extract('year' from current_timestamp)::int - extract('year' from cast(val as date))::int;
  end;
$$;

create or replace function find_age(age int) returns table(
  id int,
  username text,
  user_age int,
  data json
) language plpgsql as $$

  begin
    return query select u.id, u.username, u.user_age, u.data from users as u where u.user_age > age;
  end;

$$;

create table user1(
  id int,
  username text
);


create function audit() returns trigger language plpgsql as $$
  begin
    insert into user1(username) values (OLD.username);
    return OLD;
  end;
$$;

create trigger user_audit before delete on users for each row execute procedure audit();