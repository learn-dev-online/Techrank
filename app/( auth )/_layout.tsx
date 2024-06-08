import CourseDetails from '../{ courseComponents }/CourseDetails';
import { createStackNavigator } from '@react-navigation/stack';
import Videoplayer from '../{ courseComponents }/VideoPlayer';
import HomeHeader from './HomeHeader';
import EditUserDetails from './( Edit )/EditUserDetails';


const RootStack = createStackNavigator();

const TabsPage = () => {

	return (
		<RootStack.Navigator>
            <RootStack.Group screenOptions={{
			headerShown: false,
		  }}>
                <RootStack.Screen name="Home" component={HomeHeader} />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen name="Course Details" component={CourseDetails} />
            </RootStack.Group>
			<RootStack.Group >
				<RootStack.Screen name="Video" component={Videoplayer} />
            </RootStack.Group>
            <RootStack.Group >
				<RootStack.Screen name="Updata Details" component={EditUserDetails} />
            </RootStack.Group>

            
        </RootStack.Navigator>


	);
};

export default TabsPage;