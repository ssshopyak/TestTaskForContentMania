import React, {FunctionComponent, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  Comments,
  deleteComment,
  deleteServerComments,
  updateComment,
  updateComments,
} from '../store/commentsSlice';
import {width} from '../utils/screen';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/store';

const CommentsItem: FunctionComponent<{comments: Comments}> = ({comments}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState(comments.text);
  const dispatch = useDispatch<AppDispatch>();
  const toEditPost = () => {
    setIsEditable(!isEditable);
  };
  const toUpdatePost = () => {
    setIsEditable(false);
    const postID = comments.postId;
    dispatch(updateComments({text: text, id: comments.id, postId: postID}));
    dispatch(updateComment({text: text, id: comments.id, postId: postID}));
  };
  const toDeletePost = () => {
    const postID = comments.postId;
    const ID = comments.id;
    dispatch(deleteServerComments({postId: postID, id: ID}));
    dispatch(deleteComment(ID));
  };
  const toCancelEditing = () => {
    setText(comments.text);
    setIsEditable(false);
  };
  return (
    <View style={style.container}>
      {isEditable ? (
        <>
          <TextInput
            editable
            multiline
            onChangeText={(texts: any) => setText(texts)}
            value={text}
            style={style.inputs}
          />
        </>
      ) : (
        <>
          <Text style={style.nameText}>{text}</Text>
        </>
      )}

      <View style={style.editButtonContainer}>
        {isEditable ? (
          <TouchableOpacity onPress={toUpdatePost}>
            <Text style={style.buttons}>{'Save'}</Text>
          </TouchableOpacity>
        ) : null}
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
  inputs: {
    color: '#F4FEFD',
    marginHorizontal: 10,
  },
  container: {
    width: width * 0.9,
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#3A4F50',
    flexDirection: 'column',
    padding: 5,
  },
  nameText: {
    color: '#f4fefd',
    padding: 15,
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
});

export default CommentsItem;
