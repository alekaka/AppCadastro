import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
//Importando às configurações do banco de dados e o controler
import SQLiteManager from '../DataBase/SQLiteManager';
import CadastrosController from '../DataBase/controller/CadastrosController';

import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

const Body = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #333333;
`;

const ImageUser = styled.Image`
  width: 100px; 
  height: 100px;
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
  const [ filePath, setFilePath] = useState({});
  const [ image, setImage ] = useState('');
  const [ name, setName ] = useState('');
  const [ sobrenome, setSobrenome ] = useState('');
  const [ dataNascimento, setDataNascimento ] = useState('');
  const [ email, setEmail ] = useState('');
  const cadastros = new CadastrosController();

  useEffect(() => {
    SQLiteManager.initDB()
  });
  //Confiração de permissão de pacote react-native-image-picker
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  //Confiração de permissão de pacote react-native-image-picker
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  //Função pacote react-native-image-picker
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      response = response
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.assets[0].base64);
      console.log('uri -> ', response.assets[0].uri);
      console.log('width -> ', response.assets[0].width);
      console.log('height -> ', response.assets[0].height);
      console.log('fileSize -> ', response.assets[0].fileSize);
      console.log('type -> ', response.assets[0].type);
      console.log('fileName -> ', response.assets[0].fileName);
      setImage('data:'+response.assets[0].type+';base64,'+response.assets[0].base64);
      setFilePath(response.assets[0]);
    });
  };

  const addList = () => {
    if(image && name && sobrenome && dataNascimento && email) {
      const data = {
        image,
        name,
        sobrenome,
        dataNascimento,
        email
      };
      const arrData = [];
      arrData.push(data);
      cadastros.addCadastros(arrData)
        .then(() => {
            alert('Cadastrado com Sucesso!');
            setFilePath({})
            setImage('')
            setName('')
            setSobrenome('')
            setDataNascimento('')
            setEmail('')
            cadastros
            .showCadastros()
            .then((results) => {
              console.log(results)
              props.navigation.navigate('LIST', {
                list: results
              });
            })
            .catch(() => {
                alert('Error ao Mostrar');
            });
        })
        .catch(() => {
            alert('Error ao Cadastrar');
        });
    } else {
      alert('Preencha Todos os Campos')
    }
  }

  const listScreen = ()=>{
    cadastros
    .showCadastros()
    .then((results) => {
      console.log(results)
      props.navigation.navigate('LIST', {
        list: results
      });
    })
    .catch(() => {
        alert('Error ao Mostrar');
    });
  }

  return(
    <Body>
      <BoxInputs>
        <TextoTitulos>Insira seu avatar(foto)</TextoTitulos>
        
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => chooseFile('photo')}>
          <ImageUser
            source={{uri: filePath.base64 ? 'data:'+filePath.type+';base64,'+filePath.base64 : 'data:image/png;base64,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' }}
          />
        </TouchableOpacity>

        <TextoTitulos>Nome:</TextoTitulos>
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
