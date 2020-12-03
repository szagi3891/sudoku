import { makeAutoObservable } from "mobx";
import { NumberItem, SudokuValue } from "./NumberItem";
import { SudokuSquare } from "./SudokuSquare";
import { getIterateAllTreeIndex, TreeBoxIndexType } from "./ThreeBox";

export class PossibleValues {
    constructor(
        readonly grid: SudokuSquare<SudokuSquare<NumberItem>>,
        readonly level0x: TreeBoxIndexType,
        readonly level0y: TreeBoxIndexType,
        readonly level1x: TreeBoxIndexType,
        readonly level1y: TreeBoxIndexType
    ) {
        makeAutoObservable(this);
    }

    get values(): Array<SudokuValue> {

        // const inputNumber = this.grid.getFrom(this.level0x, this.level0y).getFrom(this.level1x, this.level1y).value;
        // if (inputNumber !== null) {
        //     //return [inputNumber];
        //     return [];
        // }

        const currentNumbersInCeis: Set<SudokuValue> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        //iterowaine po wierszu
        for (const x0 of getIterateAllTreeIndex()) {
            for (const x1 of getIterateAllTreeIndex()) {
                const value = this.grid.getFrom(x0, this.level0y).getFrom(x1, this.level1y).value;
                if (value !== null) {
                    currentNumbersInCeis.delete(value);
                }
            }
        }

        //iterowanie po kolumnie
        for (const y0 of getIterateAllTreeIndex()) {
            for (const y1 of getIterateAllTreeIndex()) {
                const value = this.grid.getFrom(this.level0x, y0).getFrom(this.level1x, y1).value;
                if (value !== null) {
                    currentNumbersInCeis.delete(value);
                }
            }
        }


        //iterowanie po kwadracie
        for (const x1 of getIterateAllTreeIndex()) {
            for (const y1 of getIterateAllTreeIndex()) {
                const value = this.grid.getFrom(this.level0x, this.level0y).getFrom(x1, y1).value;
                if (value !== null) {
                    currentNumbersInCeis.delete(value);
                }
            }
        }

        return Array.from(currentNumbersInCeis);
    }
}