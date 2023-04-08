import { StyleSheet } from "react-native"
import { useField } from "formik"
import { View } from "react-native"
import TextInput from "./TextInput"
import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "flex-start",
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  errorText: {
    marginTop: 5,
    color: "red",
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 1,
    height: 20,
  },
  inputError: {
    borderColor: "red",
  },
})

const FormikTextInput = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, showError && styles.inputError]}>
        <TextInput
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          {...props}
        />
      </View>
      <View style={{ marginTop: 5 }}>
        {showError && <Text style={styles.errorText}>{meta.error}</Text>}
      </View>
    </View>
  )
}

export default FormikTextInput
