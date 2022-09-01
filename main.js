window.addEventListener("DOMContentLoaded", () => {
  // Обращаемся к игровому полю из документа
  const canvas = document.querySelector('.game');
  // Делаем поле двухмерным
  const context = canvas.getContext('2d');

  let playerOne = document.querySelector(".playerOne"),
      playerTwo = document.querySelector(".playerTwo");

  // Text <<Game over>>
  const finish = document.querySelector(".gameOver");

  // Players score
  let a = 0, b = 0;

  let playerLeft = document.querySelector(".player1");
  let playerRight = document.querySelector(".player2");

  // Размер игровой клетки
  const grid = 15;

  // Высота платформы
  const paddleHeight = grid * 5;

  // Задаём максимальное расстояние, на которое может подняться платформа
  const maxPaddleY = canvas.height - grid - paddleHeight;

  // Скорость платформы
  let paddleSpeed = 6;
  // Скорость мяча
  let ballSpeed = 5;

  // Левая платформа
  const leftPaddle = {
    // Ставим её по центру
    x: grid * 2,
    y: canvas.height / 2 - paddleHeight / 2,

    // Ширина одна клетка
    width: grid,
    // Высоту берём из константы
    height: paddleHeight,

    // Платформа на старте никуда не движется
    dy: 0,
  };

  // Описываем правую платформу
  const rightPaddle = {
    // Ставим по центру с правой стороны
    x: canvas.width - grid * 3,
    y: canvas.height / 2 - paddleHeight / 2,

    // Задаем такую же ширину и высоту
    width: grid,
    height: paddleHeight,

    // Правая платформа тоже пока никуда не двигается
    dy: 0,
  };

  // Описываем мячик
  const ball = {
    // Он появляется в самом центре
    x: canvas.width / 2,
    y: canvas.height / 2,

    // квадратный размером с клетку
    width: grid,
    height: grid,

    // На старте мяч пока не забит, поэтому
    // убираем признак того, то мяч нужно ввести заново
    resetting: false,

    // Подаем мяч в правый верхний угол
    dx: ballSpeed,
    dy: -ballSpeed,
  };

  // Проверка на то, пересекаются два объекта с известными координатами или нет
  function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
          obj1.x + obj1.width > obj2.x &&
          obj1.y < obj2.y + obj2.height &&
          obj1.y + obj1.height > obj2.y;
  }

  // Главный цикл игры
  function loop() {
    // Очищаем игровое поле
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Тут будет остальное
    if (a == 5) {
      playerRight.style.display = "block";
      finish.style.display = "block";
    } else if (b == 5) {
      playerLeft.style.display = "block";
      finish.style.display = "block";
    } else {
      // Если платформы на предыдущем шаге куда-то двигались — пусть продолжают двигаться
      leftPaddle.y += leftPaddle.dy;
      rightPaddle.y += rightPaddle.dy;

      // Если левая платформа пытается вылезти за игровое поле вниз,
      if (leftPaddle.y < grid) {
        // то оставляем её на месте
        leftPaddle.y = grid;
      } else if (leftPaddle.y > maxPaddleY) { // Проверяем тоже самое сверху
        leftPaddle.y = maxPaddleY;
      }

      // Если левая платформа пытается вылезти за игровое поле вниз,
      if (rightPaddle.y < grid) {
        rightPaddle.y = grid;
      } else if (rightPaddle.y > maxPaddleY) { // Проверяем то же самое сверху
        rightPaddle.y = maxPaddleY;
      }

      // Рисуем платформу белым цветом
      context.fillStyle = 'white';

      // Каждая платформа прямоугльник
      context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
      context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

      // Если мяч на предыдущем шаге куда-то двигался — пусть продолжает двигаться
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Если мяч касается стены снизу — меняем направление по оси У на противоположное
      if (ball.y < grid) {
        ball.y = grid;
        ball.dy *= -1;
      } else if (ball.y + grid > canvas.height - grid) { // Делаем то же самое, если мяч касается стены сверху
        ball.y = canvas.height - grid * 2;
        ball.dy *= -1;
      }

      // Если мяч улетел за игровое поле влево или вправо — перезапускаем его
      if ( (ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
        // Помечаем, что мяч перезапущен, чтобы не зациклиться
        ball.resetting = true;

        if (ball.x < 0) {
          playerOne.innerHTML = Number(++a);
        } else if (ball.x > canvas.width) {
          playerTwo.innerHTML = Number(++b);
        }

        // Даём секунду на подготовку игрокам
        setTimeout(() => {
          // Всё, мяч в игре
          ball.resetting = false;

          // Снова запускаем его из центра
          ball.x = canvas.width / 2;
          ball.y = canvas.height / 2;
        }, 1000);
      }

      // Если мяч коснулся левой платформы,
      if (collides(ball, leftPaddle)) {
        // то отправляем его в обратном направлении
        ball.dx *= -1;

        // Увеличиваем координаты мяча на ширину платформы, чтобы не засчитался новый отскок
        ball.x = leftPaddle.x + leftPaddle.width;
      } else if (collides(ball, rightPaddle)) { // Проверяем и делаем то же самое для правой платформы
        ball.dx *= -1;
        // внизу ф формуле наверное надо написать вместе <<ball.width>> rightPaddle.width
        ball.x = rightPaddle.x - ball.width;
      }

      // Рисуем всё остальное

      // Рисуем мяч
      context.beginPath();
      context.arc(ball.x, ball.y, ball.width, ball.height, 2*Math.PI, true);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'red';
      context.stroke();

      // Рисуем стены
      context.fillStyle = 'lightgrey';
      context.fillRect(0, 0, canvas.width, grid);
      context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

      // Рисуем сетку посередине
      for (let i = grid; i < canvas.height - grid; i += grid * 2) {
        context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
      }

      // Отслеживаем нажатия клавиш
      document.addEventListener('keydown', (e) => {
        // Если нажата клавиша вверх,
        if (e.keyCode == 38) {
          // то двигаем правую платформу вверх
          rightPaddle.dy = -paddleSpeed;
        } else if (e.keyCode == 40) { // Если нажата клавиша вниз,
          // то двигаем правую платформу вниз
          rightPaddle.dy = paddleSpeed;
        }

        if (e.keyCode == 87) { // Если нажата клавиша W,
          // то двигаем левую платформу вверх
          leftPaddle.dy = -paddleSpeed;
        } else if (e.keyCode == 83) { // Если нажата клавиша S,
          // то двигаем левую платформу вниз
          leftPaddle.dy = paddleSpeed;
        }
      });

      // А теперь следим за тем, когда кто-то отпустит клавишу, чтобы остановить движение платформы
      document.addEventListener('keyup', (e) => {
        // Если это стрелка вверх или вниз,
        if (e.keyCode == 38 || e.keyCode == 40) {
          // останавливаем правую платформу
          rightPaddle.dy = 0;
        }

        if (e.keyCode == 83 || e.keyCode == 87) { // А если это W или S,
          // останавливаем левую платформу
          leftPaddle.dy = 0;
        }
      });
    }
  }

  // Запускаем игру
  requestAnimationFrame(loop);
});
