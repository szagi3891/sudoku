// import { makeAutoObservable } from "mobx";

export class Config {
    border: number = 1;
    itemWidth: number = 80;

    itemPossibleWidth: number = 20;

    // constructor() {
    //     //makeAutoObservable(this);
    // }

    get itemBorderSize(): number {
        return this.border;
    }

    get itemWidthSize(): number {
        return this.itemWidth ;
    }

    get itemWidthSizeOuther(): number {
        return this.itemWidthSize + 2 * this.itemBorderSize;
    }

    get groupBorderSize(): number {
        return this.border;
    }

    get groupWidthSize(): number {
        return 3 * this.itemWidthSizeOuther;
    }
    
    get groupWidthSizeOuther(): number {
        return this.groupWidthSize + 2 * this.groupBorderSize;
    }

    get allWidth(): number {
        return this.groupWidthSizeOuther * 3;
    }
}

declare module '@emotion/react' {
    export interface Theme {
        config: Config,
    }
  }

