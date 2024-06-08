import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

import Background from '../( components )/Background';
import Logo from '../( components )/Logo';
import Header from '../( components )/Header';
import Button from '../( components )/Button';
import TextInput from '../( components )/TextInput';
import { theme } from '../( Shared )/theme';


const PwReset = () => {
	
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState('');
	const [successfulCreation, setSuccessfulCreation] = useState(false);
	const { signIn, setActive } = useSignIn();

	// Request a passowrd reset code by email
	const onRequestReset = async () => {
		try {
			await signIn!.create({
				strategy: 'reset_password_email_code',
				identifier: emailAddress
			});
			setSuccessfulCreation(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	// Reset the password with the code and the new password
	const onReset = async () => {
		try {
			const result = await signIn!.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code,
				password
			});
			console.log(result);
			alert('Password reset successfully');

     // Set the user session active, which will log in the user automatically
			await setActive!({ session: result.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

			{!successfulCreation && (
				<Background>
					<Logo />
                    <Header>Reset Password</Header>
					<TextInput
						autoCapitalize="none"
						placeholder="Enter Registered Email"
						value={emailAddress}
						onChangeText={setEmailAddress}
					/>

					<Button mode="contained" onPress={onRequestReset} >
					    Send Reset Email
                    </Button>
				</Background>
			)}

			{successfulCreation && (
				<Background>
					<Logo />
                    <Header>Reset Password</Header>
					<TextInput
						value={code}
						placeholder="Code..."
						onChangeText={setCode}
					/>
					<TextInput
						placeholder="New password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>

					<Button mode="contained" onPress={onReset} >
					    Set new Password
                    </Button>
				</Background>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	label: {
		color: theme.colors.secondary,
	},
	button: {
		marginTop: 24,
	},
	row: {
		flexDirection: 'row',
		marginTop: 4,
	},
	link: {
		fontWeight: 'bold',
		color: theme.colors.primary,
	},
});

export default PwReset;