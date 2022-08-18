const createProductEL = document.querySelector('.massage-box') || null;
if (createProductEL) {
  setTimeout(() => {
    createProductEL.classList.add('d-none');
  }, 3000);
}

const productDeleteBtns = document.querySelectorAll('.product-item-delete');
productDeleteBtns.forEach((btn, i) => {
  btn.addEventListener('click', event => {
    const isRealy = confirm(
      `Productni yoki unga bog'langan tafsilotlarini o'chirishga ishonchingiz komilmi.\nAgar o'chirsangiz unga bog'langan barcha orderlar ham o'chib ketadi!`
    );
    if (isRealy) {
      return true;
    } else {
      event.preventDefault();
    }
  });
});
