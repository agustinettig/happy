import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import local from '../images/local.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(
        useCallback(() => {
            api.get('orphanages').then(response => {
                setOrphanages(response.data);
            });
        }, [])
    );

    const navigation = useNavigation();

    function handleNavigateToOphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

    function handleNavigateToCreateOphanage() {
        navigation.navigate('SelectMapPosition')
    }


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.6383638,
                    longitude: -46.5675745,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
                {orphanages.map(orphanage => {
                    return (<Marker
                        key={orphanage.id}
                        icon={local}
                        calloutAnchor={{
                            x: 3.4,
                            y: 1,
                        }}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                        }}
                    >
                        <Callout tooltip onPress={() => handleNavigateToOphanageDetails(orphanage.id)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{orphanage.name}</Text>
                            </View>
                        </Callout>
                    </Marker>)
                })
                }
            </MapView>

            <View style={styles.footer}>
                {orphanages.length == 0 && <Text style={styles.footerText}>Nenhum orfanato encontrado</Text>}
                {orphanages.length == 1 && <Text style={styles.footerText}>1 orfanato encontrado</Text>}
                {orphanages.length > 1 && <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>}

                <TouchableOpacity style={styles.createOrphanageButton} onPress={handleNavigateToCreateOphanage}>
                    <Feather name="plus" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 16,
        justifyContent: 'center',
    },

    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3,
    },

    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3',
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },
});
