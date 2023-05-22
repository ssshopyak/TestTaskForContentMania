import React from 'react';
import {SafeAreaView, Text} from 'react-native';

function PostsScreen({navigation}: {navigation: any}): JSX.Element {
  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          navigation.navigate('Home');
        }}>
        Posts
      </Text>
    </SafeAreaView>
  );
}

export default PostsScreen;
