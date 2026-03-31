import { drawMap } from "./maps/draw.js";
import { maps } from "./maps/maps.js";
import { renderPlayer } from "./players/player.js";

export const lvlGame = async () => {
  const lvl = new PIXI.Container();
  const lvlID = maps.find((m) => m.id === 0);

  if (lvlID) {
    const map = await drawMap(lvlID);

    const player = await renderPlayer();

    // создаём игрока

    player.view.x = lvlID.spawn.x;
    player.view.y = lvlID.spawn.y;

    // Добавляем в контейнер
    lvl.addChild(map.view);
    lvl.addChild(player.view);

    // Возвращаем объект, где есть и контейнер, и ссылка на игрока (для камеры)
    return { container: lvl, player: player, map: lvlID };
  }
};
