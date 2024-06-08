import { useSignIn } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Pressable, Alert, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../( components )/Background';
import Logo from '../( components )/Logo';
import Header from '../( components )/Header';
import Button from '../( components )/Button';
import TextInput from '../( components )/TextInput';
import { theme } from '../( Shared )/theme';

const login = () => {

	const { signIn, setActive, isLoaded } = useSignIn();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignInPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);
		try {
			const completeSignIn = await signIn.create({
				identifier: emailAddress,
				password
			});

			// This indicates the user is signed in
			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (

		<Background>
	        <Spinner visible={loading} />
            <Logo />
            <Header>Welcome back.</Header>
			
		    <TextInput
		        autoCapitalize="none"
			    placeholder="Email or Username"
			    value={emailAddress}
			    onChangeText={setEmailAddress}
		     // style={styles.inputField}
		    />

            <TextInput
	 		    placeholder="Password"
			    value={password}
			    onChangeText={setPassword}
			    secureTextEntry
			 // style={styles.inputField}
		    />
			
            <View style={styles.forgotPassword}>
	            <Link href="/reset" asChild>
				    <Pressable style={styles.link}>
					    <Text>Forgot password?</Text>
				    </Pressable>
			    </Link>
            </View>

            <Button mode="contained" onPress={onSignInPress} >
                Login
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <Link href="/register" asChild>
				    <Pressable style={styles.link}>
					    <Text>Create Account</Text>
				    </Pressable>
			    </Link>
            </View>
        </Background>
	);
};

export default login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 20
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
	button: {
		margin: 8,
		alignItems: 'center'
	},
	forgotPassword: {
		width: '100%',
		alignItems: 'flex-end',
		marginBottom: 24,
	  },
	  row: {
		flexDirection: 'row',
		marginTop: 4,
	  },
	  label: {
		color: theme.colors.secondary,
	  },
	  link: {
		fontWeight: 'bold',
		color: theme.colors.primary,
		fontSize:16,
	  },
});