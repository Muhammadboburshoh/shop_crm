--kassadagi kerakli ma-lumotlar

select
  p.id,
  p.name,
  p.barcode,
  p.description,
  max(pi.markup_price) as markup_price,
  sum(pi.count) as count
from
  products as p
  join product_items as pi on pi.product_id = p.id
group by
  p.id,
  p.name,
  p.barcode,
  p.description;