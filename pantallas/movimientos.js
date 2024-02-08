import React, {Component} from "react";
import { StyleSheet, Text, TouchableOpacity, View , TextInput, ImageBackground,
  KeyboardAvoidingView,Alert, Image} from 'react-native';
//import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import app from "../config";
import {getFirestore,collection,query,where,getDocs, addDoc, updateDoc} from "firebase/firestore/lite";

          
const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");
const db=getFirestore(app);

export default class TranssaccionPantalla extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: "",
      studentId: "",
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      bookName: "",
      studentName: ""
    };
  }

  getCameraPermissions = async domState=>{
    //const {status} = await Permissions.askAsync(Permissions.CAMERA);
    const {status} = await Camera.requestCameraPermissionsAsync();
    this.setState({
      hasCameraPermissions:status==="granted",
      domState:domState,
      //console.log(domSate);
      scanned:false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { domState } = this.state;

    if (domState === "bookId") {
      this.setState({
        bookId: data,
        domState: "normal",
        scanned: true
      });
    } else if (domState === "studentId") {
      this.setState({
        studentId: data,
        domState: "normal",
        scanned: true
      });
    }
  };

  handleTransaction = async () => {
    var {bookId,studentId}=this.state;
    await this.getBookDetails(bookId);
    await this.getStudentDetails(studentId);
    let dbQuery=collection(db,"books");

    let bookref= await getDocs(dbQuery);
    let booksan=bookref.docs.map(doc=>doc.data());
   console.log(booksan)
  };

  getBookDetails = async (bookId)=> {
    bookId = bookId.trim();
    console.log("bookId: ",bookId);
    const base = query(collection(db,"books"),where("book_id","==",bookId));
    const q = await getDocs(base);
    q.forEach((doc)=>{
      console.log("q: ",doc.data());
    });
    
  };

  getStudentDetails = async (studentId)=> {
    studentId = studentId.trim();
    console.log("studentId: ",studentId);
    const base = query(collection(db,"estudiantes"),where("student_id","==",studentId));
    const qq = await getDocs(base);
    qq.forEach((doc)=>{
      console.log("qq: ",doc.data());
    });
  };


  initiateBookIssue = async (bookId, studentId, bookName, studentName) => {

    //agrega una transacción
    let tr = await addDoc(collection(db,"transaccion"),{
      student_id: studentId,
      student_name: studentName,
      book_id: bookId,
      book_name: bookName,
      date: firebase.firestore.Timestamp.now().toDate(),
      transaccion_type: "otro"
    });
    /*db.collection("transactions").add({
      student_id: studentId,
      student_name: studentName,
      book_id: bookId,
      book_name: bookName,
      date: firebase.firestore.Timestamp.now().toDate(),
      transaction_type: "issue"
    });*/
    //cambia el estado del libro
    //let es = await updateDoc()
    /*db.collection("books")
      .doc(bookId)
      .update({
        is_book_available: false
      });*/
    //cambia el número de libros emitidos al alumno
    /*db.collection("students")
      .doc(studentId)
      .update({
        number_of_books_issued: firebase.firestore.FieldValue.increment(1)
      });

    // Actualiza el estado local
    this.setState({
      bookId: "",
      studentId: ""
    });*/
  };
  initiateBookReturn = async (bookId, studentId, bookName, studentName) => {
    //agrega una transacción
    /*db.collection("transactions").add({
      student_id: studentId,
      student_name: studentName,
      book_id: bookId,
      book_name: bookName,
      date: firebase.firestore.Timestamp.now().toDate(),
      transaction_type: "return"
    });
    //cambia el estado del libro
    db.collection("books")
      .doc(bookId)
      .update({
        is_book_available: true
      });
    //cambia el número de libros emitidos al alumno
    db.collection("students")
      .doc(studentId)
      .update({
        number_of_books_issued: firebase.firestore.FieldValue.increment(-1)
      });

    // actualiza el estado local
    this.setState({
      bookId: "",
      studentId: ""
    });*/
  };

    render(){
      const{bookId,studentId,domState,scanned}=this.state;
      if(domState!=="normal"){
        return(
          <BarCodeScanner onBarCodeScanned={scanned ? undefined: this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
        );
      }
       return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgImage}>
          <View style={styles.upperContainer}>
            <Image source={appIcon} style={styles.appIcon} />
            <Image source={appName} style={styles.appName} />
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.textinputContainer}>
              <TextInput
                style={styles.textinput}
                placeholder={"Book Id"}
                placeholderTextColor={"#FFFFFF"}
                value={bookId}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("bookId")}
              >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.textinputContainer, { marginTop: 25 }]}>
              <TextInput
                style={styles.textinput}
                placeholder={"Student Id"}
                placeholderTextColor={"#FFFFFF"}
                value={studentId}
              />
              <TouchableOpacity
                style={styles.scanbutton}
                onPress={() => this.getCameraPermissions("studentId")}
              >
                <Text style={styles.scanbuttonText}>Scan</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.button,{marginTop:25}]}
              onPress={this.handleTransaction}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80
  },
  appName: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  lowerContainer: {
    flex: 0.5,
    alignItems: "center"
  },
  textinputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF"
  },
  textinput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 3,
    fontSize: 18,
    backgroundColor: "#5653D4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#FFFFFF"
  },
  scanbutton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  scanbuttonText: {
    fontSize: 24,
    color: "#0A0101",
    fontFamily: "Rajdhani_600SemiBold"
  },
  button:{
    width:"43%",
    height:55,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#F48D20",
    borderRadius:15
  },
  buttonText:{
    fontSize:24,
    color:"#FFFFFF",
    fontFamily:"Rajdhani_600SemiBold"
  }
});