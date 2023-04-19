import { View, Image, Pressable, TouchableOpacity, Linking } from "react-native"
import styles from "./styles"
import Text from "./Text"
import {useNavigation} from 'react-router-native'

const formatNumber = (num) => {
  const suffixes = ["", "k", "M", "B", "T"]
  const suffixNum = Math.floor(("" + num).length / 3)
  let shortNum = parseFloat(
    (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(3)
  )
  if (shortNum % 1 !== 0) {
    shortNum = shortNum.toFixed(1)
  }
  return shortNum + suffixes[suffixNum]
}

const RepositoryItem = ({ item, showButton }) => {
  const handleUrlClick = () => {
    Linking.openURL(item.url)
  }
  return (

    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.textContainer}>
        <Text testID="fullName" style={styles.title}>
          {item.fullName}
        </Text>
        <Text testID="description" style={styles.description}>
          {item.description}
        </Text>
        <Text testID="language" style={styles.lang}>
          {item.language}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text testID="forkCount" style={styles.label}>
              Forks
            </Text>
            <Text style={styles.info}>{formatNumber(item.forksCount)}</Text>
          </View>
          <View style={styles.info}>
            <Text testID="starCount" style={styles.label}>
              Stars
            </Text>
            <Text style={styles.info}>
              {formatNumber(item.stargazersCount)}
            </Text>
          </View>
          <View style={styles.info}>
            <Text testID="rating" style={styles.label}>
              Rating
            </Text>
            <Text style={styles.info}>{item.ratingAverage}</Text>
          </View>
          <View style={styles.info}>
            <Text testID="review" style={styles.label}>
              Reviews
            </Text>
            <Text style={styles.info}>{item.reviewCount}</Text>
          </View>
        </View>
        {showButton &&(
        <TouchableOpacity onPress={handleUrlClick}>
            <Text style={styles.calculateButton2}>Open in Github</Text>
          </TouchableOpacity>
        )}</View>
    </View>
  )
}
export default RepositoryItem
