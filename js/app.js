import { btnKeyControl, updateLight } from "./controls/controls.js";
import { lvlGame } from "./game.js";
import { createStatsUI } from "./ui/stats.js";

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
  const ui = createStatsUI(player);
  ui.x = 20; // Отступ от левого края экрана
  ui.y = 20; // Отступ от верхнего края экрана
  // 2. Добавляем мир на сцену
  // world.scale = 0.5;
  // туман
  // 1. Создаем контейнер специально для тумана
  const fogContainer = new PIXI.Container();

  // 2. Черный фон
  const fogBackground = new PIXI.Graphics()
    .rect(0, 0, window.innerWidth, window.innerHeight)
    .fill({ color: 0x000000, alpha: 0.95 });

  // 3. Свет
  const lightMask = new PIXI.Graphics();
  // Используем 'dst_out' или 'erase'
  lightMask.blendMode = "erase";

  fogContainer.addChild(fogBackground);
  fogContainer.addChild(lightMask);

  // ВАЖНО: В v8 для работы blendMode внутри контейнера часто нужно
  // чтобы у контейнера был включен renderGroup (если версия позволяет)
  // или просто добавьте пустой фильтр для принудительного создания текстуры
  fogContainer.filters = [new PIXI.AlphaFilter({ alpha: 1 })];

  app.stage.addChild(world, fogContainer, ui);

  // Инициализируем управление и получаем функцию обновления
  const updateControls = btnKeyControl(player, lvlData.map);

  app.ticker.add(() => {
    // 1. Двигаем игрока
    updateControls();
    updateLight(player, lightMask, app); // Обновляем его зрение
    // 2. Центрируем камеру на игроке
    // Формула: Центр экрана - (Позиция игрока внутри мира * масштаб мира)
    world.x = app.screen.width / 2 - player.view.x * world.scale.x;
    world.y = app.screen.height / 2 - player.view.y * world.scale.y;

    // Опционально: если хотите, чтобы персонаж был ровно по центру своего спрайта
    world.x -= (player.view.width / 2) * world.scale.x;
    world.y -= (player.view.height / 2) * world.scale.y;

    // 1. Логика восстановления стамины (если игрок не бежит)
    if (player.currentStamina < player.stamina && !player.shift) {
      player.currentStamina += player.restoration_of_stamina * 0.1; // Плавное восстановление
    }

    // 2. Обновляем визуальную полоску
    ui.update();
  });
};

render();
