export const createStatsUI = (player) => {
  const allContainer = new PIXI.Container();

  // 1. Общий фон панели статов
  const bg = new PIXI.Graphics().roundRect(0, 0, 180, 100, 8); // Уменьшил высоту, если там только стамина
  // .fill({ color: 0x080808, alpha: 0.1 });
  // .stroke({ width: 1, color: 0x000000 });
  allContainer.addChild(bg);

  // 2. Рамка полоски выносливости (staminaContainer)
  const staminaBarWidth = 180;
  const staminaBarHeight = 23;

  const staminaOutline = new PIXI.Graphics()
    .roundRect(0, 0, staminaBarWidth, staminaBarHeight, 5)
    //     .roundRect(0, 0, 180, 250, 8)
    .fill({ color: 0x080808, alpha: 0.3 })
    .stroke({ width: 2, color: 0xffffff, alpha: 0.5 });

  const nameStaminaOutline = new PIXI.Text({
    text: "Выносливость",
    style: { fontSize: 16, fill: "#FFFFFF" },
  });
  // 1. Устанавливаем центр привязки самого текста
  nameStaminaOutline.anchor.set(0.5);
  // 2. Ставим его в центр полоски (180 / 2 и 20 / 2)
  nameStaminaOutline.x = staminaBarWidth / 2;
  nameStaminaOutline.y = staminaBarHeight / 2;

  staminaOutline.addChild(nameStaminaOutline);
  staminaOutline.x = 20;
  staminaOutline.y = 40;

  // 3. Зеленая заливка (staminaBG)
  const staminaFill = new PIXI.Graphics()
    .roundRect(0, 0, staminaBarWidth, staminaBarHeight, 5)
    .fill({ color: 0x00ff00 }); // Зеленый

  staminaFill.x = 20;
  staminaFill.y = 40;
  allContainer.addChild(staminaFill);
  allContainer.addChild(staminaOutline);

  // Функция для обновления визуального состояния
  allContainer.update = () => {
    // Рассчитываем процент (от 0 до 1)
    const percentage = player.currentStamina / player.stamina;
    // Меняем масштаб заливки по горизонтали
    staminaFill.scale.x = percentage;

    // Опционально: меняем цвет на красный, если стамины мало
    if (percentage < 0.3) {
      staminaFill.tint = 0xff0000;
    } else {
      staminaFill.tint = 0xffffff;
    }
  };

  return allContainer;
};
