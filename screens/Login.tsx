import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import colors from '../theme'; // Assuming '../theme.ts' for colors
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
// Assuming 'auth' is initialized and imported from your Firebase setup elsewhere
// For this example, we'll keep the import concise.
// const auth = getAuth(firebaseApp); 
// Note: You must ensure 'auth' is accessible here.

// --- Asset Paths based on your file structure (screens/assets) ---
const LOGO_IMAGE = require('./assets/logo.png');
const ILLUSTRATION_IMAGE = require('./assets/illustration.png');
const GOOGLE_ICON = require('./assets/google.png');
const APPLE_ICON = require('./assets/apple.png');
const FACEBOOK_ICON = require('./assets/facebook.png');

interface LoginProps {
    onSuccess: () => void; // Navigates to home/dashboard
    onRegister: () => void;   // Navigates to register screen
    onGoBack?: () => void; // Optional: for the back arrow
}

const Login: React.FC<LoginProps> = ({ onSuccess, onRegister, onGoBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Placeholder for the real Firebase Auth instance (replace with your actual import)
    const auth: any = {}; // TEMPORARY: Replace with actual auth instance

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            // --- FIREBASE AUTH LOGIC ---
            // await signInWithEmailAndPassword(auth, email, password); 
            // onSuccess(); // Use the success callback prop
            
            // --- TEMPORARY MOCK ---
            if (email === 'test@swap.com' && password === 'password') {
                setTimeout(onSuccess, 500);
            } else {
                setError('Invalid credentials.');
            }
            // --- END MOCK ---
            
        } catch (err: any) {
            console.error("Login Error:", err);
            setError('Login failed. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                {onGoBack && (
                    <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text> 
                    </TouchableOpacity>
                )}
                <Text style={styles.statusBarText}>9:41</Text>
            </View>

            <View style={styles.content}>
                <Image source={LOGO_IMAGE} style={styles.logo} />
                <Text style={styles.welcomeText}>Welcome Back</Text>
                
                <Image source={ILLUSTRATION_IMAGE} style={styles.illustration} />

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={colors.grayPlaceholder || '#A0A0A0'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={colors.grayPlaceholder || '#A0A0A0'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                    style={[styles.loginButton, { backgroundColor: colors.swapGreen || '#A6C7B3' }]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.loginButtonText}>{loading ? 'Logging In...' : 'Log In'}</Text>
                </TouchableOpacity>

                <View style={styles.linkContainer}>
                    <TouchableOpacity>
                        <Text style={[styles.linkText, { color: colors.swapRust || '#E29587' }]}>Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRegister}>
                        <Text style={[styles.linkText, { color: colors.swapRust || '#E29587' }]}>Sign up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.orContainer}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.orLine} />
                </View>

                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButtonWrapper}>
                        <Image source={GOOGLE_ICON} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButtonWrapper}>
                        <Image source={APPLE_ICON} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButtonWrapper}>
                        <Image source={FACEBOOK_ICON} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        width: '100%',
    },
    backButton: { padding: 5 },
    backButtonText: { fontSize: 24, color: '#333' },
    statusBarText: { fontSize: 13, color: '#888' },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    logo: {
        width: 150, 
        height: 60,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 34,
        fontWeight: 'bold', // Use normal if custom font is applied
        color: colors.swapDark || '#1E1E1E',
        marginBottom: 20,
    },
    illustration: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: colors.grayBorder || '#E0E0E0',
        fontSize: 16,
        color: colors.text || '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    loginButton: {
        width: '100%',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%',
        marginTop: 15,
        marginBottom: 10,
    },
    linkText: {
        fontSize: 13,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 300,
        marginVertical: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.separator || '#AAAAAA',
    },
    orText: {
        marginHorizontal: 10,
        color: colors.grayPlaceholder || '#A0A0A0',
        fontSize: 13,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: 250,
    },
    socialButtonWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    socialIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
});

export default Login;