import { Platform, PixelRatio, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenWidth = width < height ? width : height;

const normalize = (size) => {
  // Standardizing font size for iPhone 5s (320 width) and Android device with scale factor 2
  const scale = screenWidth / 320 * (Platform.OS === 'android' ? 2 : 1);

  // Calculate the normalized fontSize
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(size * scale));

  return normalizedSize;
};

export default normalize;