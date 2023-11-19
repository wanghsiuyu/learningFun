import React, { useRef, createRef, useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import { Home, Profile, Search } from 'screens'
import { COLORS, SIZES, FONTS, constants } from 'constants'

const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
  ...bottom_tab,
  ref: createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

  const inputRange = bottom_tabs.map((_, i) => i * SIZES.width)

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width)
  })

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x)
  })

  return (
    <Animated.View
      className="absolute left-0 h-full"
      style={{ width: tabIndicatorWidth, transform: [{ translateX }], borderRadius: SIZES.radius, backgroundColor: COLORS.primary }}
    />
  )
}
const Tabs = ({ scrollX, onBottomTabPress }) => {

  const containerRef = useRef()
  const [measureLayout, setMeasureLayout] = useState([])

  useEffect(() => {
    let ml = []

    bottom_tabs.forEach((bottom_tab) => {
      bottom_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height })
          if (ml.length === bottom_tabs.length) {
            setMeasureLayout(ml)
          }
        })
    })
  }, [containerRef.current])

  return (
    <View
      ref={containerRef}
      className="flex-1 flex-row "
    >
      {/* Tabs Indicator */}
      {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}

      {/* Tabs */}
      {bottom_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`BottomTab-${index}`}
            ref={item.ref}
            className="flex-1 px-[15px] justify-center items-center"
            onPress={() => onBottomTabPress(index)}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              className="w-[25px] h-[25px]"
            />
            <Text className="mt-[3px] text-white" style={{ ...FONTS.h3 }}>{item.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
const MainLayout = () => {

  const flatListRef = useRef()
  const scrollX = useRef(new Animated.Value(0)).current

  const onBottomTabPress = useCallback(bottomTabIndex => {
    flatListRef?.current?.scrollToOffset({
      offset: bottomTabIndex * SIZES.width
    })
  })

  const renderContent = () => {
    return (
      <View className="flex-1" >
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={item => `Main-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width
                }}
              >
                {item.label === constants.screens.home && <Home />}
                {item.label === constants.screens.search && <Search />}
                {item.label === constants.screens.profile && <Profile />}
              </View>
            )
          }}
        />
      </View>
    )
  }

  const renderBottomTab = () => {
    return (
      <View
        className="mb-5"
        style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.radius }}>
        <Shadow style={{ width: SIZES.width - SIZES.padding * 2, height: 85 }} >
          <View className="flex-1" style={{ borderRadius: SIZES.radius, backgroundColor: COLORS.primary3 }}>
            <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress} />
          </View>
        </Shadow>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-white" >
      {/* Content */}
      {renderContent()}
      {/* Bottom tab */}
      {renderBottomTab()}
    </View>
  )
}

export default MainLayout

