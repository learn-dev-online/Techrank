import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../( Shared )/GlobalApi'
import Button from '../( components )/Button';
import { useNavigation } from '@react-navigation/native';

export default function CourseList({type}) {
    const [courseList, setCourseList]=useState([]);

    useEffect(()=>{
        getCourseList();
    },[])
    const getCourseList=async()=>{
        
        const resp=(await GlobalApi.getCourseList(type)).data;
        const result=resp.data.map((item)=>({
            id:item.id,
            title:item.attributes.Title,
            description:item.attributes.Discription,
            image:item.attributes.image.data.attributes.url,
            Topics:item.attributes.Topics,
            Link:item.attributes.Topics.Link
        }))
        setCourseList(result);
        // console.log(result);
    }

    const navigation=useNavigation();

    const onPressButton=(courseList)=>{
      // console.log("Course", courseList)
      navigation.navigate('Course Details', {courseData:courseList});
    }


  return (
    <View style={{marginTop:15, height:'auto', width:"100%", marginBottom:5}}>
      <Text style={{fontSize:20,fontWeight:'bold', marginBottom:10, textTransform:'capitalize', padding:5}}>{type} Course</Text>
      <FlatList 
        //  horizontal={true}
        //  showsHorizontalScrollIndicator={false}
         data={courseList}
         renderItem={({item})=>(
            <View style={{backgroundColor:'#f5f5f5', borderRadius:12, borderColor:'#000000', borderWidth:1, marginBottom:20, width:320, marginRight:10 }}>
                <Image source={{uri:item.image}} style={{width:"100%", height:170, borderTopRightRadius:12, borderTopLeftRadius:12, }}/>
                <View style={{padding:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
                    <View>
                      <Text style={{fontSize:16, fontWeight:'bold'}}>{item.title}</Text>
                      <Text style={{fontSize:16, color:'gray', fontWeight:300}}>{item.Topics?.length} Lessons</Text>
                    </View>
                    <TouchableOpacity onPress={()=>onPressButton(item)}>
                        <Button style={{borderWidth:1, borderColor:'#000000', width:130, borderRadius:5 }}>Watch Now</Button>
                    </TouchableOpacity>
                </View>
            </View>
         )}
      />
    </View>
  )
}