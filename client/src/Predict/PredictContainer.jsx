import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import WriteArea from '../DataAccumulation/WriteArea';
const Block = styled.div`
    button {
        margin: 10px 0;
    }
`;
export default function PredictContainer() {
    const [d, setD] = useState('');
    const [result, setResult] = useState([]);
    const [alphabet, setAlphabet] = useState('a');
    const [loading, setLoading] = useState(false);
    const [predict, setPredict] = useState();
    const size = 10;
    const handleClick = async () => {
        setLoading(true);
        const r = await axios.post(`http://${window.location.hostname}:3001/result`, {
            alphabet,
            transformData: result
        });
        setLoading(false);
        console.log(r.data);
        setPredict(r.data.predict);
    };
    return (
        <Block>
            <WriteArea {...{ result, setResult, d, setD, size }}></WriteArea>
            <div>
                <input value={alphabet} onChange={e => setAlphabet(e.target.value)} placeholder="알파벳"></input>
            </div>
            {loading && <div>예측중 ...</div>}
            {!loading && (
                <>
                    <button onClick={handleClick}>결과 예측하기</button>
                    <button
                        onClick={() => {
                            setD('');
                            setPredict(null);
                        }}
                    >
                        지우기
                    </button>
                </>
            )}
            {predict === 0 && <div>올바르지 않습니다.</div>}
            {predict === 1 && <div>잘썼어요!</div>}
        </Block>
    );
}
