import {StyleSheet} from 'react-native';
import {width, height} from '../utils/screen';
export const style = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#1B2223',
    minHeight: height,
  },
  listContainer: {
    paddingBottom: 100,
    width: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  addPostButton: {
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#3A4F50',
    borderRadius: 25,
    bottom: 50,
    left: width * 0.5 - 25,
  },
  addPostButtonText: {
    color: '#F4FEFD',
    fontSize: 32,
    width: 50,
    textAlign: 'center',
  },
});
