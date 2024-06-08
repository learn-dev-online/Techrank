import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../( components )/Logo';

const Profile = ({navigation}) => {
	const { user } = useUser();
	const { signOut } = useAuth();

	const doLogout = () => {
		signOut();
	};

	const onPressButton=()=>{
		// console.log("Course", courseList)
		navigation.navigate('Updata Details');
	}

	const Header = () =>{
		const { user } = useUser();

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
				<Text style={styles.Name}>{user?.firstName}</Text>
                <Text style={styles.Name}>{user?.lastName}</Text>
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
		<View>
			<Header/>
			<View style={{padding:20}}>
				<View style={{alignItems:'center'}}>
				    <Logo/>
				</View>
				<View style={{flexDirection:'row', gap:4, justifyContent:'center', width:'100%', marginBottom:20}}>
					<Text style={{fontSize:23, fontWeight:400}}>{user.firstName}</Text>
					<Text style={{fontSize:23, fontWeight:400}}>{user.lastName}</Text>
				</View>
			<View>
				<TouchableOpacity style={styles.impButton} onPress={()=>onPressButton()}>
					<View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
					    <Ionicons name="person-outline" size={22} />
						<Text style={{fontSize:20, fontWeight:400}}>Edit Profile</Text>
					</View>
					<Feather name="chevron-right" size={34} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.impButton}>
					<View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
					<Feather name="book" size={22} />
						<Text style={{fontSize:20, fontWeight:400}}>Terms & Conditions</Text>
					</View>
					<Feather name="chevron-right" size={34} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.impButton}>
					<View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
					    <Feather name="headphones" size={22} />
						<Text style={{fontSize:20, fontWeight:400}}>Help Center</Text>
					</View>
					<Feather name="chevron-right" size={34} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.impButton}>
					<View style={{flexDirection:'row', gap:10, alignItems:'center'}}>
					    <Ionicons name="share-outline" size={22} />
						<Text style={{fontSize:20, fontWeight:400}}>Intive Friends</Text>
					</View>
					<Feather name="chevron-right" size={34} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.LogoutButton} onPress={() => doLogout()}>
				    <Ionicons name="exit-outline" size={25} color={'#FFFFFF'}/>
					<Text style={{fontWeight: 400, fontSize: 20, lineHeight: 26, color:'#FFFFFF'}}>Logout</Text>
				</TouchableOpacity>
				
			</View>
			</View>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop:45
	},
	Name:{
        fontSize: 18, 
		fontFamily: 'Roboto-Medium', 
		color:'#FFFFFF'
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#6c47ff',
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	},
	impButton:{
		flexDirection:'row', 
		justifyContent:'space-between', 
		alignItems:'center', 
		padding:15, 
		borderRadius:10, 
		backgroundColor:'#FFFFFF', 
		marginTop:10

	},
	LogoutButton:{
		borderWidth:2, 
		borderColor:'#000000', 
		borderRadius:12, 
		marginVertical: 10, 
		flexDirection:'row', 
		padding:15, 
		justifyContent:'center', 
		alignItems:'center', 
		gap:5, 
		backgroundColor:'#6c47ff'

	}
});