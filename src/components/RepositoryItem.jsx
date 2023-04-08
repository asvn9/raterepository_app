import { View, Image} from "react-native"
import styles from "./styles"
import Text from "./Text"

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

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.lang}>{item.language}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.label}>Forks</Text>
            <Text style={styles.info}>{formatNumber(item.forksCount)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Stars</Text>
            <Text style={styles.info}>
              {formatNumber(item.stargazersCount)}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Rating</Text>
            <Text style={styles.info}>{item.ratingAverage}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Reviews</Text>
            <Text style={styles.info}>{item.reviewCount}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
export default RepositoryItem
