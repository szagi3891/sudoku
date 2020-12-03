import { makeAutoObservable } from "mobx";
import { NumberItem, SudokuValue } from "./NumberItem";
import { SudokuSquare } from "./SudokuSquare";
import { iterateByTreeIndex, TreeBoxIndexType } from "./ThreeBox";

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

        const currentNumbersInCeis: Set<SudokuValue> = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        //iterowaine po wierszu
        iterateByTreeIndex((x0) => {
            iterateByTreeIndex((x1) => {
                const value = this.grid.getFrom(x0, this.level0y).getFrom(x1, this.level1y).value;
                if (value !== null) {
                    currentNumbersInCeis.delete(value);
                }
            });
        });

        //iterowanie po kolumnie
        iterateByTreeIndex((y0) => {
            iterateByTreeIndex((y1) => {
                const value = this.grid.getFrom(this.level0x, y0).getFrom(this.level1x, y1).value;
                if (value !== null) {
                    currentNumbersInCeis.delete(value);
                }
            });
        });


        //iterowanie po kwadracie
        iterateByTreeIndex((x1) => {
            iterateByTreeIndex((y1) => {
                const value = this.grid.getFrom(this.level0x, this.level0y).getFrom(x1, y1).value;
                if (value !== null) {
                    currentNumbersInCeis.delete(value);
                }
            });
        });

        return Array.from(currentNumbersInCeis);
    }
}