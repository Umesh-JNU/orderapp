import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as fs
} from "react-native-responsive-dimensions";

export default function FoodItem({ data, handleCheck, handleDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={{ position: 'relative' }}>
          <View style={styles.dFlex}>
            <FontAwesome5 name="user-alt" size={10} color="#fe3e57b3" />
            <Text style={[styles.text, styles.textBold]}>{data.name}</Text>
          </View>
          <View style={styles.floatRight}>
            {data.status === 'completed' ?
              <View style={[styles.green, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}>
                <Text style={{ color: '#399700', textTransform: 'uppercase', fontWeight: 'bold' }}>Completed</Text>
                <MaterialCommunityIcons name="checkbox-marked-outline" size={13} color="#399700" />
              </View>
              :
              <TouchableOpacity onPress={handleCheck}>
                <View style={[styles.blue, { flexDirection: 'row', alignItems: 'center', gap: 5 }]}>
                  <Text style={{ color: '#0087ffd6', textTransform: 'uppercase', fontWeight: 'bold' }}>Completed</Text>
                  <MaterialCommunityIcons name="checkbox-blank-outline" size={13} color="#0087ffd6" />
                </View>
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.dFlex}>
          <FontAwesome5 name="phone" size={10} color="#fe3e57b3" />
          <Text style={styles.text}>{data.mobile_no}</Text>
        </View>
        <View style={styles.dFlex}>
          <MaterialCommunityIcons name="stool" size={13} color="#fe3e57b3" />
          <Text style={styles.text}>{data.tableId}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        {data.items.map((food) => {
          return (
            <View key={food} style={styles.dFlex}>
              <MaterialCommunityIcons name="circle-box-outline" size={20} color="green" />
              <Text>{food}</Text>
            </View>
          )
        })}
      </View>
      {data.status !== "completed" &&
        <View style={styles.cardFooter}>
          <TouchableOpacity style={styles.red} onPress={handleDelete}>
            <Text style={{ color: '#fff', textTransform: 'uppercase', fontWeight: 'bold' }}>remove</Text>
          </TouchableOpacity>
        </View>}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    marginBottom: rh(2),
    marginHorizontal: rw(5),
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardHeader: {
    paddingHorizontal: rw(5),
    paddingVertical: rh(2),
    borderBottomWidth: 1,
    borderColor: '#d0d0d0'
  },
  cardBody: {
    paddingHorizontal: rw(5),
    paddingVertical: rh(2),
  },
  cardFooter: {
    paddingBottom: rh(2),
    borderTopWidth: 1,
    borderColor: '#d0d0d0',
    paddingHorizontal: rw(5),
    paddingTop: rh(1.5),
  },
  dFlex: {
    alignItems: 'center',
    flexDirection: 'row',
    width: rw(100),
    gap: 10,
    marginBottom: rh(.2)
  },
  text: {
    fontFamily: 'poppins-regular',
    letterSpacing: 0.1
  },
  textBold: {
    fontWeight: 'bold',
  },
  floatRight: {
    position: 'absolute',
    right: 0
  },
  green: {
    backgroundColor: '#60ff001a',
    borderWidth: 1,
    borderColor: '#00ff39d6',
    borderRadius: 5,
    paddingHorizontal: rw(2),
    paddingVertical: rh(.5)
  },
  blue: {
    backgroundColor: '#0087ff14',
    borderWidth: 1,
    borderColor: '#0087ff57',
    borderRadius: 5,
    paddingHorizontal: rw(2),
    paddingVertical: rh(.5)
  },
  red: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: rw(2),
    paddingVertical: rh(.5),
    width: rw(20),
    alignItems: 'center',
  }
})