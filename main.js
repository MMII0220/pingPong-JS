document.addEventListener('DOMContentLoaded', () => {
  const cir = document.querySelector('.circle');

  cir.addEventListener('mouseenter', () => {
    switch (Math.floor(Math.random() * 2)) {
      case 0:
        cir.style.top = Math.ceil(Math.random() * 650) + 80 + 'px';
        break;
      case 1:
        cir.style.left = Math.ceil(Math.random() * 450) + 80 + 'px';
        break;
    }
  });
});
