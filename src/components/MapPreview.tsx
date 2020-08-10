import React, { FC } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import ENV from '../../env';

type Props = {
  styles: {};
  onPress: () => void;
  location: {
    lat: number,
    lng: number,
  } | null;
}

const MapPreview: FC<Props> = (props) => {
  const { location, onPress, children } = props;
  let imagePreviewUrl;

  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      location.lat
    },${
      location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=markers=color:red%7Clabel:A%7C${
      location.lat
    },${location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity onPress={onPress} style={{ ...styles.mapPreview, ...props.styles }}>
      {
        props.location ?
          <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
          : children
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapPreview;
