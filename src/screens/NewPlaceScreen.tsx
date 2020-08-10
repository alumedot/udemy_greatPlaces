import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants';
import { addPlace } from '../store/places';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const [ titleValue, setTitleValue ] = useState('');
  const [ selectedImage, setSelectedImage ] = useState('');

  const dispatch = useDispatch();

  const onTitleChange = (text: string) => {
    setTitleValue(text);
  };

  const onSavePlace = () => {
    dispatch(addPlace(titleValue, selectedImage));
    props.navigation.goBack();
  }

  const onImageTaken = (imagePath: string) => {
    setSelectedImage(imagePath);
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
        <ImagePicker onImageTaken={onImageTaken} />
        <LocationPicker navigation={props.navigation} />
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
