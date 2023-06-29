import { View, Text, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Styles from './Styles';
import { EmpName } from '../../../Json/EmpName';
import Header from '../../../Common/Header';
import { useNavigation } from '@react-navigation/native';

const User = () => {
    const navigation = useNavigation()
    const [data, setData] = useState(EmpName)
    const [search, setSearch] = useState("")
    // const getData=()=>{
    //     fetch('https://regres.in/api/users?page=2')
    //     .then(res => res.json())
    //     .then(json => { console.log(json);;
    //      })
    // }
    // useEffect(()=>{
    //     getData()
    //   },[])
    const handleSearch = (e) => {
        if (e) {
            const newData = EmpName.filter((val) => {
                let first_name = val.first_name.toLowerCase();
                let last_name = val.last_name.toLowerCase();
                return first_name.includes(e.toLowerCase()) || last_name.includes(e.toLowerCase()) 
            })
            setData(newData)
        }
        else {
            setData(EmpName)
        }
    }
    return (
        <View style={Styles.container}>
            <Header
                title={'SearchScreen'}
                leftIcon={require('../../../Images/arrowWhite.png')}
                onClickLeftIcon={() => {
                    navigation.goBack()
                }}
            />
            <View style={Styles.inpuBox}>
                <Image source={require('../../../Images/search.png')} />
              
               <TextInput
                style={{width:search !== ''?'75%':'90%',alignItems:'center',justifyContent:'center',alignSelf:'center'}}
                    value={search}
                    onChangeText={(e) => {
                        handleSearch(e)
                        setSearch(e)
                    }}
                />
               {
                    search !== '' &&
                    <TouchableOpacity
                    onPress={()=>{
                        setSearch('')
                        setData({
                            ...data
                        })
                    }}
                    >
                        <Image source={require('../../../Images/cancelButton.png')} />
                    </TouchableOpacity>
                }
              
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: '#fff', position: 'relative', alignItems: 'center', marginVertical: 20, marginHorizontal: 50, padding: 20, borderWidth: 2, borderRadius: 20 }}>
                                <Image style={{ height: 250, width: 250, alignSelf: 'center', borderRadius: 20 }} source={{ uri: item.avatar }} />
                                <View style={{ backgroundColor: '#000', height: 50, width: 50, position: 'absolute', right: -25, top: -20, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: '#fff' }}>{item.id}</Text>
                                </View>
                            </View>
                            <Text style={Styles.text}>{item.first_name}_{item.last_name}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}
export default User
