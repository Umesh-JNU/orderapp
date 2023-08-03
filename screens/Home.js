
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FoodItem from '../components/FoodItem';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as fs
} from "react-native-responsive-dimensions";

export default function Home({ navigation }) {
  const [order, setOrder] = useState([
    {
      name: "Umesh Kumar",
      mobile_no: "1234567890",
      tableId: 12,
      items: ["ABC", "DEF", "EFG"],
      status: "pending"
    },
    {
      name: "Umesh Kumar",
      mobile_no: "1234567890",
      tableId: 12,
      items: ["ABC", "DEF", "EFG"],
      status: "completed"
    },
    {
      name: "Umesh Kumar",
      mobile_no: "1234567890",
      tableId: 12,
      items: ["ABC", "DEF", "EFG"],
      status: "pending"
    },
    {
      name: "Umesh Kumar",
      mobile_no: "1234567890",
      tableId: 12,
      items: ["ABC", "DEF", "EFG"],
      status: "completed"
    }
  ]);

  const placeNewOrder = (orderData) => {
    setOrder(prev => [...prev, orderData]);
  };

  const deleteOrder = (idx) => {
    setOrder([...order.slice(0, idx), ...order.slice(idx + 1)]);
  };

  const handleCheck = (idx) => {
    setOrder(order.map((o, i) => {
      if (i === idx) o.status = 'completed';
      return o;
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order List</Text>
      </View>
      {order.length === 0 ?
        <View style={styles.noOrder}>
          <Text style={styles.noOrderText}>No Order</Text>
        </View>
        :
        <View style={{ maxHeight: rh(80) }}>
          <FlatList data={order} renderItem={({ item, index }) => {
            return (
              <FoodItem
                key={index}
                data={item}
                handleCheck={() => handleCheck(index)}
                handleDelete={() => deleteOrder(index)}
              />
            )
          }} />
        </View>
      }
      <View>
        <TouchableOpacity style={styles.addBtnBox} onPress={() => navigation.navigate("AddOrder", { placeNewOrder })}>
          <Text>Add Order</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingVertical: rh(2),
    alignItems: 'center'
  },
  title: {
    fontSize: fs(3),
    color: '#6b6b6b',
    fontFamily: 'poppins-bold'
  },
  addBtnBox: {
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
  noOrder: {
    marginVertical: rh(3),
    marginHorizontal: rw(5),
    paddingVertical: rh(2),
    // paddingHorizontal: rw(5),
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    // alignItems: 'center'
  },
  noOrderText: {
    fontFamily: 'poppins-bold',
    color: 'gray',
    fontSize: fs(2.5),
    textAlign: 'center'
  }
});
