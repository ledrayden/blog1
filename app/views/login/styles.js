import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#34495e',
		paddingVertical: 30,
		paddingHorizontal: 30,		
	},
	subcontainer: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	img: {
		width: 130,
		height: 130,
		tintColor: '#FFF',
		marginBottom: 50,				
	},
	checkboxContainer: {
		width: "100%",
		flexDirection: 'row',		
		justifyContent: 'flex-start',
		marginTop: 10,
		
	},
	checkbox: {
		//alignSelf: "center",
	},
	label: {
		margin: 8,
	},
});