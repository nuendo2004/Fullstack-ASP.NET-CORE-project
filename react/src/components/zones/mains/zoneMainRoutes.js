import { lazy } from "react";

const TicTacToeMainZone = lazy(() =>
  import("../support/tictactoezone/tictactoe/TicTacToeZone")
);

const zoneMains = [
    {
        id: 7,
        element: TicTacToeMainZone
    }
]

const allMains = [
    ...zoneMains,
]

export default allMains;

