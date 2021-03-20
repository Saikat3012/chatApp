import React, { useState,useContext} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {
    Input,
    H1,
    Form,
    Item,
    Button,
    Spinner,
} from 'native-base';
import { AuthContext } from './AuthProvider';
import Snackbar from 'react-native-snackbar';



const LoginPage = ({ navigation }) => {
    const [load,setLoad]=useState(false)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, user,setUser } = useContext(AuthContext);
    const reset = () => {
        setEmail('')
        setPassword('')
        setLoad(false)
    }

    const doLogin = async () => {
        setLoad(true)
        if (email && password) {
            await login(email.trim(), password)
            if (auth().currentUser) {
                setUser(auth().currentUser)
                navigation.replace("HomePage")
            } else {
                Snackbar.show({
                    text: 'Please check your email and password.',
                    backgroundColor: '#f00',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
            reset()
            setLoad(false)
        } else {
            Snackbar.show({
                    text: 'Please fill email and password',
                    backgroundColor: '#f00',
                    duration: Snackbar.LENGTH_SHORT,
            });
            reset()
        }
    }

    return(
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <H1 style={{
                alignSelf: 'center',
                margin: 8,
                marginTop:15
            }}>WellCome</H1>
            <Form style={{
                marginHorizontal: 20,
                marginTop: 15
            }}>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Email"
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        style={{color: "#424467"}}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        />
                    </Item>
                    <Item rounded style={styles.formItem}>
                        <Input
                        placeholder="Password"
                        textContentType="password"
                        style={{color: "#424467"}}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        />
                </Item>
                <View style={{height:40}}>
                {load ? <Spinner /> : <Button rounded block
                    onPress={() => doLogin()}
                    >
                        
                    <Text style={{ color: "#eee" }}>Log In</Text>
                    </Button>}
                </View>
            </Form>
            <TouchableOpacity style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop:30
            }}
            onPress={()=>navigation.navigate("RegisterPage")}>
                <Text style={{fontSize:17}}>New User?</Text><Text style={{
                    marginLeft: 3,
                    color: '#1d53e5',
                    fontSize:18
                }}>Register</Text>
            </TouchableOpacity>
    </ScrollView>
    )}

export default LoginPage;

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