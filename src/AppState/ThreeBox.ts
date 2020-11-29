export type TreeBoxIndexType = 0 | 1 | 2;

type ForEachCallbak<T> = (index: TreeBoxIndexType, value: T) => void;

export const iterateByTreeIndex = (callback: (index: TreeBoxIndexType) => void) => {
    callback(0);
    callback(1);
    callback(2);
};

export class ThreeBox<T> {
    constructor(
        readonly data0: T,
        readonly data1: T,
        readonly data2: T
    ) {
    }

    static createWithIterator<T>(create: (index: TreeBoxIndexType) => T): ThreeBox<T> {
        return new ThreeBox(create(0), create(1), create(2));
    }

    forEach(callback: ForEachCallbak<T>) {
        callback(0, this.data0);
        callback(1, this.data1);
        callback(2, this.data2);
    }

    getFrom(x: TreeBoxIndexType): T {
        if (x === 0) {
            return this.data0;
        }

        if (x === 1) {
            return this.data1;
        }

        return this.data2;
    }
}
