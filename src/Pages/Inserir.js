import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'

export default function Inserir() {

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [genere, setGenere] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

          
  async function Cadastro() {
      await fetch('http://10.139.75.41:5251/api/Clients/InsertClient', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },  body:JSON.stringify
        ({
              
              email: email,
              name: nome,
              genere: genere,
             
          })
        
    })
    .then( res => (res.ok == true) ? res.json() : false )
    .then( json =>{
      setSucesso((json.id) ? true : false);
      setErro((json.id) ? false : true);
  }  )
        .catch( err => setErro( true ))
    } 
  

  return (
    <ScrollView> 
    { sucesso ? <Text style={styles.certao}> Obrigado por cadastrar.</Text>
    :
    <View style={styles.caixainput}>
        <TextInput 
            style={styles.input} 
            placeholder='email'
            TextInput={email} 
            onChangeText={(digitado) => setEmail(digitado)}
        ></TextInput>
        
        <TextInput 
            style={styles.input} 
            placeholder='nome'
            TextInput={nome} 
            onChangeText={(digitado) => setNome(digitado)}
        ></TextInput>
        <TextInput 
            style={styles.input} 
            placeholder='genero'
            TextInput={genere} 
            onChangeText={(digitado) => setGenere(digitado)}
        ></TextInput>
        
        <TouchableOpacity style={styles.btn} onPress={Cadastro}>
            <Text style={styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>
        { erro && <Text>Revise </Text>}
    </View>
    }
</ScrollView>
  )
}
const styles = StyleSheet.create({
  caixainput: {
    alignItems: 'center',
    marginTop: 30

}, input: {
  width: "80%", 
  height: 50,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: 'black',
  padding: 15,
  marginTop: 20,
  marginBottom: 15,
}, btn: {
    backgroundColor: "red",
    color:"black",
    width: "80%",
    height: 50,
    borderRadius: 5
  },
  btnText: {
    color: "white",
    textAlign: "center",
    lineHeight: 60,
    fontSize: 25, 
    fontWeight: "bold",
    marginTop: -8
}, certao:{
    textAlign: 'center',
    marginTop: 350
}
})