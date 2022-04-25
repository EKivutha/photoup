import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import BottomSheet from 'react-native-simple-bottom-sheet';

export default class profileScreen extends Component {
  render() {
    return (
      <View>
        <Text>Profile picture</Text>
        <Text>Upload your photo so that you can optionally display it to others</Text>
        {/* camera svg */}

        <Button title= "Add a Photo" onPress = {() => panelRef.current.togglePanel()}/>
        <Button title= "Skip" />
        <BottomSheet>
        <Button title="Take a Photo" onPress={takeImage} />
        <Button title="Take a Photo" onPress={uploadImage} />
        </BottomSheet>
      </View>
    )
  }
}

const styles = StyleSheet.create({})