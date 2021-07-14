import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [estado, setEstado] = useState('leitura');
  const [anotacao, setAnotacao] = useState('');

  useEffect(() => {

    (async () => {
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setAnotacao(anotacaoLeitura);
      }catch(e){
        console.log(e);
      }
    })();

  },[])

  

  setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao',anotacao);
    }catch(e){
      console.log(e);
    }
    alert('Sua Anotação foi Salva!');
  }


  function atualizarTexto(){
    setEstado('leitura');
    setData();
  }



  if (estado == 'leitura'){
    return (
      <View style={{flex:1}}>
        <StatusBar style='light'/>
        <View style={styles.header}><Text style={styles.textoHeader}>Aplicativo Anotação</Text></View>

        {
          (anotacao == '')?
          <View style={{padding: 20}}><Text style={{opacity: 0.3}}>Nenhuma Anotação Encontrada!</Text></View>
          :
          <View style={{padding: 20}}><Text style={styles.anotacao}>{anotacao}</Text></View>
        }        
        
        <TouchableOpacity onPress={() => {setEstado('atualizando')}} style={styles.btnAnotacao}>
          {
            (anotacao == '')?
            <Text style={styles.btnAnotacaoTexto}>+</Text>
            :
            <Text style={{color: 'white', fontSize:16, textAlign: 'center', top: 10}}>Edit</Text>
          }            
        </TouchableOpacity>
      </View>
    );
  }else if (estado == 'atualizando'){
    return (
      <View style={{flex: 1}}>
        <StatusBar style='light'/>
        <View style={styles.header}><Text style={styles.textoHeader}>Aplicativo Anotação</Text></View>

        <TextInput autoFocus={true} onChangeText={(text) => {setAnotacao(text)}} style={{padding: 10, textAlignVertical: 'top'}} value={anotacao} multiline={true} numberOfLines={15}></TextInput>
        
        <TouchableOpacity onPress={() => {atualizarTexto()}} style={styles.btnSalvar}><Text style={styles.btnSalvarTexto}>Salvar</Text></TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  header:{
    width: '100%',
    padding: 20,
    paddingTop: 30,
    backgroundColor: '#069'
  },
  textoHeader: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  anotacao: {
    fontSize: 13
  },
  btnAnotacao: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25
  },
  btnAnotacaoTexto: {
    position: 'relative',
    color: 'white',
    top: 0,
    textAlign: 'center',
    fontSize: 30
  },
  btnSalvar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    height: 50,
    backgroundColor: '#5992e3',
    borderRadius: 10
  },
  btnSalvarTexto: {
    position: 'relative',
    color: 'white',
    top: 8,
    textAlign: 'center',
    fontSize: 20
  }

});
