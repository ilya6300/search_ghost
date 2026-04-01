import { personages } from "./personages.js";

export default class Player {
  constructor(
    name,
    speed,
    hearing,
    stamina,
    restoration_of_stamina,
    color,
    size,
    assets,
  ) {
    this.name = name;
    this.speed = speed;
    this.hearing = hearing;
    this.stamina = stamina; // Максимум
    this.currentStamina = stamina; // Текущая
    this.restoration_of_stamina = restoration_of_stamina;
    this.staminaTimer = 0; // Счетчик для восстановления
    this.color = color;
    this.sizeOriginal = size;
    this.size = size;
    this.view = null;
    this.assets = assets;
    this.rotation = false;
    this.shift = false;
  }
}

export const renderPlayer = async () => {
  // Выбирам персонажа
  const playerID = personages.find((p) => p.id === 0);
  if (playerID) {
    // 1. Создаем экземпляр класса (используем другое имя переменной, например p)
    const p = new Player(
      playerID.name,
      playerID.speed,
      playerID.hearing,
      playerID.stamina,
      playerID.restoration_of_stamina,
      playerID.color,
      playerID.size,
      playerID.assets,
    );

    // 1. Загружаем текстуру по URL
    const texture = await PIXI.Assets.load(playerID.assets[0].source);

    // 2. Создаем спрайт из текстуры
    const sprite = new PIXI.Sprite(texture);

    // 3. Настраиваем размеры (используем ваш параметр size)
    sprite.width = playerID.size.w;
    sprite.height = playerID.size.h;

    // ВАЖНО: Устанавливаем центр вращения в середину спрайта
    sprite.anchor.set(0.5);

    // 4. Записываем готовый спрайт в свойство view объекта класса
    p.view = sprite;

    return p;
  }
};
