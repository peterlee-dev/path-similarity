import styled from 'styled-components';
import DataAccumulationContainer from './DataAccumulation/DataAccumulationContainer';
import TrainingContainer from './Training/TrainingContainer';
import PredictContainer from './Predict/PredictContainer';
const Block = styled.div`
    display: flex;
    hr {
        margin: 0 25px;
    }
`;

function App() {
    return (
        <Block>
            <DataAccumulationContainer></DataAccumulationContainer>
            <hr></hr>
            <TrainingContainer></TrainingContainer>
            <hr></hr>
            <PredictContainer></PredictContainer>
        </Block>
    );
}

export default App;
