import { NumberItem } from "./NumberItem";
import { PossibleValues } from "./PossibleValues";
import { SudokuSquare } from "./SudokuSquare";

const createGrid = (): SudokuSquare<SudokuSquare<NumberItem>> => {
    return SudokuSquare.createWithIterator((_level0x, _level0y) => {
        return SudokuSquare.createWithIterator((_level1x, _level1y) => {
            return new NumberItem()
        });
    });
};

const createGridPossible = (gridNumber: SudokuSquare<SudokuSquare<NumberItem>>): SudokuSquare<SudokuSquare<PossibleValues>> => {
    return SudokuSquare.createWithIterator((level0x, level0y) => {
        return SudokuSquare.createWithIterator((level1x, level1y) => {
            return new PossibleValues(gridNumber, level0x, level0y, level1x, level1y)
        });
    });
}

export interface CellType {
    number: NumberItem,
    possible: PossibleValues,
}

const creatergidView = (
    gridNumber: SudokuSquare<SudokuSquare<NumberItem>>,
    gridPossible: SudokuSquare<SudokuSquare<PossibleValues>>
): SudokuSquare<SudokuSquare<CellType>> => {

    return SudokuSquare.createWithIterator((level0x, level0y) => {
        return SudokuSquare.createWithIterator((level1x, level1y) => {
            const number = gridNumber.getFrom(level0x, level0y).getFrom(level1x, level1y);
            const possible = gridPossible.getFrom(level0x, level0y).getFrom(level1x, level1y);

            return {
                number,
                possible
            }
        });
    });
};

export class AppState {

    readonly grid: SudokuSquare<SudokuSquare<CellType>>;

    selectForInputNumber: NumberItem | null = null;             //nie null, otwiera polę wyboru liczby

    constructor() {
        const gridNumber = createGrid();
        const gridPossible = createGridPossible(gridNumber);
        this.grid = creatergidView(gridNumber, gridPossible);
    }
}
