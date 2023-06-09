import React, {FunctionComponent, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  deletePost,
  deleteServerPost,
  updatePost,
  updatePosts,
} from '../store/postSlice';
import {Post} from '../store/postSlice';
import {width} from '../utils/screen';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/store';
import {useNavigation} from '@react-navigation/native';

const PostListItem: FunctionComponent<{post: Post}> = ({post}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const goToPostDetail = () => {
    navigation.navigate(
      'Posts' as never,
      {
        post: post,
      } as never,
    );
  };
  const toEditPost = () => {
    setIsEditable(!isEditable);
  };
  const toUpdatePost = () => {
    setIsEditable(false);
    const postID = post.id;
    dispatch(updatePosts({title: title, bodyText: body, postId: postID}));
    dispatch(updatePost({title: title, bodyText: body, postId: postID}));
  };
  const toDeletePost = () => {
    const postID = post.id;
    dispatch(deleteServerPost(postID));
    dispatch(deletePost(postID));
  };
  const toCancelEditing = () => {
    setTitle(post.title);
    setBody(post.body);
    setIsEditable(false);
  };
  return (
    <View style={style.container}>
      {isEditable ? (
        <>
          <TextInput
            editable
            multiline
            onChangeText={(text: any) => setTitle(text)}
            value={title}
            style={style.inputs}
          />
          <TextInput
            editable
            multiline
            onChangeText={(text: any) => setBody(text)}
            value={body}
            style={style.inputs}
          />
        </>
      ) : (
        <>
          <Text style={style.nameText}>{title}</Text>
          <Text style={style.nameText}>{body}</Text>
        </>
      )}
      <View style={style.editButtonContainer}>
        <TouchableOpacity onPress={isEditable ? toUpdatePost : goToPostDetail}>
          <Text style={style.buttons}>{isEditable ? 'Save' : 'More'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={isEditable ? toCancelEditing : toEditPost}>
          <Text style={style.buttons}>{isEditable ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toDeletePost}>
          <Text style={style.buttons}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: width * 0.9,
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#3A4F50',
    flexDirection: 'column',
    padding: 5,
  },
  nameText: {
    color: '#F4FEFD',
    padding: 10,
  },
  buttons: {
    margin: 5,
    padding: 10,
    backgroundColor: '#1B2223',
    color: '#F4FEFD',
    borderRadius: 8,
  },
  editButtonContainer: {
    backgroundColor: '#3A4F50',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButtons: {
    position: 'absolute',
    backgroundColor: '#0EF6CC',
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
    right: 5,
    top: 5,
  },
  inputs: {
    color: '#F4FEFD',
    marginHorizontal: 10,
  },
});

export default PostListItem;
