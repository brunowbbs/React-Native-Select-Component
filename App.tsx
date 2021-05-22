import React from 'react'
import { Alert, SafeAreaView, Text } from 'react-native'

import Select from './src/SelectComponent';
import { list } from './src/data/index';

const App = () => {


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Select
        options={list}
        onChangeSelect={(id) => console.log(id)}
        text="Selecione um usuário"
        label="Usuário"
      />
    </SafeAreaView>
  )
}

export default App;