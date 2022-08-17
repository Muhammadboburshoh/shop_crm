const createProductEL = document.querySelector('.massage-box') || null;
if (createProductEL) {
  setTimeout(() => {
    createProductEL.classList.add('d-none');
  }, 3000);
}

const productDeleteBtns = document.querySelectorAll('.product-item-delete')


productDeleteBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const result = confirm('Siz haqaiqatdan ');
})