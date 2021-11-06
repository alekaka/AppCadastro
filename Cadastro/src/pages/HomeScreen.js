import React, { useState } from 'react';
import styled from 'styled-components/native';

const Body = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #333333;
`;

const Titulo = styled.Text`
  flex: 1;
  font-size: 18px;
  color: #fff;
  margin-top: 50px;
`;

const BoxInputs = styled.View`
  align-items: center;
  width: 100%;
  margin-top: 150px;
`;

const TextoTitulos = styled.Text`
  font-size: 17px;
  color: #fff;
  align-self: flex-start;
  margin-left: 22px;
  margin-bottom: 10px;
`;

const Input = styled.TextInput`
  width: 90%;
  height: 40px;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const Botao = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50px;
  background-color: #9326ff;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const TextButton = styled.Text`
  font-size: 20px;
  color: #fff;
`;

function HomeScreen(props) {

  const [ name, setName ] = useState('');
  const [ sobrenome, setSobrenome ] = useState('');
  const [ dataNascimento, setDataNascimento ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ list, setList] = useState([]); //Lista 

  const addList = () => {
    list.push(name, sobrenome, dataNascimento,email);
  }

  const listScreen = ()=>{
    setList(list)
    props.navigation.navigate('LIST', {
      list
    });
  }

  return(
    <Body>
      
      <BoxInputs>
        <TextoTitulos>Insira seu avatar(foto)</TextoTitulos>
          
          <TextoTitulos>Nome1:</TextoTitulos>
          <Input onChangeText={e=>setName(e)} value={name}/>
          <TextoTitulos>Sobrenome:</TextoTitulos>
          <Input onChangeText={e=>setSobrenome(e)} value={sobrenome}/>
          <TextoTitulos>Date de Nascimento:</TextoTitulos>
          <Input onChangeText={e=>setDataNascimento(e)} value={dataNascimento}/>
          <TextoTitulos>E-mail:</TextoTitulos>
          <Input onChangeText={e=>setEmail(e)} value={email}/>
      </BoxInputs>
        
        <Botao onPress = {addList}>
          <TextButton>Cadastrar</TextButton>
        </Botao>

        <Botao onPress={listScreen}>
          <TextButton>Ver Cadastros</TextButton>
        </Botao>
    
    </Body>
  );
};
export default HomeScreen;
