import { makeAutoObservable } from "mobx";

export type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class NumberItem {
    value: SudokuValue | null = null;

    constructor() {

        makeAutoObservable(this);
    }
}
