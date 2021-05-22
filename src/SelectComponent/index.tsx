import React, { useState } from 'react'
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, Modal, StyleSheet, Alert, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  options: Array<Object>,
  onChangeSelect: (id: String) => void,
  text: String,
  label: String
}

const { width } = Dimensions.get("window");

const ListaHorizontal = ({ options, onChangeSelect, text, label }: IProps) => {

  const [txt, setTxt] = useState(text);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(0);

  function renderOption(item: any) {
    return (
      <TouchableOpacity
        style={[styles.optionContainer, { backgroundColor: item.id === selected ? '#eee' : '#fff' }]}
        onPress={() => {
          onChangeSelect(item.id)
          setTxt(item.name)
          setModalVisible(false)
          setSelected(item.id)
        }}>
        <Text style={[styles.optionTxt, { fontWeight: item.id === selected ? 'bold' : 'normal' }]}>{item.name}</Text>
        { item.id === selected && <Icon name="check" size={22} color="green" />}
      </TouchableOpacity>
    )
  }

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
        <Text style={styles.text} numberOfLines={1}>{txt}</Text>
        <Icon name={"chevron-down"} size={22} color="#587657" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} //botão goBack android

      >
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity>
              <Icon name="chevron-left" size={22} color="#555" onPress={() => setModalVisible(false)} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{text}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <FlatList
          data={options ?? []}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => renderOption(item)}
        />
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    marginHorizontal: 20,
    borderRadius: 8,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#CCC",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between"
  },

  text: {
    color: '#555',
    fontSize: 16,
    width: width - 24 - 40 - 26
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 12

  },
  modalTitle: {
    fontSize: 18,
    color: '#555',
  },

  modalCancel: {
    fontSize: 14,
    color: 'blue',
    fontWeight: '600'
  },

  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    padding: 10
  },

  optionTxt: {
    fontSize: 16,
    color: '#555'
  },

  label: {
    color: '#555',
    fontSize: 13,
    paddingLeft: 20,
    paddingVertical: 10
  }
})


export default ListaHorizontal;
