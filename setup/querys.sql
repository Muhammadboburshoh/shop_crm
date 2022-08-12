--kassadagi kerakli ma-lumotlar
select
  p.id,
  p.name,
  p.barcode,
  p.description,
  max(pi.original_price) as original_price,
  max(pi.markup_price) as markup_price,
  sum(pi.count) as count
from
  products as p
join
  product_items as pi on pi.product_id = p.id
where
  p.name ilike '%' || 'abs' ||'%' or p.barcode ilike '%' || 'abs' ||'%'
group by
  p.id,
  p.name,
  p.barcode,
  p.description
order by
  p.id
offset (1 - 1) * 10 limit 10