import React, { Component } from 'react';
import { View, KeyboardAvoidingView, TextInput, Text, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator, SafeAreaView, ScrollView, Button, StatusBar   } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';

const Stack = createStackNavigator();

function TicketStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ticket" component={TicketScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen!</Text>
    </View>
  );
}

function TicketScreen(props){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ticket screen!</Text>
      <Button title="Go to Chat" onPress={() => props.navigation.navigate('Chat')} />
    </View>
  );
}

function CustomKeyboardAvoidingView({ children, style }) {
    const headerHeight = useHeaderHeight();

    return (
        <KeyboardAvoidingView
            style={style}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight + StatusBar.currentHeight}
        >
            {children}
        </KeyboardAvoidingView>
    );
}

function ChatScreen(){
  return(
    <SafeAreaView SafeAreaView style={{flex: 1, backgroundColor: "grey"}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <CustomKeyboardAvoidingView style={{backgroundColor: "#fff", flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
          <View style={{backgroundColor: "dodgerblue", paddingVertical: 15}}>
              <View style={{ margin: 10, marginBottom: 15}}>
                  <ActivityIndicator size="large" style={{marginBottom: 10}}/>
                  <Text>Waiting for more info here....</Text>
              </View>
          </View>

          <ScrollView style={{backgroundColor: "tomato", paddingVertical: 15}}>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
              <Text>Chat messages</Text>
          </ScrollView>
          
          <View style={{backgroundColor: "yellow", paddingVertical: 15}}>
              <TextInput placeholder="Type your message here" />
          </View>
        </CustomKeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const Tab = createBottomTabNavigator();

export default class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Ticket" component={TicketStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
