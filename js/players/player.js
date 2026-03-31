export default class Player {
  constructor(
    name,
    speed,
    hearing,
    stamina,
    restoration_of_stamina,
    color,
    size,
  ) {
    this.name = name;
    this.speed = speed;
    this.hearing = hearing;
    this.stamina = stamina;
    this.restoration_of_stamina = restoration_of_stamina;
    this.color = color;
    this.size = size;
    this.view = null; // Сюда запишем графику позже
  }
}

export const renderPlayer = async (stats) => {
  // 1. Создаем экземпляр класса (используем другое имя переменной, например p)
  const p = new Player(
    stats.name,
    stats.speed,
    stats.hearing,
    stats.stamina,
    stats.restoration_of_stamina,
    stats.color || 0xff0000, // дефолтный цвет
    stats.size || 50, // дефолтный размер
  );

  // 2. Создаем визуальную часть
  const graphics = new PIXI.Graphics();
  graphics.beginFill(p.color);
  graphics.drawRect(0, 0, p.size, p.size);
  graphics.endFill();

  // 3. Привязываем графику к классу и возвращаем сам объект игрока
  p.view = graphics;

  return p;
};
