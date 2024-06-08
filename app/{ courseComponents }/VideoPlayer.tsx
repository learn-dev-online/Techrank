import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av'
import * as ScreenOrientation from 'expo-screen-orientation'
import CourseContent from './CourseContent'
import Button from '../( components )/Button';

export default function VideoPlayer() {

  const param=useRoute().params;
  const [course, setCourse]=useState([])

  useEffect(()=>{
    setCourse(param.courseData);
    // console.log(param.courseData);
  },[])



  const video=React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [orientationIsLandscape, setOrientation] = React.useState(true)

  async function changeScreenOrientation(){
    if(orientationIsLandscape==true){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    else if(orientationIsLandscape==false){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }

  const toggleOrientation =() =>{
    setOrientation(!orientationIsLandscape)
    changeScreenOrientation()
  }

  return (
    <ScrollView style={{width:'100%'}}>
      <Video
      ref={video}
      source={{uri:course.Link}}
      useNativeControls
      resizeMode='contain'
      style={{width:"100%", height:204, borderWidth:1}}
      shouldPlay={true} 
      isMuted={false}
      isLooping onPlaybackStatusUpdate={status=> setStatus(() => status)}
      />
      {/* <Button 
      title={status.isPlaying ? 'Pause' : 'Play' }
      onPress={() =>status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
      
      /> */}
      <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={toggleOrientation} >
          <Button style={{borderWidth:1, borderColor:'#000000', width:170, borderRadius:5, backgroundColor:'#000fff' }}><Text style={{color:'#FFFFFF'}}>Change Orientation</Text></Button>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  )
}