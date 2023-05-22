/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import {fetchPosts} from '../store/postSlice';
import PostListItem from '../components/PostItem';
import AddPostModal from '../components/AddPostModal';
import {style} from './HomeStyle';

function HomeScreen({navigation}: {navigation: any}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const screenState = useSelector((state: RootState) => state.postSlice);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchPosts());
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <>
        {screenState.loading && <Text>LOADING</Text>}
        {screenState.error && <Text>ERROR</Text>}
        {!screenState.loading && !screenState.error && (
          <>
            <FlatList
              contentContainerStyle={style.listContainer}
              data={screenState.posts}
              keyExtractor={item => item.id}
              renderItem={({item}) => <PostListItem post={item} />}
            />
          </>
        )}
      </>
      <TouchableOpacity
        style={style.addPostButton}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <Text style={style.addPostButtonText}>+</Text>
      </TouchableOpacity>
      <AddPostModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
