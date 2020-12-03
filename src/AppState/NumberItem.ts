import { makeAutoObservable } from "mobx";

export type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const iterateByAllSudokuValue = (callback: (index: SudokuValue) => void) => {
    callback(1);
    callback(2);
    callback(3);

    callback(4);
    callback(5);
    callback(6);

    callback(7);
    callback(8);
    callback(9);
};


// iterateBySudokuValue((number) => {
//     const shouldShow = values.includes(number);

export class NumberItem {
    value: SudokuValue | null = null;

    constructor() {

        makeAutoObservable(this);
    }
}
