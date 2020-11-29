import { ThreeBox, TreeBoxIndexType } from "./ThreeBox";

type SudokuSquareCallbackType<T> = (x: TreeBoxIndexType, y: TreeBoxIndexType, value: T) => void;

type ToupleType = [TreeBoxIndexType, TreeBoxIndexType];

const IteratorIndex: Array<ToupleType> = [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
];

export class SudokuSquare<T> {
    readonly data: ThreeBox<ThreeBox<T>>;

    constructor(data: ThreeBox<ThreeBox<T>>) {
        this.data = data;
    }

    static createWithIterator<T>(create: (x: TreeBoxIndexType, y: TreeBoxIndexType) => T): SudokuSquare<T> {
        return new SudokuSquare(
            ThreeBox.createWithIterator(
                (level0x) => ThreeBox.createWithIterator(
                    (level0y) => create(level0x, level0y)
                )
            )
        );
    }

    getFrom(x: TreeBoxIndexType, y: TreeBoxIndexType): T {
        return this.data.getFrom(x).getFrom(y);
    }

    forEach(callback: SudokuSquareCallbackType<T>) {
        for (const [x,y] of IteratorIndex) {
            callback(x, y, this.data.getFrom(x).getFrom(y));
        }
    }
}
