import React from 'react';
import styled from 'styled-components';
const Block = styled.div`
    svg {
        border: 1px solid black;
        rect {
            pointer-events: none;
            fill: blue;
        }
    }
`;
export default function TransformArea({ result, size }) {
    return (
        <Block>
            <svg width="150px" height="150px" viewBox={`0 0 ${size} ${size}`}>
                {result.map((el, i) => (
                    <rect key={i} x={el[0]} y={[el[1]]} width="1" height="1"></rect>
                ))}
            </svg>
        </Block>
    );
}
