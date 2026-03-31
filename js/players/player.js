import { personages } from "./personages.js";

export default class Player {
  constructor(name, speed, hearing, stamina, restoration_of_stamina, color, size) {
    this.name = name;
    this.speed = speed;
    this.hearing = hearing;
    this.stamina = stamina; // Максимум
    this.currentStamina = stamina; // Текущая
    this.restoration_of_stamina = restoration_of_stamina;
    this.staminaTimer = 0; // Счетчик для восстановления
    this.color = color;
    this.size = size;
    this.view = null; // Сюда запишем графику позже
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
    );

    // 2. Создаем визуальную часть
    const graphics = new PIXI.Graphics();
    graphics.beginFill(p.color);
    graphics.drawRect(0, 0, p.size, p.size);
    graphics.endFill();

    // 3. Привязываем графику к классу и возвращаем сам объект игрока
    p.view = graphics;

    return p;
  }
};
