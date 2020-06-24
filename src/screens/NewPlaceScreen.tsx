import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import { addPlace } from '../store/places';

const NewPlaceScreen = props => {
  const [ titleValue, setTitleValue ] = useState('');

  const dispatch = useDispatch();

  const onTitleChange = (text: string) => {
    setTitleValue(text);
  };

  const onSavePlace = () => {
    dispatch(addPlace(titleValue));
    props.navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onTitleChange}
          value={titleValue}
        />
        <Button
          title="Save Place"
          color={Colors.Primary}
          onPress={onSavePlace}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 2,
  }
});

export default NewPlaceScreen;
