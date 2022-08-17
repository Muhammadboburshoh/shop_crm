const createProductEL = document.querySelector('.massage-box') || null;

if (createProductEL) {
  setTimeout(() => {
    createProductEL.classList.add('d-none');
  }, 3000);
}
