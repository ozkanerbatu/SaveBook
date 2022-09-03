import { StyleSheet, Text, View, TextInput, FlatList, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addBook, updateBook } from '../Redux/Slice/Books';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import CategoryService from '../services/Caregory';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { width, height } = Dimensions.get("window");
const AddBook = (props) => {
  const books = useSelector((state) => state.books.books);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [checkBox, setCheckBox] = useState({
    start: false,
    finish: false,
  });
  const [book, setBook] = useState({
    id: books.length + 1,
    name: "",
    startedDate: new Date(),
    finishedDate: new Date(),
    category: "",
    desc: "",
    categoryId: 0,
  })
  useEffect(() => {
    setBook({
      ...book,
      startedDate: checkBox.start ? new Date().toISOString().slice(0, 10) : "",
      finishedDate: checkBox.finish ? new Date().toISOString().slice(0, 10) : "",
    })
  }, [checkBox])
  useEffect(() => {
    props.route?.params?.bookId && setBook(books.find((book) => book.id === props.route.params.bookId)) & setSelectedCategoryId(books.find((book) => book.id === props.route.params.bookId).categoryId)
    CategoryService.getCategories().then((data) => {
      setCategories(data.data);
    })
  }, [])
  const handleCheckBox = (id) => {
    id === 1 ? setCheckBox({ ...checkBox, start: !checkBox.start }) : setCheckBox({ ...checkBox, finish: !checkBox.finish })
  }
  const mergeBook = (partial) => {
    setBook((prev) => ({ ...prev, ...partial }))
  }
  const handleAddBook = () => {
    if (book.name.trim() !== "" & book.category.trim() !== "" & book.startedDate.trim !== "" & book.finishedDate.trim !== "" & book.desc.trim() !== "" ) {
      if (props.route?.params?.bookId) {
        dispatch(updateBook(book))
      } else {

        dispatch(addBook(book))
      }
      navigation.goBack();
    } else {
      alert("Please fill all fields")
    }
  }
  const handleSelectCategory = (id) => {
    setSelectedCategoryId(id);
    const categoryName = categories.find((item) => item.id === id).name
    mergeBook({ category: categoryName, categoryId: id });
  }
  return (
    <ScrollView style={styles.container} >
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Book</Text>
      </View>
      <View style={styles.form}>
        <TextInput value={book.name} onChangeText={(text) => { mergeBook({ name: text }) }} style={styles.input} placeholder="Book Name" />
        <View style={styles.dateView}>
          <TextInput onChangeText={(text) => { mergeBook({ startedDate: text }) }} value={book.startedDate.toString()} style={styles.input} placeholder="Started Date  (2022-09-02T21:52)" />
          <TouchableOpacity onPress={() => { handleCheckBox(1) }} style={styles.checkBox} >
            <Text>Now</Text>
            {!checkBox.start ? <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" /> : <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" />}
          </TouchableOpacity>
        </View>
        <View style={styles.dateView}>
          <TextInput onChangeText={(text) => { mergeBook({ finishedDate: text }) }} value={book.finishedDate.toString()} style={styles.input} placeholder="Finished Date  (2022-09-02T21:52)" />
          <TouchableOpacity onPress={() => { handleCheckBox(2) }} style={styles.checkBox} >
            <Text>Now</Text>
            {!checkBox.finish ? <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" /> : <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" />}
          </TouchableOpacity>
        </View>
        <TextInput value={book.desc} onChangeText={(text) => mergeBook({ desc: text })} multiline={true} style={styles.multiline} placeholder="Description" />
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectCategory(item.id)} style={selectedCategoryId == item.id ? styles.selectedCategory : styles.category}>
              <Text style={selectedCategoryId == item.id ? styles.selectedCategoryText : styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity onPress={handleAddBook} style={styles.button}>
          <Text style={styles.buttonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default AddBook

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
  input: {
    width: "85%",
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  button: {
    width: "90%",
    height: 60,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "blue",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,

  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  category: {
    margin: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "blue",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  checkBox: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  selectedCategoryText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedCategory: {
    margin: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  multiline: {
    width: "85%",
    margin: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    textAlignVertical: "top",
    height: 100,
  }

})
