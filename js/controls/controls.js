const marginCollision = 10;

const checkCollision = (newX, newY, pSize, mapObjects, mapCoords, rotation) => {
  for (const obj of mapObjects) {
    // Пропускаем объекты без флага collision: true
    if (!obj.collision) continue;

    const wallX = !rotation
      ? mapCoords.x + obj.x
      : mapCoords.x - marginCollision + obj.x;
    const wallY = mapCoords.y - marginCollision + obj.y;

    // Проверка пересечения
    const hitX = newX < wallX + obj.w && newX + pSize.w > wallX;
    const hitY = newY < wallY + obj.h && newY + pSize.h > wallY;

    if (hitX && hitY) return true;
  }
  return false;
};

export const btnKeyControl = (player, currentMap) => {
  const keys = {};
  document.addEventListener("keydown", (e) => (keys[e.key] = true));
  document.addEventListener("keyup", (e) => (keys[e.key] = false));

  return () => {
    if (!player || !player.view) return;

    const isRunning = keys["Shift"] && player.currentStamina > 0;
    const speed = isRunning ? player.speed * 2 : player.speed;

    let nextX = player.view.x;
    let nextY = player.view.y;
    let rotation = player.view.rotation;

    // Определяем направление и угол
    if (keys["ArrowUp"]) {
      nextY -= speed;
      rotation = 0;
      player.size.w = player.sizeOriginal.w;
      player.size.h = player.sizeOriginal.h;
      player.rotation = false;
    }
    if (keys["ArrowDown"]) {
      nextY += speed;
      rotation = Math.PI;
      player.size.w = player.sizeOriginal.w;
      player.size.h = player.sizeOriginal.h;
      player.rotation = false;
    }
    if (keys["ArrowLeft"]) {
      nextX -= speed;
      rotation = -Math.PI / 2; // Влево
      player.size.w = player.sizeOriginal.h;
      player.size.h = player.sizeOriginal.w;
      player.rotation = true;
    }
    if (keys["ArrowRight"]) {
      nextX += speed;
      rotation = Math.PI / 2; // Вправо
      player.size.w = player.sizeOriginal.h;
      player.size.h = player.sizeOriginal.w;
      player.rotation = true;
    }

    // Обработка диагоналей (по желанию)
    if (keys["ArrowUp"] && keys["ArrowRight"]) rotation = Math.PI / 4;
    if (keys["ArrowUp"] && keys["ArrowLeft"]) rotation = -Math.PI / 4;
    if (keys["ArrowDown"] && keys["ArrowRight"]) rotation = (3 * Math.PI) / 4;
    if (keys["ArrowDown"] && keys["ArrowLeft"]) rotation = (-3 * Math.PI) / 4;

    // Применяем поворот
    player.view.rotation = rotation;

    // Проверка по горизонтали
    if (
      !checkCollision(
        nextX,
        player.view.y,
        player.size,
        currentMap.objects,
        currentMap.coordinates,
        rotation,
      )
    ) {
      player.view.x = nextX;
    }

    // Проверка по вертикали
    if (
      !checkCollision(
        player.view.x,
        nextY,
        player.size,
        currentMap.objects,
        currentMap.coordinates,
        rotation,
      )
    ) {
      player.view.y = nextY;
    }

    // Логика стамины (остается прежней)
    const isMoving =
      keys["ArrowUp"] ||
      keys["ArrowDown"] ||
      keys["ArrowLeft"] ||
      keys["ArrowRight"];
    if (isRunning && isMoving) {
      player.currentStamina = Math.max(0, player.currentStamina - 0.2);
      player.shift = true;
    } else if (!keys["Shift"] && player.currentStamina < player.stamina) {
      player.staminaTimer++;
      if (player.staminaTimer >= player.restoration_of_stamina) {
        player.currentStamina = Math.min(
          player.stamina,
          player.currentStamina + 1,
        );
        player.staminaTimer = 0;
      }
    } else {
      player.shift = true;
    }
  };
};
export const updateLight = (player, mask, app) => {
  mask.clear();

  // Если камера центрирована на игроке, он всегда в середине экрана
  const screenX = app.screen.width / 2;
  const screenY = app.screen.height / 2;

  // Угол поворота персонажа
  const angle = player.view.rotation;
  const viewDistance = 600; // Дальность
  const viewAngle = Math.PI / 2.5; // Угол (около 70 градусов)

  // Начинаем рисовать конус
  mask.moveTo(screenX, screenY);

  const segments = 30;
  for (let i = 0; i <= segments; i++) {
    const step = (i / segments) * viewAngle - viewAngle / 2;
    const lineX = screenX + Math.cos(angle + step) * viewDistance;
    const lineY = screenY + Math.sin(angle + step) * viewDistance;
    mask.lineTo(lineX, lineY);
  }

  mask.lineTo(screenX, screenY);
  mask.fill(0xffffff); // Цвет не важен, он работает как "ластик"

  // Добавим небольшой круг вокруг игрока (периферийное зрение)
  mask.circle(screenX, screenY, 100).fill(0xffffff);
};
