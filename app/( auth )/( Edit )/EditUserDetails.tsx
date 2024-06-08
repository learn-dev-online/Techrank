import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, } from 'react-native';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import Logo from '@/app/( components )/Logo';
import Background from '@/app/( components )/Background';

export default function EditUserDetails() {

    const { user, isLoaded } = useUser();
	const [firstName, setFirstName] = useState(user?.firstName);
	const [lastName, setLastName] = useState(user?.lastName);
    const [username, setUsername] = useState(user?.username);
    const [loading, setLoading] = useState(false);

    const onSaveUser = async () => {
        if (!isLoaded) {
			return;
		}
		setLoading(true);
		try {
			await user?.update({
				firstName: firstName!,
				lastName: lastName!,
                username:username!
			});
		} catch (error) {
			console.log(error);
		}finally {
			setLoading(false);
		}
	};

  return (
    <Background>
            <ScrollView style={{width:'100%' }}>
                <View style={{alignItems:'center'}}>
                    <Logo/>
                </View>
            <Spinner visible={loading} />
				<View style={styles.container}>
                    <TextInput
			            placeholder="First Name"
				        value={firstName || ''}
				        onChangeText={setFirstName}
				        style={styles.inputField}
			        />
			        <TextInput
				        placeholder="Last Name"
				        value={lastName || ''}
				        onChangeText={setLastName}
				        style={styles.inputField}
		 	        />
					<TextInput
				        placeholder="User Name"
				        value={username || ''}
				        onChangeText={setUsername}
				        style={styles.inputField}
		 	        />
		 	        {/* <Button onPress={onSaveUser} title="Update Name" color={'#6c47ff'}></Button> */}
					<TouchableOpacity onPress={onSaveUser} style={{width:'100%', height:50, borderWidth:1, borderColor:'#6c47ff', justifyContent:'center', alignItems:'center', borderRadius:12, marginTop:15, backgroundColor:'#6c47ff'}}>
                        <Text style={{fontSize:20, color:'#FFFFFF'}}>Update Details</Text>
					</TouchableOpacity>
		        </View>
            </ScrollView>
        </Background>
  )
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop:20
	},
	inputField: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderColor: '#6c47ff',
		borderRadius: 4,
		padding: 10,
		backgroundColor: '#fff'
	}
});