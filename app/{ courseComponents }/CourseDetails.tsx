import { View, Text, TouchableOpacity,RefreshControl, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { useUser } from '@clerk/clerk-expo';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import CourseContent from './CourseContent';


export default function CourseDetails({navigation}) {
  const { user } = useUser();
  
  const param=useRoute().params;
  const [course, setCourse]=useState([])
  useEffect(()=>{
    setCourse(param.courseData);
    // console.log(param.courseData);
  },[])

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(true);
    },2000);
  },[]);



  // const Header = () =>{
  //   return(
  //     <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           backgroundColor:'#6c47ff',
  //           paddingTop:50,
  //           paddingLeft:20,
  //           paddingRight:20,
  //           paddingBottom:20
  //         }}>
  //         <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium', color:'#FFFFFF'}}>{user?.emailAddresses[0].emailAddress}</Text>
  //         <TouchableOpacity onPress={() => navigation.openDrawer()}>
	// 		      <Feather
  //             name="menu"
  //             size={24}
  //             color="#FFFFFF"
  //             style={{marginRight: 10}}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //   )
  // }

  return (
    <View style={{ height:'100%', width:'100%'}}>
      {/* <Header/> */}
      <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF', padding:20}} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
          <Text style={{fontSize:23, fontWeight:'bold', fontFamily:'Robot0-medium'}}>{course.title}</Text>
          <Image style={{width:"100%", height:180,  borderRadius:12, borderWidth:1, borderColor:'black', marginTop:10}} source={{uri:course.image}}/>
          <Text style={{fontSize:23, padding:5, fontWeight:'bold'}}>About Course</Text>
          <Text style={{fontSize:15.2, padding:2, lineHeight:20, fontFamily:'Robot0-medium'}}>{course.description}</Text>
          <CourseContent course={course}/>
      </ScrollView>
    </View>
  )
}