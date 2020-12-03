import { NumberItem } from "./NumberItem";
import { PossibleValues } from "./PossibleValues";
import { PossibleValuesLast } from "./PossibleValuesLast";
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
const createGridPossibleLast = (
    gridNumber: SudokuSquare<SudokuSquare<NumberItem>>,
    gridPossible: SudokuSquare<SudokuSquare<PossibleValues>>
): SudokuSquare<SudokuSquare<PossibleValuesLast>> => {
    return SudokuSquare.createWithIterator((level0x, level0y) => {
        return SudokuSquare.createWithIterator((level1x, level1y) => {
            return new PossibleValuesLast(gridNumber, gridPossible, level0x, level0y, level1x, level1y)
        });
    });
}

export interface CellType {
    number: NumberItem,
    possible: PossibleValues,
    possibleLast: PossibleValuesLast,
}

const creatergidView = (
    gridNumber: SudokuSquare<SudokuSquare<NumberItem>>,
    gridPossible: SudokuSquare<SudokuSquare<PossibleValues>>,
    gridPossibleLast: SudokuSquare<SudokuSquare<PossibleValuesLast>>,
): SudokuSquare<SudokuSquare<CellType>> => {

    return SudokuSquare.createWithIterator((level0x, level0y) => {
        return SudokuSquare.createWithIterator((level1x, level1y) => {
            const number = gridNumber.getFrom(level0x, level0y).getFrom(level1x, level1y);
            const possible = gridPossible.getFrom(level0x, level0y).getFrom(level1x, level1y);
            const possibleLast = gridPossibleLast.getFrom(level0x, level0y).getFrom(level1x, level1y);

            return {
                number,
                possible,
                possibleLast,
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
        const gridPossibleLast = createGridPossibleLast(gridNumber, gridPossible);
        this.grid = creatergidView(gridNumber, gridPossible, gridPossibleLast);
    }
}
