import React, { useState,useContext,useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
  import firestore from '@react-native-firebase/firestore';

import Snackbar from 'react-native-snackbar';
import {
    Input,
    H2,
    Form,
    Item,
    Button,
    H3,
    Spinner
} from 'native-base';
import { AuthContext } from './AuthProvider';


const RegisterPage = ({ navigation }) => {

    const [load,setLoad]=useState(false)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { register,user,setUser } = useContext(AuthContext);

    const reset = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    const signUp = async () => {
        setLoad(true)
            if (password === confirmPassword) {
                await register(email.trim(), password)
                if (auth().currentUser) {
                    setUser(auth().currentUser)
                    const tempUser = auth().currentUser
                    const userData = {
                        id: tempUser.uid,
                        name:tempUser.email.substring(0, tempUser.email.indexOf('@'))
                    }
                        firestore()
                        .collection(`users`)
                        .add({id: tempUser.uid,
                        name:tempUser.email.substring(0, tempUser.email.indexOf('@'))})
                        .then(() => {
                            console.log('User added!');
                        });
                    navigation.replace("HomePage")
        } 
        } else {
            Snackbar.show({
                text: 'Please use your work Email',
                backgroundColor:'#f50',
                duration: Snackbar.LENGTH_SHORT,
            });
            
        }
        reset();
        setLoad(false)
    }
    return(
    <ScrollView style={{backgroundColor:'#fff'}}>
            <Form style={{
                marginHorizontal: 20,
                marginTop: 15
            }}>
                    <Item rounded style={styles.formItem}>
                    <Input
                        placeholder="Email"
                        style={{ color: "#424467" }}
                        value={email}
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onChangeText={(text) => setEmail(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Password"
                        style={{color: "#424467"}}
                        value={password}
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(text) => setPassword(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Password"
                        style={{color: "#424467"}}
                        value={confirmPassword}
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={(text) => setConfirmPassword(text)}
                        />
                    </Item>
                {load ? <Spinner /> : <Button rounded block
                    onPress={() => signUp()}
                >
                    <Text style={{ color: "#eee" }}>Sign Up</Text>
                </Button>}
            </Form>
    </ScrollView>
    )}

export default RegisterPage;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#1b262c',
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#00b7c2',
      marginHorizontal: 5,
      marginTop: 50,
      marginBottom: 20,
    },
    formItem: {
      marginBottom: 21,
    },
  });