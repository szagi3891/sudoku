import * as React from 'react';
import styled from "@emotion/styled";
import { observer } from "mobx-react";
import { SudokuValue } from "src/AppState/NumberItem";
import { makeAutoObservable } from 'mobx';
import { CellType } from 'src/AppState/AppState';

const ItemNumberWrapper = styled('div')`
    position: relative;
    text-align: center;
    font-size: 40px;
    color: blue;
    height: ${props => props.theme.config.itemWidthSize}px;
    line-height: ${props => props.theme.config.itemWidthSize}px;
`;

const Delete = styled('div')`
    position: absolute;
    top: 3px;
    right: 3px;
    width: 20px;
    height: 20px;
    background-color: #ff000030;
    cursor: pointer;
    font-size: 12px;
    line-height: 12px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

class State {
    showDelete: boolean = false;

    constructor(readonly cell: CellType,) {

        makeAutoObservable(this);
    }

    onMouseEnter = () => {
        this.showDelete = true;
    }

    onMouseOut = () => {
        this.showDelete = false;
    }

    onDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();

        this.cell.number.value = null;
    }
}

interface ItemNumberPropsType {
    cell: CellType,
    number: SudokuValue
}

export const ItemNumber = observer((props: ItemNumberPropsType) => {
    const [ state ] = React.useState(() => new State(props.cell));

    return (
        <ItemNumberWrapper onMouseOver ={state.onMouseEnter} onMouseLeave={state.onMouseOut}>
            { props.number }
            { state.showDelete ? <Delete title="Delete" onClick={state.onDelete}>X</Delete> : null }
        </ItemNumberWrapper>
    )
})