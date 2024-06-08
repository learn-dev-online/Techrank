import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity,} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SeachBox from '../( components )/SeachBox';
import Slider from '../{ courseComponents }/Slider';
import CourseList from '../{ courseComponents }/CourseList';



const Home = ({navigation}) => {
	const { user } = useUser();

  const Header = () =>{
    return(
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor:'#6c47ff',
            paddingTop:50,
            paddingLeft:20,
            paddingRight:20,
            paddingBottom:20
          }}>
          <View style={{flexDirection:'row', gap:6}}>
            <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium', color:'#FFFFFF'}}>{user?.firstName}</Text>
            <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium', color:'#FFFFFF'}}>{user?.lastName}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
			      <Feather
              name="menu"
              size={24}
              color="#FFFFFF"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
    )
  }

	return (
      <View style={{width:'100%', height:"100%"}}>
        <Header/>
        <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF', padding:20 }}>
        
          <SeachBox />
          <Slider/>
          <CourseList type={'Basic'}/>
          <CourseList type={'Intermediate'}/>
          <CourseList type={'Advance'}/>
    
        </ScrollView>
      </View>    
	);
};

export default Home;