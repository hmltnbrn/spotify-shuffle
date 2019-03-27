/**
 * @format
 * @flow
 */

import {
  ToastAndroid
} from 'react-native';

type Props = {
  visible: boolean,
  message: string
};

const Toast = (props: Props) => {
  if (props.visible) {
    ToastAndroid.show(
      props.message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
    return null;
  }
  return null;
};

export default Toast;
