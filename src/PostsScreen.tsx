/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, View, TextInput, ScrollView} from 'react-native';
import {
  createComment,
  fetchComments,
  sendComments,
} from '../store/commentsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import PostListItem from '../components/PostItem';
import {style} from './PostsStyle';
import CommentsItem from '../components/CommentsItem';
function PostsScreen({
  route,
  navigation,
}: {
  navigation: any;
  route: any;
}): JSX.Element {
  const [text, setText] = useState('');
  const {post} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const screenState = useSelector((state: RootState) => state.commentsSlice);
  const postId = post.id;
  const toSendComment = () => {
    dispatch(sendComments({postId: postId, text: text}));
    dispatch(createComment({postId: postId, text: text}));
  };
  useEffect(() => {
    dispatch(fetchComments({postId}));
  }, []);
  return (
    <ScrollView style={style.container}>
      <Text
        onPress={() => {
          // navigation.goBack();
          console.log(screenState);
        }}>
        Posts
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {screenState.loading && <Text>LOADING</Text>}
        {screenState.error && <Text>ERROR</Text>}
        {!screenState.loading && !screenState.error && (
          <>
            <PostListItem post={post} />
            <View style={style.sendCommentContainer}>
              <TextInput
                editable
                placeholder="Send Some Coment"
                placeholderTextColor={'#F4FEFD'}
                onChangeText={(texts: any) => setText(texts)}
                value={text}
                style={style.inputs}
              />
              <Text style={style.sendCommentText} onPress={toSendComment}>
                Send
              </Text>
            </View>
            <FlatList
              contentContainerStyle={style.listContainer}
              data={screenState.comments}
              keyExtractor={item => item.id}
              renderItem={({item}) => <CommentsItem comments={item} />}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default PostsScreen;
