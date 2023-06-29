import React, {useContext} from 'react';
import {Box, useDisclose, IconButton, Stagger, HStack, Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {useNavigation} from '@react-navigation/native';
import {PRIMARY, SECUNDARY, WHITE} from '../../styles/colors';

export const StaggerComponent = ({user}) => {
  const {isOpen, onToggle} = useDisclose();
  const navigation = useNavigation();
  return (
    <Box>
      <Box alignItems="center">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                offset: 30,
                reverse: true,
              },
            },
          }}>
          {user && user.is_admin == true ? (
            <>
              <IconButton
                mb="4"
                variant="solid"
                bg={PRIMARY}
                size="lg"
                colorScheme="indigo"
                borderRadius="full"
                icon={
                  <Icon
                    as={Entypo}
                    size="10"
                    name="help"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="warmGray.50"
                    onPress={() =>
                      navigation.navigate('Help', {navigation: navigation})
                    }
                  />
                }
              />
              <IconButton
                mb="4"
                variant="solid"
                bg={SECUNDARY}
                colorScheme="red"
                size="lg"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    size="10"
                    name="cellphone-nfc"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="warmGray.50"
                    onPress={() =>
                      navigation.navigate('NfcWrite', {navigation: navigation})
                    }
                  />
                }
              />
            </>
          ) : (
            <IconButton
              mb="4"
              variant="solid"
              bg={PRIMARY}
              size="lg"
              colorScheme="indigo"
              borderRadius="full"
              icon={
                <Icon
                  as={Entypo}
                  size="10"
                  name="help"
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="warmGray.50"
                  onPress={() =>
                    navigation.navigate('Help', {navigation: navigation})
                  }
                />
              }
            />
          )}
        </Stagger>
      </Box>
      <HStack justifyContent="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg={PRIMARY}
          style={{
            shadowOffset: {width: -4, height: 4},
            shadowColor: '#171717',
            shadowOpacity: 0.5,
            shadowRadius: 3,
          }}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="10"
              name="dots-horizontal"
              color={WHITE}
              _dark={{
                color: 'warmGray.50',
              }}
            />
          }
        />
      </HStack>
    </Box>
  );
};
