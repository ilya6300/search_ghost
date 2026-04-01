const man1Stand = new URL("../../images/player/1/stand.png", import.meta.url)
  .href;

export const personages = [
  {
    name: "red",
    id: 0,
    speed: 3, // скорость хотьбы
    hearing: 3, // слух (на какое расстояние слышит)
    stamina: 50, // выносливость
    restoration_of_stamina: 15, // +1 к выносливости через указанное время
    assets: [
      {
        name: "stand",
        source: man1Stand,
        id: 0,
      },
    ],
    color: "green", //
    size: { h: 120, w: 220 }, // Размер ширины и высоты
  },
];
