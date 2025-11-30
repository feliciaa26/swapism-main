import { AppRegistry } from 'react-native';

// Attempt to require App dependencies incrementally so we can pinpoint
// which module throws during initialization (helps find 'protocol' assignment).
try {
	// Core modules
	// eslint-disable-next-line no-console
	console.log('Requiring react...');
	require('react');

	// react-native
	// eslint-disable-next-line no-console
	console.log('Requiring react-native...');
	require('react-native');

	// Safe area
	// eslint-disable-next-line no-console
	console.log('Requiring react-native-safe-area-context...');
	require('react-native-safe-area-context');

	// Bottom nav (may pull in vector icons)
	// eslint-disable-next-line no-console
	console.log('Requiring ./components/BottomNav.native...');
	require('./components/BottomNav.native');

	// Try requiring a few screens used immediately by App
	// eslint-disable-next-line no-console
	console.log('Requiring ./screens/Welcome...');
	require('./screens/Welcome');

	// Finally require the App
	// eslint-disable-next-line no-console
	console.log('Requiring ./App.native...');
	const App = require('./App.native').default;

	AppRegistry.registerComponent('main', () => App);
} catch (e) {
	// Log the error so Metro shows the full stack and offending module
	// eslint-disable-next-line no-console
	console.error('Error while loading native App (detailed):', e);
	throw e;
}
