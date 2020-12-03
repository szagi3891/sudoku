import { makeAutoObservable } from "mobx";
import { NumberItem, SudokuValue } from "./NumberItem";
import { PossibleValues } from "./PossibleValues";
import { SudokuSquare } from "./SudokuSquare";
import { getIterateAllTreeIndex, TreeBoxIndexType } from "./ThreeBox";

type SelectFromGridType = (a: TreeBoxIndexType, b: TreeBoxIndexType) => Array<SudokuValue>;
type IsNumberFilledType = (a: TreeBoxIndexType, b: TreeBoxIndexType) => boolean;

const iterateBy = (isNumberFilled: IsNumberFilledType): Array<[TreeBoxIndexType, TreeBoxIndexType]> => {
    const out: Array<[TreeBoxIndexType, TreeBoxIndexType]> = [];

    for (const x0 of getIterateAllTreeIndex()) {
        for (const x1 of getIterateAllTreeIndex()) {
            if (isNumberFilled(x0, x1) === false) {
                out.push([x0, x1]);
            }
        }
    }

    return out;
};

const getPossibleValue = (
    isNumberFilled: IsNumberFilledType,
    getCurrent: () => Array<SudokuValue>,
    selectFromGrid: SelectFromGridType
): SudokuValue | null => {
    for (const possibleValue of getCurrent()) {

        let count = 0;

        for (const [check_x0, check_x1] of iterateBy(isNumberFilled)) {
            if (selectFromGrid(check_x0, check_x1).includes(possibleValue)) {
                count++;
            }
        }

        if (count === 1) {
            return possibleValue;
        }
    }

    return null;
}

export class PossibleValuesLast {
    constructor(
        readonly gridInput: SudokuSquare<SudokuSquare<NumberItem>>,
        readonly grid: SudokuSquare<SudokuSquare<PossibleValues>>,
        readonly level0x: TreeBoxIndexType,
        readonly level0y: TreeBoxIndexType,
        readonly level1x: TreeBoxIndexType,
        readonly level1y: TreeBoxIndexType
    ) {
        makeAutoObservable(this);
    }

    getCurrent = (): Array<SudokuValue> => {
        return this.grid.getFrom(this.level0x, this.level0y).getFrom(this.level1x, this.level1y).values;
    }

    get valueByRow(): SudokuValue | null {
        //iterowaine po wierszu
        return getPossibleValue(
            (x0, x1) => this.gridInput.getFrom(x0, this.level0y).getFrom(x1, this.level1y).value !== null,
            this.getCurrent,
            (x0, x1) => this.grid.getFrom(x0, this.level0y).getFrom(x1, this.level1y).values
        );
    }

    get valueByCol(): SudokuValue | null {
        // //iterowanie po kolumnie
        return getPossibleValue(
            (y0, y1) => this.gridInput.getFrom(this.level0x, y0).getFrom(this.level1x, y1).value !== null,
            this.getCurrent,
            (y0, y1) => this.grid.getFrom(this.level0x, y0).getFrom(this.level1x, y1).values
        );
    }

    get valueBySquare(): SudokuValue | null {
        // //iterowanie po kwadracie
        return getPossibleValue(
            (x1, y1) => this.gridInput.getFrom(this.level0x, this.level0y).getFrom(x1, y1).value !== null,
            this.getCurrent,
            (x1, y1) => this.grid.getFrom(this.level0x, this.level0y).getFrom(x1, y1).values
        );
    }

    get value(): SudokuValue | null {
        const byRow = this.valueByRow;
        if (byRow !== null) {
            return byRow;
        }

        const byCol = this.valueByCol;
        if (byCol !== null) {
            return byCol;
        }

        const bySquare = this.valueBySquare;
        if (bySquare !== null) {
            return bySquare;
        }

        return null;
    }
}