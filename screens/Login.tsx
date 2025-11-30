import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Dimensions } from 'react-native';
// Assuming 'colors' contains essential theme colors, but we'll define the specific login colors here.
// import colors from '../theme';

// --- Dimensions for responsive layout ---
const { width } = Dimensions.get('window');

// --- Custom Colors based on the image ---
const customColors = {
    beige: '#f5f0e3',        // Background
    inputBorder: '#e0e0e0', // Input border
    loginGreen: '#a6c7b3',   // Log In button
    linkTerracotta: '#e29587', // Forgot Password / Sign up links
    text: '#333333',         // Dark text
    lightText: '#888888',    // Placeholder text
    separator: '#aaaaaa',    // 'or' line
};

// --- PLACEHOLDERS (Replace these with your actual local image imports) ---
const LOGO_IMAGE = require('./assets/logo.png'); // Update path
const ILLUSTRATION_IMAGE = require('./assets/illustration.png'); // Update path
const GOOGLE_ICON = require('./assets/google.png'); // Update path
const APPLE_ICON = require('./assets/apple.png'); // Update path
const FACEBOOK_ICON = require('./assets/facebook.png'); // Update path


const Login: React.FC<{ onSuccess: () => void; onRegister: () => void; onForgot: () => void }> = ({ onSuccess, onRegister, onForgot }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        // The main container uses the light beige background color
        <View style={styles.container}>
            {/* Header: Back Arrow (Using a simple Text placeholder for the icon) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Go back')}>
                    <Text style={styles.backIcon}>{'<'}</Text>
                </TouchableOpacity>
                {/* Space for the status bar details (signal, battery) */}
            </View>

            {/* Logo */}
            <Image
                source={LOGO_IMAGE}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Welcome Text - Requires a custom font to truly match the look */}
            <Text style={styles.welcomeText}>Welcome Back</Text>

            {/* Illustration */}
            <Image
                source={ILLUSTRATION_IMAGE}
                style={styles.illustration}
                resizeMode="contain"
            />

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={customColors.lightText}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={customColors.lightText}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            {/* Log In Button */}
            <TouchableOpacity style={styles.loginButton} onPress={onSuccess}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            {/* Forgot Password / Sign Up Links */}
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={onForgot}>
                    <Text style={styles.linkText}>Forgot Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onRegister}>
                    <Text style={styles.linkText}>Sign up</Text>
                </TouchableOpacity>
            </View>

            {/* OR Separator */}
            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>or</Text>
                <View style={styles.separatorLine} />
            </View>

            {/* Social Login Icons */}
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image source={GOOGLE_ICON} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image source={APPLE_ICON} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIconWrapper}>
                    <Image source={FACEBOOK_ICON} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customColors.beige,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        paddingTop: 50, // To account for safe area/status bar
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    backIcon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: customColors.text,
    },
    logo: {
        width: width * 0.45,
        height: 80,
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 36,
        // Font needs to be loaded separately for the curly, serif look
        // You might use a custom font family like 'PlayfairDisplay-Bold' if imported
        fontWeight: 'normal', 
        color: customColors.text,
        marginBottom: 20,
    },
    illustration: {
        width: width * 0.75,
        height: width * 0.5,
        marginBottom: 20,
    },
    inputContainer: {
        width: '90%',
        maxWidth: 400,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#fff',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: customColors.inputBorder,
        fontSize: 16,
        color: customColors.text,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    loginButton: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: customColors.loginGreen,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    linkContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    linkText: {
        color: customColors.linkTerracotta,
        fontSize: 14,
        textDecorationLine: 'none', // Removed underline for Forgot Password, added for Sign up below
        marginTop: 5,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        maxWidth: 350,
        marginVertical: 20,
    },
    separatorLine: {
        flex: 1,
        height: 1,
        backgroundColor: customColors.separator,
    },
    separatorText: {
        marginHorizontal: 10,
        color: customColors.lightText,
        fontSize: 14,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
    },
    socialIconWrapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    socialIcon: {
        width: 25,
        height: 25,
    },
});

export default Login;