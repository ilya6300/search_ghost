const checkCollision = (newX, newY, playerSize, mapObjects) => {
  for (const obj of mapObjects) {
    if (!obj.collision) continue;

    // Проверка пересечения (AABB collision)
    if (newX < obj.x + obj.w && newX + playerSize > obj.x && newY < obj.y + obj.h && newY + playerSize > obj.y) {
      return true; // Столкновение обнаружено
    }
  }
  return false; // Путь свободен
};

export const btnKeyControl = (player, mapObjects) => {
  const keys = {};
  document.addEventListener("keydown", (e) => (keys[e.key] = true));
  document.addEventListener("keyup", (e) => (keys[e.key] = false));

  return () => {
    if (!player || !player.view) return;

    const isRunning = keys["Shift"] && player.currentStamina > 0;
    const speed = isRunning ? player.speed * 3 : player.speed;

    // Координаты, в которые игрок ХОЧЕТ наступить
    let nextX = player.view.x;
    let nextY = player.view.y;

    if (keys["ArrowUp"]) nextY -= speed;
    if (keys["ArrowDown"]) nextY += speed;
    if (keys["ArrowLeft"]) nextX -= speed;
    if (keys["ArrowRight"]) nextX += speed;

    // 1. Проверяем столкновение по горизонтали
    if (!checkCollision(nextX, player.view.y, player.size, mapObjects)) {
      player.view.x = nextX;
    }

    // 2. Проверяем столкновение по вертикали
    if (!checkCollision(player.view.x, nextY, player.size, mapObjects)) {
      player.view.y = nextY;
    }

    // Логика стамины (остается прежней)
    const isMoving = keys["ArrowUp"] || keys["ArrowDown"] || keys["ArrowLeft"] || keys["ArrowRight"];
    if (isRunning && isMoving) {
      player.currentStamina = Math.max(0, player.currentStamina - 0.2);
    } else if (!keys["Shift"] && player.currentStamina < player.stamina) {
      player.staminaTimer++;
      if (player.staminaTimer >= player.restoration_of_stamina) {
        player.currentStamina = Math.min(player.stamina, player.currentStamina + 1);
        player.staminaTimer = 0;
      }
    }
  };
};
