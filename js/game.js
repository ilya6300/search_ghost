import { drawMap } from "./maps/draw.js";
import { maps } from "./maps/maps.js";
import { renderPlayer } from "./players/player.js";

export const lvlGame = async () => {
  const lvl = new PIXI.Container();
  const lvlID = maps.find((m) => m.id === 0);

  if (lvlID) {
    const map = await drawMap(lvlID);

    // Передаем настройки игрока
    const playerData = {
      name: "Hero",
      speed: 5,
      hearing: 10,
      stamina: 100,
      restoration_of_stamina: 1,
      color: 0x00ff00,
      size: 40,
    };

    const player = await renderPlayer(playerData);

    // создаём игрока

    player.view.x = lvlID.spawn?.x || 0;
    player.view.y = lvlID.spawn?.y || 0;

    // Добавляем в контейнер
    lvl.addChild(map.view);
    lvl.addChild(player.view);

    // Возвращаем объект, где есть и контейнер, и ссылка на игрока (для камеры)
    return { container: lvl, player: player };
  }
};
