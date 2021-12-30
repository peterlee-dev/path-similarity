import axios from 'axios';
import React, { useState } from 'react';
import WriteArea from './WriteArea';
import TransformArea from './TransformArea';
import styled from 'styled-components';
const Block = styled.div`
    button {
        font-size: 40px;
    }
`;
export default function DataAccumulationContainer() {
    const [result, setResult] = useState([]);
    const [d, setD] = useState('');
    const size = 10;
    const [value, setValue] = useState(1);
    const [alphabet, setAlphabet] = useState('a');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const r = await axios.post(`http://${window.location.hostname}:3001/path`, {
            originPath: d,
            transformData: result,
            result: Number(value),
            alphabet
        });
        setLoading(false);
        console.log(r.data);
        setD('');
        setResult([]);
    };

    return (
        <Block>
            <WriteArea {...{ result, setResult, d, setD, size }}></WriteArea>
            <TransformArea {...{ result, size }}></TransformArea>
            <form onSubmit={handleSubmit}>
                <div>
                    <span>알파벳: </span>
                    <input name="alphabet" value={alphabet} onChange={e => setAlphabet(e.target.value)}></input>
                </div>
                <div>
                    <span>결과값: </span>
                    <input name="result" value={value} onChange={e => setValue(e.target.value)}></input>
                </div>
                {!loading && (
                    <>
                        <div>
                            <button
                                type="button"
                                onClick={() => {
                                    setD('');
                                    setResult([]);
                                }}
                            >
                                지우기
                            </button>
                        </div>
                        <div>
                            <button type="submit">보내기</button>
                        </div>
                    </>
                )}
                {loading && <div>데이터 쌓는중..</div>}
            </form>
        </Block>
    );
}
