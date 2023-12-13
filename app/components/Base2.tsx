import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

import Layout from './Layout';

const brandIcon = require('../assets/images//brand.png');
const svgIcon1 = require('../assets/images/svg-1.png');
const svgIcon2 = require('../assets/images/svg-2.png');
const svgIcon3 = require('../assets/images/svg-3.png');
const svgIcon4 = require('../assets/images/svg-4.png');
const centerImage = require('../assets/images/center-image.png');

const imageR = 80,
  overlayR = 92,
  diffR = Math.floor((overlayR - imageR) / 2),
  borderR = 20,
  liftOffset = 50,
  curveDegree = 30;

/**
 * @var imageR      the radius of the image
 * @var overlayR    the radius of the outlining circle
 * @var borderR     the sided radius of left and right rect
 * @var liftOffset  how much the circle is lifted
 * @var curveDegree how curved the boundary is
 */

// const imageWidth = 180,
//   borderWidth = 27,
const imageTopPos = 110;
// const otherWidth = (imageWidth - borderWidth) / 2;

const BaseLayout1 = ({children}) => {
  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Image source={svgIcon1} style={styles.svgIcon1} />
        <Image source={svgIcon2} style={styles.svgIcon2} />
        <Image source={svgIcon3} style={styles.svgIcon3} />
        <Image source={svgIcon4} style={styles.svgIcon4} />
        <Image source={centerImage} style={styles.centerImage} />

        <View style={styles.overlayImage} />

        <View style={styles.container}>
          <View style={styles.upperPart}>
            <Image source={brandIcon} style={styles.brandIcon} />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: overlayR - liftOffset,
              marginTop: overlayR + liftOffset,
            }}>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: borderR * 2,
                backgroundColor: 'white',
              }}
            />
            <View
              style={{
                flex: 0,
                width:
                  2 *
                    Math.sqrt(
                      overlayR * overlayR -
                        (liftOffset + borderR) * (liftOffset + borderR),
                    ) +
                  curveDegree,
                backgroundColor: 'white',
              }}
            />
            <View
              style={{
                flex: 1,
                borderTopLeftRadius: borderR * 2,
                backgroundColor: 'white',
              }}
            />
          </View>
          {children}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default BaseLayout1;

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandIcon: {
    width: 160,
    height: 60,
    objectFit: 'contain',
    marginTop: 10,
    marginBottom: 10,
  },
  upperPart: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
  },
  svgIcon1: {
    position: 'absolute',
    top: 53,
    left: 0,
  },
  svgIcon2: {
    position: 'absolute',
    top: 20,
    right: 0,
  },
  svgIcon3: {
    position: 'absolute',
    top: 86,
    left: 300,
    zIndex: 1,
  },
  svgIcon4: {
    position: 'absolute',
    top: 150.08,
    left: 110,
    zIndex: 1,
  },
  centerImage: {
    position: 'absolute',
    top: imageTopPos + diffR,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 1000,
    width: imageR * 2,
    height: imageR * 2,
  },
  overlayImage: {
    position: 'absolute',
    top: imageTopPos,
    alignSelf: 'center',
    zIndex: 1,
    borderRadius: 1000,
    width: overlayR * 2,
    height: overlayR * 2,
    backgroundColor: '#122E33',
  },
});

export default BaseLayout1;
