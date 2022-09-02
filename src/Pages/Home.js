import { StyleSheet, Text, View, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addBook, updateBook, deleteBook } from '../Redux/Slice/Books';
import BookCard from '../components/BookCard';
const { width, height } = Dimensions.get("window");
const Home = () => {
  const books = useSelector((state) => state.books.books);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const renderItem = (data) => (
    <BookCard book={data.item} />
  );
  const closeRow = (rowMap, rowKey) => {
      console.log(rowKey);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    console.log(rowMap.undefined.props.item.id);
    dispatch(deleteBook(rowMap.undefined.props.item.id))
  };
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => navigation.navigate("Add", { bookId: data.item.id })} style={styles.swipeButton}>
        <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteRow(rowMap, data.index);
        }}
        style={styles.swipeButton}
      >
        <Ionicons name="trash-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerText}>Book List</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyList}>
          <SwipeListView
            data={books}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-100}
            previewRowKey={"1"}
            previewOpenValue={-100}
            previewOpenDelay={1000}
            onRowDidOpen={onRowDidOpen}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
      <View style={styles.bodyAdd}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add")}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "tomato",
    justifyContent: "center",
    alignSelf: "center",
    height: 60,
    width: "98%",
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 20,
  },
  rowBack: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 15,
    height: 60,
    borderRadius: 20,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  swipeButton: {
    marginLeft: 20,
  },
  separator: {
    height: 12,
  },
  list: {
    paddingBottom: 100,
  },
  bodyAdd: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }

})