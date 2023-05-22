import {StyleSheet} from 'react-native';
import {width, height} from '../utils/screen';
export const style = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#1B2223',
    minHeight: height,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  inputs: {
    width: '75%',
    borderRadius: 12,
    color: '#F4FEFD',
    backgroundColor: '#3A4F50',
  },
  sendCommentText: {
    color: '#F4FEFD',
    width: '20%',
    backgroundColor: '#3A4F50',
    borderRadius: 12,
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    textAlignVertical: 'center',
  },
  sendCommentContainer: {
    width: width * 0.9,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
