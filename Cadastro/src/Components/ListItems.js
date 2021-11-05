import React from 'react';
import styled from 'styled-components/native';

const AreaItems = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding-top: 7px;
    
`;

const ItemText = styled.Text`
    flex: 1;
    font-size: 20px;
    color: #fff;
    text-align: justify;
`;


function ListItems(props) {
    return(
        <AreaItems>
            <ItemText>{props.data}</ItemText>
        </AreaItems>        
    );
};
export default ListItems;