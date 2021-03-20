import React, { useState,useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
  import firestore from '@react-native-firebase/firestore';

import {
    Input,
    H2,
    Button,
    Spinner,
    View,
    H3,
    Header,
    Body,
    H1,
    Right
} from 'native-base';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomePage = ({ navigation }) => {
    const [userList,setUseraList]=useState()
    const fetchUsers = async () => {
        const users = await firestore()
  .collection('users')
            .get();
        var tempUsers = []
        users._docs.map((each) => {
            if (each._data.id !== user.uid) {
                tempUsers.push(each._data);
            }
            
        })
        setUseraList(tempUsers)
    }
    const [load,setLoad]=useState(true)
    useEffect(() => {
        fetchUsers()
        setTimeout(function () {
            if (!user) {
        navigation.replace("LoginPage")
            } else {
            setLoad(false)
    }; }, 1000);
        
  }, []);

    const { user, logout } = useContext(AuthContext)
    const doLogout = () => {
        navigation.replace("LoginPage")
        logout();
        
    }

    const Item = ({ title }) => (
        <TouchableOpacity style={styles.item}
                            onPress={() => {
                            navigation.navigate("ChatPage",title)
                        }}>
    <Text style={styles.title}>{title.name}</Text>
  </TouchableOpacity>
);

     const renderItem = ({ item }) => (
    <Item title={item} />
  );

    const OnLoad = () => (
        <View style={{
            alignContent: 'center',
        }}>
            <Header style={{
                backgroundColor:'rgba(60,190,100,0.4)',
                alignItems: 'center',
                justifyContent:'center'
            }}>
                
                <Body style={{
                    width:windowWidth*0.9
                }}>
                    {user?<Text style={{
                        alignSelf: 'center',
                        color: '#fff',
                        fontSize: windowWidth * 0.045
                    }}>{user.email.substring(0, user.email.indexOf('@'))}</Text>:<H3>Loading...</H3>}
                </Body>
                <Right style={{marginRight:15}}>
                    <TouchableOpacity
                        onPress={() => {
                            doLogout()
                        }}>
                        <H3 style={{
                            color: '#57f'
                        }}>Logout</H3>
                    </TouchableOpacity>
                </Right>
            </Header>
            <View style={{
                alignSelf: 'center',
                justifyContent:'center'
                }}>
                    {userList ? <FlatList
                            data={userList}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                />:<Spinner color='red' />}
            </View>
            
        </View>
    )

    return(
        <ScrollView>
            {load ? <Spinner color='red' /> :<OnLoad/>
            }
            
    </ScrollView>
    )}

export default HomePage;

const styles = StyleSheet.create({

    item: {
    backgroundColor: 'rgba(10,255,200,0.1)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: windowWidth * 0.9,
    elevation:5
  },
  title: {
    fontSize: 32,
  },
})