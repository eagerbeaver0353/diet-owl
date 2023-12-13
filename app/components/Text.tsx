import * as React from 'react';
import {Text} from 'react-native';

const CustomText = ({style, ...props}) => {
  return (
    <Text
      style={{
        fontSize: 16,
        color: 'black',
        fontFamily: 'Outfit-Regular',
        ...style,
      }}
      {...props}
    />
  );
};

export default CustomText;
