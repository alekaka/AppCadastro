import React from 'react';
import styled from 'styled-components/native';
import ListItems from '../Components/ListItems';
import { useRoute } from '@react-navigation/native';

const Body = styled.SafeAreaView`
    flex: 1;
    background-color: #333333;
`;

const Listagem = styled.FlatList`
    flex: 1;
`;

function ListScreen() {

    const route = useRoute();

    const list = route.params.list;

    return(
        <Body>
            <Listagem
                //Data recebe o array da lista  
                data={list}
                //renderItem vai ser o componente que vai ter os items da lista
                renderItem = {({item}) => <ListItems data={item}/>}
                keyExtractor={(item) => String(item)} //Cada item vai ser uma chave
                contentContainerStyle={{
                    padding: 20
                }}
            />
        </Body>
    );
};
export default ListScreen;