import { View, StyleSheet, Text, Pressable, ScrollView , } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';

import Background from '../( components )/Background';
import Logo from '../( components )/Logo';
import Header from '../( components )/Header';
import Button from '../( components )/Button';
import TextInput from '../( components )/TextInput';
import { theme } from '../( Shared )/theme';

const register = () => {
	const { isLoaded, signUp, setActive } = useSignUp();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState('');
	const [loading, setLoading] = useState(false);

	const onSignUpPress = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			// Create the user on Clerk
			await signUp.create({
				firstName,
				lastName,
				username,
				emailAddress,
				password
			});

			// Send verification Email
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// change the UI to verify the email address
			setPendingVerification(true);
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	const onPressVerify = async () => {
		if (!isLoaded) {
			return;
		}
		setLoading(true);

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
			<Spinner visible={loading} />

			{!pendingVerification && (
				<ScrollView>
					<Background>
				    {/* <Spinner visible={loading} /> */}
                    <Logo />
                    <Header>Welcome To Techrank</Header>

                    <TextInput
						autoCapitalize="none"
						placeholder="First Name"
						value={firstName}
						onChangeText={setFirstName}
					/>
					<TextInput
						autoCapitalize="none"
						placeholder="Last Name"
						value={lastName}
						onChangeText={setLastName}
					/>
					<TextInput
						autoCapitalize="none"
						placeholder="Username"
						value={username}
						onChangeText={setUsername}
					/>
					<TextInput
						autoCapitalize="none"
						placeholder="Enter Email id"
						value={emailAddress}
						onChangeText={setEmailAddress}
					/>
					<TextInput
						placeholder="Create Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>

					<Button mode="contained" onPress={onSignUpPress} >
                        Sign up
                    </Button>
					<View style={styles.row}>
                        <Text style={styles.label}>Already have an account? </Text>
                        <Link href="/login" asChild>
				            <Pressable style={styles.link}>
					            <Text>Login into Account</Text>
				            </Pressable>
			            </Link>
                    </View>
					
				    </Background>
				</ScrollView>
			)}

			{pendingVerification && (
				<Background>
					<Logo />
                    <Header>Email Verification</Header>
					<TextInput
						value={code}
						placeholder="Code..."
						onChangeText={setCode}
					/>
					<Button mode="contained" onPress={onPressVerify} >
                        Verify Email
                    </Button>
				</Background>
			)}
		</View>
	);
};

export default register;

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