import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {ClipPath, Defs, Rect} from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const App = () => {
  const mainCursorX = useSharedValue<number>(0);

  const HEIGHT = 200;
  const WIDTH = 200;

  const animatedProps = useAnimatedProps(() => {
    return {
      width: mainCursorX.value + 50,
    };
  });

  useEffect(() => {
    mainCursorX.value = withTiming(WIDTH - 50, {duration: 2000});
  });

  return (
    <SafeAreaView style={styles.container}>
      <Svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
        <Rect
          y="0"
          x="0"
          width={WIDTH}
          height={HEIGHT}
          fill="green"
          clipPath="url(#clipMain)"
        />
        <ClipPath id="clipMain">
          <AnimatedRect
            y="0"
            x="0"
            animatedProps={animatedProps}
            height={HEIGHT}
            fill="blue"
          />
        </ClipPath>
      </Svg>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});
