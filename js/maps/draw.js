export const drawMap = async (map) => {
  console.log(map);

  // Контейнер карты
  const mapContainer = new PIXI.Container();
  // Координаты и размеры общей карты
  mapContainer.x = 0;
  mapContainer.y = 0;

  // Стилизация общей карты
  const border = new PIXI.Graphics();
  mapContainer.addChild(border);
  border.lineStyle(10, map.color, 1); // бордер
  border.drawRect(0, 0, map.size.w, map.size.h); // Размеры контейнера (x, y, width, height)
  border.endFill();
  // Рисуем объекты
  map.objects.forEach((obj) => {
    const objContainer = new PIXI.Container();
    objContainer.x = obj.x;
    objContainer.y = obj.y;

    // Стилизация объекта
    const border = new PIXI.Graphics();
    objContainer.addChild(border);
    border.lineStyle(9, map.color, 1); // бордер
    border.drawRect(0, 0, obj.w, obj.h);
    border.endFill();
    //
    mapContainer.addChild(objContainer); // Добавляем объект на карту
  });

  return { view: mapContainer };
};
