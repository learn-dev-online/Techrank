import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../( Shared )/GlobalApi';



export default function Slider() {
    
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

    const [slider, setSlider]=useState([])
    useEffect(()=>{
        getSlider();
      },[])
    
     const getSlider = async()=>{
        const result=(await GlobalApi.getSlider()).data;
    
        // console.log("Result-->",result);
        const resp=result.data.map((item)=>({
            id:item.id,
            name:item.attributes.Name,
            image:item.attributes.image.data.attributes.url
        }));
        // console.log("SliderList", resp);
        setSlider(resp)
      }
  return (
    <View style={{marginTop:12}}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={slider}
        renderItem={({item})=>(
            <View>
                <Image source={{uri:item.image}} style={{width:318, height:170, borderRadius:12, marginRight:3, borderWidth:1, borderColor:'#000000'}}/>
            </View>
        )}
       />
    </View>
  )
}