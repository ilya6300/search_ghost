import { lvlGame } from "./game.js";

const render = async () => {
  const app = new PIXI.Application();
  await app.init({
    background: "#f7f7f7",
    resizeTo: window,
  });
  document.body.appendChild(app.canvas);

  // 1. Получаем объект уровня и игрока
  const lvlData = await lvlGame();
  const world = lvlData.container; // Это наш PIXI.Container с картой и игроком
  const player = lvlData.player; // Это объект класса Player со свойством .view

  // 2. Добавляем мир на сцену
  app.stage.addChild(world);

  // 3. Запускаем игровой цикл (Ticker) для работы камеры
  app.ticker.add(() => {
    if (!player || !player.view) return;

    // Рассчитываем целевые координаты для "мира"
    // Игрок должен быть в центре экрана: (Экран / 2) - (Позиция игрока * масштаб)
    const targetX = app.screen.width / 2 - player.view.x * world.scale.x;
    const targetY = app.screen.height / 2 - player.view.y * world.scale.y;

    // Применяем координаты к контейнеру мира
    world.x = targetX;
    world.y = targetY;
  });
};

render();
