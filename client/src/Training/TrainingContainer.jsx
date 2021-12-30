import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
const Block = styled.div`
    .loading {
        margin-top: 10px;
    }
`;
export default function TrainingContainer() {
    const [loading, setLoading] = useState(false);
    const [alphabet, setAlphabet] = useState('');
    const [result, setResult] = useState();
    const handleClick = async () => {
        setLoading(true);
        const r = await axios.post(`http://${window.location.hostname}:3001/training`, {
            alphabet
        });
        setLoading(false);
        setResult(r.data.dataCount);
    };
    return (
        <Block>
            <input placeholder="알파벳" value={alphabet} onChange={e => setAlphabet(e.target.value)}></input>
            <button onClick={handleClick}>훈련시키기</button>
            {loading && <div className="loading">훈련중....</div>}
            {result && (
                <div>
                    {alphabet}를 {result}개의 데이터로 학습했습니다.
                </div>
            )}
        </Block>
    );
}
