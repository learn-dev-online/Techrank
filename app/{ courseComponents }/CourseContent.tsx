import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function CourseContent({course}) {

  const navigation=useNavigation();

    const onPressButton=(course)=>{
      // console.log("Course", courseList)
      navigation.navigate('Video', {courseData:course});
    }
  
  return (
    <View style={{height:'100%', paddingBottom:60, paddingTop:30}}>
      <Text style={{fontSize:28, fontWeight:'bold'}}>Course Content</Text>
      <FlatList
         data={course.Topics}
         renderItem={({item, index})=>(
            <TouchableOpacity style={{flexDirection:'row', borderWidth:1, padding:12, justifyContent: "space-between", borderRadius:12, marginTop:10}} onPress={()=>onPressButton(item)}>
                <View style={{flexDirection:'row', gap:10}}>
                  <Text style={{fontSize:20, fontWeight:'bold'}}>{index+1}</Text>
                  <Text style={{fontSize:20, fontWeight:'bold',}}>{item.Title}</Text>
                </View>
                <Feather
                  name="video"
                  size={30}
                  color="#000000"
                  style={{marginRight: 10}}
                />
            </TouchableOpacity>
         )}
      />

    </View>
  )
}