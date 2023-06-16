import { lazy } from "react";

const TicTacToeZoneMenu = lazy(() =>
  import("../support/tictactoezone/tictactoe/TicTacToeZoneMenu")
);
const KArcadeMenu = lazy(() =>
  import("../training/languages/korean/KArcadeMenu")
);

const zoneMenus = [
    {
        id: 7,
        element: TicTacToeZoneMenu,
    },
    {
        id: 10,
        element: KArcadeMenu,
    }
]

const allMenus = [
    ...zoneMenus,
]

export default allMenus;
