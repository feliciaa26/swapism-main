import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import colors from '../theme'; 
import { Check } from 'lucide-react-native'; // Assuming this dependency is now fixed/available
// Ensure you have your Firebase imports here, similar to Login.tsx

// --- Asset Paths based on your file structure (screens/assets) ---
const LOGO_IMAGE = require('./assets/logo.png');
const ILLUSTRATION_IMAGE = require('./assets/illustration.png');
const GOOGLE_ICON = require('./assets/google.png');
const APPLE_ICON = require('./assets/apple.png');
const FACEBOOK_ICON = require('./assets/facebook.png');

interface RegisterProps {
    onSuccess: () => void;
    onLogin: () => void;
    onGoBack?: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess, onLogin, onGoBack }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Placeholder for Firestore/Auth logic (replace with your actual Firebase imports)
    const db: any = {}; 
    const auth: any = {}; 

    const handleRegister = async () => {
        setError('');
        setLoading(true);
        // ... (Your Firebase registration and Firestore write logic goes here) ...
        
        // --- TEMPORARY MOCK ---
        if (!agreedToTerms) {
            setError('You must agree to the T&C.');
            setLoading(false);
            return;
        }
        if (username && email && password) {
            setTimeout(onSuccess, 500);
        } else {
            setError('Please fill in all fields.');
        }
        // --- END MOCK ---
        setLoading(false);
    };

    return (
        <SafeAreaView style={[regStyles.safeArea, { backgroundColor: colors.background }]}>
            <View style={regStyles.header}>
                {onGoBack && (
                    <TouchableOpacity onPress={onGoBack} style={regStyles.backButton}>
                        <Text style={regStyles.backButtonText}>←</Text> 
                    </TouchableOpacity>
                )}
                <Text style={regStyles.statusBarText}>9:41</Text>
            </View>

            <View style={regStyles.content}>
                <Image source={LOGO_IMAGE} style={regStyles.logo} />
                
                <Text style={regStyles.title}>Join Swapism</Text>
                <Text style={regStyles.subtitle}>Try clothes on virtually</Text>

                <Image source={ILLUSTRATION_IMAGE} style={regStyles.illustration} />

                <View style={regStyles.inputContainer}>
                    <TextInput
                        style={regStyles.input}
                        placeholder="Username"
                        placeholderTextColor={colors.grayPlaceholder || '#A0A0A0'}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={regStyles.input}
                        placeholder="Email"
                        placeholderTextColor={colors.grayPlaceholder || '#A0A0A0'}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={regStyles.input}
                        placeholder="Password"
                        placeholderTextColor={colors.grayPlaceholder || '#A0A0A0'}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                {/* T&C Checkbox */}
                <View style={regStyles.termsContainer}>
                    <TouchableOpacity
                        style={[regStyles.checkbox, agreedToTerms && regStyles.checkboxChecked]}
                        onPress={() => setAgreedToTerms(!agreedToTerms)}
                    >
                         {/* Checkmark icon from lucide-react-native */}
                        {agreedToTerms && <Check size={12} color={colors.surface || '#fff'} />}
                    </TouchableOpacity>
                    <Text style={regStyles.termsText}>
                        I accept the <Text style={regStyles.termsLink}>T&C</Text>
                    </Text>
                </View>

                {error ? <Text style={regStyles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                    style={[regStyles.createButton, { backgroundColor: colors.swapGreen || '#A6C7B3' }]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    <Text style={regStyles.createButtonText}>{loading ? 'Creating Account...' : 'Create Account'}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onLogin} style={regStyles.loginLink}>
                    <Text style={regStyles.loginLinkText}>
                        Already have an account? <Text style={{ color: colors.swapRust || '#E29587' }}>Log in</Text>
                    </Text>
                </TouchableOpacity>

                <View style={regStyles.orContainer}>
                    <View style={regStyles.orLine} />
                    <Text style={regStyles.orText}>or</Text>
                    <View style={regStyles.orLine} />
                </View>

                <View style={regStyles.socialButtons}>
                    <TouchableOpacity style={regStyles.socialButtonWrapper}>
                        <Image source={GOOGLE_ICON} style={regStyles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={regStyles.socialButtonWrapper}>
                        <Image source={APPLE_ICON} style={regStyles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={regStyles.socialButtonWrapper}>
                        <Image source={FACEBOOK_ICON} style={regStyles.socialIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

// Use a distinct name for Register styles to avoid conflicts
const regStyles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        width: '100%',
    },
    backButton: { padding: 5, position: 'absolute', left: 20, zIndex: 1 },
    backButtonText: { fontSize: 24, color: '#333' },
    statusBarText: { fontSize: 13, color: '#888', marginLeft: 'auto' }, // Push 9:41 to the right
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logo: {
        width: 150, 
        height: 60,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.swapDark || '#1E1E1E',
        marginTop: 5,
    },
    subtitle: {
        fontSize: 14,
        color: colors.text || '#333',
        marginBottom: 15,
    },
    illustration: {
        width: '100%',
        height: 180, 
        resizeMode: 'contain',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
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
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: 10,
        marginBottom: 15,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 9, // Circular
        borderWidth: 1.5,
        borderColor: colors.swapRust || '#E29587',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: colors.swapRust || '#E29587',
        borderColor: colors.swapRust || '#E29587',
    },
    termsText: {
        fontSize: 13,
        color: colors.text || '#333',
    },
    termsLink: {
        color: colors.swapRust || '#E29587',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 10,
    },
    createButton: {
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
    createButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    loginLink: {
        marginTop: 10,
        marginBottom: 20,
    },
    loginLinkText: {
        fontSize: 13,
        color: colors.text || '#333',
        textAlign: 'center',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 300,
        marginVertical: 15,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.grayBorder || '#E0E0E0',
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

export default Register;