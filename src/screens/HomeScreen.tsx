import React from 'react'
import { View , Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function HomeScreen() {
  return (
 <SafeAreaView className='flex-1 bg-white justify-center items-center'>
<Text className='text-center font-semibold text-2xl'>Home Screen 🙂</Text>
 </SafeAreaView>
  )
}

export default HomeScreen