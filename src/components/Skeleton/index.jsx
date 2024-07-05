import React from "react";
import styled, {keyframes} from "styled-components";

const KeyFramesLoading = keyframes`
    0% {
        opacity: 0.25;
    }
    50% {
        opacity: .75;
    }
    100% {
        opacity: 1;
    }
`;

const LoadingSkeleton = styled.div`
    background-color: grey;
    border-radius: 4px;
    margin: 0 0 5px 0;
    min-width: ${(props) => props.width};
    height: ${(props) => props.height};
    animation: ${KeyFramesLoading} 1s infinite alternate;
`;

export default ({width, height}) => <LoadingSkeleton width={width} height={height} />;