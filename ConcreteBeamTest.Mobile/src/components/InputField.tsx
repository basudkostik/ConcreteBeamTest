import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
  placeholder?: string;
};

export const InputField: React.FC<Props> = ({ label, value, onChangeText, keyboardType = 'numeric', placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0
  },
  label: {
    fontSize: 13,
    color: '#c8ceea',
    marginBottom: 6,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderColor: '#222a45',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#0f1428',
    color: '#e6e8ee'
  }
});



