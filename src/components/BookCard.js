import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useState,useEffect } from 'react'

const BookCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    
  }, [])
  
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => setIsOpen(!isOpen)}
        style={isOpen? styles.rowFrontOpen: styles.rowFront}
        underlayColor="tomato"
      >
        <View>
          <Text style={styles.name} >{props.book.name}</Text>
        </View>
      </TouchableHighlight>
      {isOpen && (
      <View style={styles.detail}>
        <Text style={styles.tag} > Description:  <Text style={styles.desc} >{props.book.desc}</Text></Text>
        <Text style={styles.tag} > Started Date: <Text  style={styles.desc}>{props.book.startedDate}</Text></Text>
        <Text style={styles.tag} > Finished Date:  <Text style={styles.desc} >{props.book.finishedDate}</Text></Text>
        <Text style={styles.tag} > Category: <Text  style={styles.desc}>{props.book.category}</Text></Text>
      </View>
      )}
    </View>
  )
}

export default BookCard

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: "#6b69fa",
    justifyContent: "center",
    alignSelf: "center",
    height: 60,
    width: "90%",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 20,
    paddingLeft:30
  },
  detail: {
    width: "90%",
    justifyContent: "center",
    backgroundColor: "#31307a",
    alignSelf: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 20,
  },
  rowFrontOpen: {
    backgroundColor: "#6b69fa",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    paddingLeft:30
  },
  detailItem:{
    flexDirection: "row",
  },
  tag:{
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",

  },
  desc:{
    fontSize: 14,
    color: "#fff",
    fontWeight: "normal",
  },
  name:{
    fontSize: 20,
    fontWeight: "bold",
  }

})