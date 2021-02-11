import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

const baseUrl = 'http://localhost:4000/';

class App extends Component {

  constructor() {
    super();
    this.addProduct = this.addProduct.bind(this);
    this.state = {
      list: [],
      name: '',
      price: ''
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    try {
      const response = await axios.get(baseUrl);
      const { data } = response;
      this.setState({ list: data });
    } catch (error) {
      console.error(error);
    }
  }

  async addProduct() {
    try {
      const { name, price } = this.state;
      const response = await axios.post(baseUrl, { name, price });
      const { data } = response;
      console.log(data);
      this.getProducts();
      this.clearInput();
    } catch (error) {
      console.error(error);
    }
  }

  clearInput() {
    this.setState({ name: '', price: '' });
  }

  async deleteProduct(id){
     try {
      const response = await axios.delete(baseUrl+`${id}`);
      const { data } = response
      console.log(data)
      this.getProducts()
    } catch (error) {
      console.log(error) 
    }
  }

  render() {
    const { list, name, price } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{borderBottomWidth:1, width:240,padding:15, marginVertical:5}}
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
          value={name}
        />
        <TextInput
        style={{borderBottomWidth:1, width:240,padding:15 ,marginVertical:5}}
          placeholder="Price"
          onChangeText={(price) => this.setState({ price })}
          value={price}
        />

        <TouchableOpacity
          style={{ padding: 12, backgroundColor: '#000' }}
          onPress={this.addProduct}>
          <Text style={{ color: '#fff' }}>
            Aceptar
            </Text>
        </TouchableOpacity>


        <View style={{ flex: 1 }}>
          {list.map(product => (
            <View key={product.id} style={styles.card} >
              <Text style={{fontSize:16}}>{product.name}</Text>
              <Text style={{fontSize:16}}>{product.price}</Text>
               <View style={{flexDirection:'row-reverse'}}>
                   <Button 
                     color="red"
                     title="Eliminar"
                     onPress={() => this.deleteProduct(product.id)}
                   />
               </View>

            </View>
          ))}
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}//fin clase App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#E8EBEC',
    padding: 35,
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 15,
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2
    },
    elevation: 4
  }
});
export default App;