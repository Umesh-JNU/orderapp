import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useRef, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as fs
} from "react-native-responsive-dimensions";

const foodItems = [
  "Pizza Margherita",
  "Spaghetti Bolognese",
  "Chicken Alfredo",
  "Cheeseburger",
  "Veggie Burger",
  "Grilled Chicken Sandwich",
  "Caesar Salad",
  "Greek Salad",
  "Chicken Caesar Wrap",
  "Chicken Shawarma Wrap",
  "Fish and Chips",
  "Chicken Tandoori",
  "Vegetable Biryani",
  "Sushi Roll Combo",
  "Tempura Shrimp",
  "Tandoori Naan",
  "Cheese Garlic Bread",
  "French Fries",
  "Onion Rings",
  "Mozzarella Sticks",
  "Chocolate Brownie Sundae",
  "New York Cheesecake",
  "Tiramisu",
  "Fruit Salad",
  "Ice Cream Sundae",
  "Coffee Latte",
  "Iced Tea",
  "Fresh Orange Juice",
  "Strawberry Smoothie",
  "Mango Lassi"
];


const Table = ({ data, deleteItem }) => {
  console.log({ data })
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <Text style={styles.columnHeader}>Food Item</Text>
        <Text style={styles.columnHeader}>Action</Text>
      </View>
      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.row,
            index === data.length - 1 ? styles.lastRow : null,
          ]}
        >
          <Text style={styles.column}>{item}</Text>
          <TouchableOpacity style={[styles.column, { paddingRight: 10 }]} onPress={() => deleteItem(index)}>
            <MaterialIcons name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default function AddOrder({ navigation, route }) {
  console.log(route.params)
  const { placeNewOrder } = route.params;

  const [food, setFood] = useState('Select Food');
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(foodItems);
  const [tableData, setTableData] = useState([]);
  const searchRef = useRef();

  const [orderItem, setOrderItem] = useState({
    name: "",
    mobile_no: "",
    tableId: '',
    status: "pending"
  });

  const deleteItem = (idx) => {
    setTableData([...tableData.slice(0, idx), ...tableData.slice(idx + 1)]);
  };

  const searchHandler = (text) => {
    setData(foodItems);
    if (!text) return;

    setData(foodItems.filter((item) => {
      return item.toLowerCase().includes(text.toLowerCase());
    }));
  };

  const handleInput = (e) => {
    setOrderItem({ ...orderItem, [e.target.name]: e.target.value })
  }

  console.log({ orderItem })
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}>
        <View>
          <View style={styles.inputBox}>
            <Text>Customer Name</Text>
            <TextInput style={styles.input} placeholder='Enter Customer Name' onChangeText={(text) => setOrderItem({ ...orderItem, name: text })} />
          </View>
          <View style={styles.inputBox}>
            <Text>Customer Phone</Text>
            <TextInput style={styles.input} keyboardType="number-pad" value={orderItem.mobile_no} placeholder='Enter Customer Phone' onChangeText={(text) => setOrderItem({ ...orderItem, mobile_no: text.replace(/[^0-9]/g, '') })} />
          </View>
          <View style={styles.inputBox}>
            <Text>Table Id</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={orderItem.tableId} placeholder='Enter Table Id' onChangeText={(text) => setOrderItem({ ...orderItem, tableId: text.replace(/[^0-9]/g, '') })} />
          </View>
          <View style={styles.inputBox}>
            <Text>Select Food Items</Text>
            <TouchableOpacity style={styles.dropdown} onPress={() => setIsOpen(!isOpen)}>
              <Text>{food}</Text>
              <Entypo name={isOpen ? "chevron-up" : "chevron-down"} size={24} color="black"
                style={styles.flexEnd} />
            </TouchableOpacity>

            {isOpen && <View style={styles.dropdownArea}>
              <TextInput ref={searchRef} placeholder='Search...' style={styles.searchBox} onChangeText={(text) => searchHandler(text)} />

              <FlatList data={data} renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.item} onPress={() => {
                    // setFood(item);
                    setTableData((prev) => [...prev, item])
                    searchHandler('');
                    setIsOpen(false);
                    searchRef.current.clear();
                  }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )
              }}
              />
            </View>}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {tableData.length > 0 && <Table data={tableData} deleteItem={deleteItem} />}

      <View>
        <TouchableOpacity style={styles.addBtnBox} onPress={() => {
          placeNewOrder({ ...orderItem, items: tableData });
          navigation.goBack();
        }}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  textCenter: { textAlign: 'center' },
  table: {
    position: 'relative',
    zIndex: -1,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'poppins-regular'
  },
  column: {
    fontSize: 16,
    // fontFamily: 'poppins-bold',
  },
  inputBox: {
    position: 'relative',
    width: '90%',
    marginTop: 15,
    alignSelf: 'center'
  },
  input: {
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    paddingLeft: 15,
    paddingRight: 15,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dropdownArea: {
    position: 'absolute',
    top: 70,
    zIndex: 1,
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 10,
    alignSelf: 'center'
  },
  searchBox: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 20,
    paddingLeft: 15,
  },
  item: {
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  addBtnBox: {
    zIndex: -1,
    marginVertical: rh(2),
    alignSelf: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: rw(10),
    paddingVertical: rh(1),
    borderWidth: 1,
    borderColor: '#3f3f3f',
    borderRadius: 10,
    alignItems: 'center',
    color: '#1e1e1e'
  },
})