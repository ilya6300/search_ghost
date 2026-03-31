import { btnKeyControl } from "./controls/controls.js";
import { lvlGame } from "./game.js";

const render = async () => {
  const app = new PIXI.Application();
  await app.init({
    background: "#f7f7f7",
    resizeTo: window,
  });
  document.body.appendChild(app.canvas);
  btnKeyControl();
  // 1. Получаем объект уровня и игрока
  const lvlData = await lvlGame();
  const world = lvlData.container; // Это наш PIXI.Container с картой и игроком
  const player = lvlData.player; // Это объект класса Player со свойством .view

  // 2. Добавляем мир на сцену
  app.stage.addChild(world);

  // Инициализируем управление и получаем функцию обновления
  const updateControls = btnKeyControl(player, lvlData.map.objects);

  app.ticker.add(() => {
    // 1. Двигаем игрока
    updateControls();

    // 2. Центрируем камеру на игроке
    // Формула: Центр экрана - (Позиция игрока внутри мира * масштаб мира)
    world.x = app.screen.width / 2 - player.view.x * world.scale.x;
    world.y = app.screen.height / 2 - player.view.y * world.scale.y;

    // Опционально: если хотите, чтобы персонаж был ровно по центру своего спрайта
    world.x -= (player.view.width / 2) * world.scale.x;
    world.y -= (player.view.height / 2) * world.scale.y;
  });
};

render();
