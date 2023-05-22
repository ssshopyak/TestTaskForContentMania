import React, {useEffect} from 'react';
import {SafeAreaView, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import {fetchPosts} from '../store/postSlice';
import PostListItem from '../components/PostItem';
function HomeScreen({navigation}: {navigation: any}): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const screenState = useSelector((state: RootState) => state.postSlice);
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <SafeAreaView>
      <Text
        onPress={() => {
          navigation.navigate('Posts');
        }}>
        Home
      </Text>
      <>
        {screenState.loading && <Text>LOADING</Text>}
        {screenState.error && <Text>ERROR</Text>}
        {!screenState.loading && !screenState.error && <Text>DEFAULT</Text>}
        <FlatList
          data={screenState.posts}
          keyExtractor={(_, index) => {
            return index.toString();
          }}
          renderItem={({item}) => <PostListItem post={item} />}
          // onEndReached={handleOnEndReached}
        />
      </>
    </SafeAreaView>
  );
}

export default HomeScreen;
