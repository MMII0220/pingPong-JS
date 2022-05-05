document.addEventListener('DOMContentLoaded', () => {
  let cir = document.querySelector('.circle'),
    eff;

  console.log(document.documentElement.clientWidth);

  cir.addEventListener('mouseenter', () => {
    eff1 = Math.ceil(Math.random() * 700);
    eff2 = Math.ceil(Math.random() * 500);

    switch (Math.floor(Math.random() * 2)) {
      case 0:
        cir.style.top = eff1 + 30 + 'px';
        console.log(cir.offsetTop);
        break;
      case 1:
        cir.style.left = eff2 + 30 + 'px';
        console.log(cir.offsetBottom);
        break;
      /* case 2:
        cir.style.right = eff + 30 + 'px';
        console.log(cir.offsetRight);
        break;
      case 3:
        cir.style.left = eff + 30 + 'px';
        console.log(cir.offsetLeft);
        break; */
    }
  });
});
