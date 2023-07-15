import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BottomSheet = () => {
    bs = React.createRef();
  return (
    <View>
        <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        intitialSnap = {1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        />
    </View>
  )
}

export default BottomSheet

const styles = StyleSheet.create({})