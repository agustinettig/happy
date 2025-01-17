import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import local from '../../images/local.png';

export default function SelectMapPosition() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('OrphanageData', { 
      latitude: location.latitude,
      longitude: location.longitude
    });
  }

  function handleLocationSelection(event: MapEvent) {
    setLocation(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView
        onPress={handleLocationSelection}
        initialRegion={{
          latitude: -23.6383638,
          longitude: -46.5675745,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
      >
        {location.latitude != 0 &&
          <Marker
            icon={local}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          />
        }
      </MapView>

      {location.latitude != 0 &&
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})