import React, { Component, useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, Text, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator, SafeAreaView, ScrollView, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function TicketStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStatusBarHeight: 0, // Header had increased size with SafeArea for some reason (https://github.com/react-navigation/react-navigation/issues/5936)
        headerStyle: { 
          backgroundColor: "dodgerblue",
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "900",
          fontSize: 26,
        },
      }}>
      <Stack.Screen name="Ticket">
        {(props) => <TicketScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Chat">
        {(props) => <ChatScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text><FontAwesome5 name={"home"} size={20} color={"dodgerblue"} />Home screen</Text>
    </View>
  );
}

function TicketScreen(props){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Ticket screen</Text>
      <Button title="Go to Chat" onPress={() => props.navigation.navigate('Chat')} />
    </View>
  );
}

function CustomKeyboardAvoidingView({ children, style }) {
    const headerHeight = useHeaderHeight();
    console.log("headerHeight: " + headerHeight)
    console.log("StatusBar.currentHeight: " + StatusBar.currentHeight)

    const insets = useSafeAreaInsets();
    const [bottomPadding, setBottomPadding] = useState(insets.bottom)
    const [topPadding, setTopPadding] = useState(insets.top)

    useEffect(() => {
      // This useEffect is needed because insets are undefined at first for some reason
      // https://github.com/th3rdwave/react-native-safe-area-context/issues/54
      setBottomPadding(insets.bottom)
      setTopPadding(insets.top)

      console.log("topPadding: " + topPadding)
      console.log("bottomPadding: " + bottomPadding)
    }, [insets.bottom, insets.top])

    return (
        <KeyboardAvoidingView
            style={style}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={headerHeight + topPadding}
        >
            {children}
        </KeyboardAvoidingView>
    );
}

function ChatScreen(){
  return(
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
              <TextInput placeholder="Type your message here..." />
          </View>
        </CustomKeyboardAvoidingView>
      </TouchableWithoutFeedback>
  )
}

const Tab = createBottomTabNavigator();

function SafeAreaNavigation(){
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: "dodgerblue"}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Ticket') {
                iconName = 'question';
              }
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            style: {
              height: 70,
              backgroundColor: "dodgerblue"
            }, 
            activeTintColor: "#fff",
            inactiveTintColor: "dodgerblue",
            inactiveBackgroundColor: "#fff",
            activeBackgroundColor: "dodgerblue",                               
            tabStyle: {
              paddingTop: 10,
              paddingBottom: 10,
              height: 70
            },
            labelStyle: {
              fontSize: 14
            },
          }}>
          <Tab.Screen name="Home">
            {(props) => <HomeScreen {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Ticket">
            {(props) => <TicketStack {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default class App extends Component {
  render(){
    return (
      <SafeAreaProvider>
        <SafeAreaNavigation />
      </SafeAreaProvider>
    );
  }
}
