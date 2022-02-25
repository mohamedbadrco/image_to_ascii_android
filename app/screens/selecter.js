import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet, Text, View } from 'react-native';



export function Selecter(props) {

	let data = props.items;

	return (
		<View>
			<SelectDropdown

				buttonStyle={styles.dropdown}

				buttonTextStyle={styles.text}

				defaultButtonText={props.name}

				rowStyle={styles.row}

				rowTextStyle={styles.textdrop}

				data={data}

				onSelect={props.selecter}
				buttonTextAfterSelection={(selectedItem, index) => {
					// text represented after item is selected
					// if data array is an array of objects then return selectedItem.property to render after item is selected
					return selectedItem
				}}
				rowTextForSelection={(item, index) => {
					// text represented for each item in dropdown
					// if data array is an array of objects then return item.property to represent item in dropdown
					return item
				}}
			/>
		</ View>)

}

const styles = StyleSheet.create({

	dorpdowntext: {
		fontSize: 16,
		letterSpacing: '2px',
		color: 'black'

	},
	dropdown: {
		width: 'auto',
		backgroundColor: 'white',
		borderColor: 'gray',
		borderWidth: 0.5,
		margin: 10,
		borderRadius: 5,
		marginLeft: '15px'
	},
	row: {
		paddingVertical: 17,
		paddingHorizontal: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		backgroundColor: '#222222',
		color: 'white',
		fontSize: 16,
		padding: '5px',

	},
	text: {
		flex: 1,
		fontFamily: 'sans-serif-thin',
		color: 'black',
		fontSize: 16,
		letterSpacing: '2px'
	},
	textdrop: {
		flex: 1,
		fontWeight: 'bold',
		color: 'white',
		fontSize: 16,
		letterSpacing: '2px'
	}

})