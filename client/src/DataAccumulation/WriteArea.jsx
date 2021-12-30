import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { getPointAtEvent } from '../util';
const Block = styled.div`
    svg {
        touch-action: none;
        border: 1px solid black;
        path {
            pointer-events: none;
            fill: none;
            stroke: red;
            stroke-width: 1;
        }
    }
`;
const isSameArr = (arr1, arr2) => Array.isArray(arr1) && Array.isArray(arr2) && arr1.every((el, i) => el === arr2[i]);
export default function WriteArea({ setResult, d, setD, size }) {
    const drawing = useRef(false);
    const stPath = useRef();
    const svg = useRef();
    const handlePointerDown = useCallback(
        e => {
            drawing.current = true;
            const { x, y } = getPointAtEvent(e.nativeEvent, svg.current);
            setD(prev => prev + 'M' + [x, y]);
        },
        [setD]
    );
    const handlePointerMove = useCallback(
        e => {
            if (drawing.current) {
                const { x, y } = getPointAtEvent(e.nativeEvent, svg.current);
                setD(prev => prev + 'L' + [x, y]);
            }
        },
        [setD]
    );
    const handlePointerEnd = useCallback(() => {
        drawing.current = false;
        const bbox = stPath.current.getBBox();
        const s = [(size - 1) / bbox.width, (size - 1) / bbox.height];
        const str = d
            .split(/M|L/)
            .filter(Boolean)
            .map(el => el.split(',').map(Number))
            .map(el =>
                [s[0] * (el[0] - bbox.x), s[1] * (el[1] - bbox.y)]
                    .map(Math.round)
                    .map(el => Math.min(size - 1, Math.max(0, el)))
            )
            .reduce((acc, el, i) => {
                if (acc.some(a => isSameArr(a, el))) {
                    return acc;
                }
                return acc.concat([el]);
            }, []);
        setResult(str);
    }, [setResult, d, size]);

    return (
        <Block>
            <svg
                ref={svg}
                width="150px"
                height="150px"
                viewBox="0 0 150 150"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
            >
                <path ref={stPath} d={d}></path>
            </svg>
        </Block>
    );
}
