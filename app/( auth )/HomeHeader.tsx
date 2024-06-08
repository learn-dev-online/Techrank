import { Ionicons } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '@clerk/clerk-expo';
import Home from './Home';
import Profile from './Profile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../( components )/CustomDrawer';
import CourseDetails from '../( courseComponents )/CourseDetails';
import Chat from './Chat';
// import HomeNavigation from './HomeNavigation';

const Drawer = createDrawerNavigator();

const HomeHeader = () => {
	const { isSignedIn } = useAuth();

	return (
		<Drawer.Navigator
		drawerContent={props => <CustomDrawer {...props} />}
		screenOptions={{
			headerShown: false,
			drawerActiveBackgroundColor: '#aa18ea',
			drawerActiveTintColor: '#fff',
			drawerInactiveTintColor: '#333',
			drawerLabelStyle: {
			  marginLeft: -25,
			  fontFamily: 'Roboto-Medium',
			  fontSize: 15,
			},
		  }}
		>
        <Drawer.Screen name="Home" component={Home} redirect={!isSignedIn} options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}/>
        <Drawer.Screen name="Profile" component={Profile} redirect={!isSignedIn}  options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}/>
		 {/* <Drawer.Screen name="Group Chat" component={Chat} redirect={!isSignedIn}  options={{
          drawerIcon: ({color}) => (
            <Feather name="message-square" size={22} color={color} />
          ),
        }}/> */}
    </Drawer.Navigator>

	);
};

export default HomeHeader;