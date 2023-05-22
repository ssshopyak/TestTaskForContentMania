import React, {FunctionComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Post} from '../store/postSlice';

const PostListItem: FunctionComponent<{post: Post}> = ({post}) => {
  return (
    <View style={style.container}>
      <Text style={style.nameText}>{post.title}</Text>
      <Text style={style.nameText}>{post.body}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  nameText: {
    padding: 15,
  },
});

export default PostListItem;
