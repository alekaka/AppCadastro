import React from 'react';
import styled from 'styled-components/native';

import {
    Image,
} from 'react-native';

const ImageUser = styled.Image`
  width: 100px; 
  height: 100px;
`;

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
            <ImageUser
                source={{uri: props.data.image }}
            />
            <ItemText>{props.data.name} {props.data.sobrenome}</ItemText>
            <ItemText>{props.data.dataNascimento} {props.data.email}</ItemText>
        </AreaItems>        
    );
};
export default ListItems;