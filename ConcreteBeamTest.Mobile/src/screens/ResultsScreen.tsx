import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BeamResult, BeamInput } from '../types';

type Props = {
  result: BeamResult;
  inputs: BeamInput;
  onBack: () => void;
};

export const ResultsScreen: React.FC<Props> = ({ result, inputs, onBack }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
      <View style={styles.brand}>
        <View style={styles.dot} />
        <View style={{ width: 10 }} />
        <Text style={styles.brandText}>Results</Text>
      </View>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Beam Capacity Calculation</Text>
        <Text style={styles.heroSubtitle}>Design moment capacity: {result.m_rd_kNm.toFixed(3)} kNm</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Design Parameters</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>fcd</Text>
            <Text style={styles.gridValue}>{result.fcd.toFixed(2)} MPa</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>fyd</Text>
            <Text style={styles.gridValue}>{result.fyd.toFixed(2)} MPa</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Es</Text>
            <Text style={styles.gridValue}>{result.es.toFixed(0)} MPa</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>εcu</Text>
            <Text style={styles.gridValue}>{result.epsilon_cu.toFixed(4)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Neutral Axis & Dimensions</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>x</Text>
            <Text style={styles.gridValue}>{result.x.toFixed(2)} mm</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>a</Text>
            <Text style={styles.gridValue}>{result.a.toFixed(2)} mm</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>h</Text>
            <Text style={styles.gridValue}>{inputs.h} mm</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>b</Text>
            <Text style={styles.gridValue}>{inputs.b} mm</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reinforcement Strains</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>εs_top</Text>
            <Text style={styles.gridValue}>{result.eps_s_top.toExponential(3)}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>εs_bot</Text>
            <Text style={styles.gridValue}>{result.eps_s_bot.toExponential(3)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reinforcement Stresses</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>fs_top</Text>
            <Text style={styles.gridValue}>{result.fs_top.toFixed(2)} MPa</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>fs_bot</Text>
            <Text style={styles.gridValue}>{result.fs_bot.toFixed(2)} MPa</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forces</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Fc</Text>
            <Text style={styles.gridValue}>{result.fc_kN.toFixed(2)} kN</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Fs_top</Text>
            <Text style={styles.gridValue}>{result.fs_top_kN.toFixed(2)} kN</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Fs_bot</Text>
            <Text style={styles.gridValue}>{result.fs_bot_kN.toFixed(2)} kN</Text>
          </View>
        </View>
      </View>

      <View style={styles.highlightSection}>
        <Text style={styles.highlightLabel}>Design Moment Capacity</Text>
        <Text style={styles.highlightValue}>{result.m_rd_kNm.toFixed(3)} kNm</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onBack} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Calculate Another</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0b1020',
    paddingBottom: 32
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22d3ee',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8
  },
  brandText: {
    color: '#e6e8ee',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)'
  },
  backButtonText: {
    color: '#dfe4ff',
    fontSize: 14,
    fontWeight: '600'
  },
  hero: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#12172a',
    borderWidth: 1,
    borderColor: '#222a45'
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
    color: '#e6e8ee'
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#5b8cff',
    fontWeight: '600'
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#151b31',
    borderWidth: 1,
    borderColor: '#222a45'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#dfe4ff'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  },
  gridItem: {
    flex: 1,
    minWidth: '45%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#0f1428',
    borderWidth: 1,
    borderColor: '#222a45',
    margin: 6
  },
  gridLabel: {
    fontSize: 12,
    color: '#b7bee1',
    fontWeight: '600',
    marginBottom: 4
  },
  gridValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600'
  },
  highlightSection: {
    marginTop: 8,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(91, 140, 255, 0.15)',
    borderWidth: 2,
    borderColor: '#5b8cff',
    alignItems: 'center'
  },
  highlightLabel: {
    fontSize: 14,
    color: '#b7bee1',
    marginBottom: 8,
    fontWeight: '600'
  },
  highlightValue: {
    fontSize: 32,
    color: '#5b8cff',
    fontWeight: '700',
    letterSpacing: 0.5
  },
  button: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#5b8cff',
    alignItems: 'center',
    shadowColor: '#4e79ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  }
});

