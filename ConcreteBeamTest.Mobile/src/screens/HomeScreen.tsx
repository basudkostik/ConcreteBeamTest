import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { InputField } from '../components/InputField';
import { calculateBeamCapacity } from '../api/client';
import { BeamInput, BeamResult } from '../types';
import { ResultsScreen } from './ResultsScreen';

function toNumber(text: string): number | null {
  if (text.trim() === '') return null;
  const n = Number(text.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

export const HomeScreen: React.FC = () => {
  const [fck, setFck] = useState('30');
  const [fyk, setFyk] = useState('420');
  const [b, setB] = useState('300');
  const [h, setH] = useState('500');
  const [d1, setD1] = useState('50');
  const [d2, setD2] = useState('200');
  const [asTop, setAsTop] = useState('600');
  const [asBot, setAsBot] = useState('1200');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BeamResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const isValid = useMemo(() => {
    const vals = [fck, fyk, b, h, d1, d2, asTop, asBot].map(toNumber);
    return vals.every(v => v !== null && v >= 0);
  }, [fck, fyk, b, h, d1, d2, asTop, asBot]);

  async function onCalculate() {
    console.log('🔢 Calculate button clicked');
    console.log('✅ isValid:', isValid);
    
    if (!isValid) {
      Alert.alert('Error', 'Please enter valid numeric values in all fields.');
      return;
    }

    const payload: BeamInput = {
      fck: toNumber(fck)!,
      fyk: toNumber(fyk)!,
      b: toNumber(b)!,
      h: toNumber(h)!,
      d1: toNumber(d1)!,
      d2: toNumber(d2)!,
      As_top: toNumber(asTop)!,
      As_bot: toNumber(asBot)!
    };

    console.log('📦 Payload prepared:', payload);

    try {
      setLoading(true);
      console.log('⏳ Calling API...');
      const data = await calculateBeamCapacity(payload);
      console.log('📊 Result received:', data);
      setResult(data);
      setShowResults(true);
    } catch (e: any) {
      console.error('💥 Error in onCalculate:', e);
      const msg = e?.message || 'Unknown error';
      Alert.alert(
        'Connection Error',
        msg + '\n\nTips:\n• iOS Simulator: Use localhost\n• Android Emulator: Use 10.0.2.2\n• Physical Device: Use your computer\'s IP address'
      );
    } finally {
      setLoading(false);
    }
  }

  if (showResults && result) {
    const inputs: BeamInput = {
      fck: toNumber(fck)!,
      fyk: toNumber(fyk)!,
      b: toNumber(b)!,
      h: toNumber(h)!,
      d1: toNumber(d1)!,
      d2: toNumber(d2)!,
      As_top: toNumber(asTop)!,
      As_bot: toNumber(asBot)!
    };
    return <ResultsScreen result={result} inputs={inputs} onBack={() => setShowResults(false)} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.brand}>
          <View style={styles.dot} />
          <View style={{ width: 10 }} />
          <Text style={styles.brandText}>Concrete Beam</Text>
        </View>
        <Text style={styles.heroTitle}>Reinforced Concrete Beam Capacity Calculator</Text>
        <Text style={styles.heroSubtitle}>Calculate beam strength with code-based assumptions</Text>
        <View style={styles.chips}>
          <View style={styles.chip}>
            <View style={styles.chipDot} />
            <View style={{ width: 8 }} />
            <Text style={styles.chipText}>Auto design strengths</Text>
          </View>
          <View style={styles.chip}>
            <View style={styles.chipDot} />
            <View style={{ width: 8 }} />
            <Text style={styles.chipText}>Neutral axis bisection</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Inputs</Text>
        <Text style={styles.hint}>Enter section and material values. Units: MPa, mm, mm².</Text>
        <View style={styles.inputGrid}>
          <InputField label="fck [MPa]" value={fck} onChangeText={setFck} />
          <InputField label="fyk [MPa]" value={fyk} onChangeText={setFyk} />
          <InputField label="b [mm]" value={b} onChangeText={setB} />
          <InputField label="h [mm]" value={h} onChangeText={setH} />
          <InputField label="d1 (top) [mm]" value={d1} onChangeText={setD1} />
          <InputField label="d2 (bottom) [mm]" value={d2} onChangeText={setD2} />
          <InputField label="As_top [mm²]" value={asTop} onChangeText={setAsTop} />
          <InputField label="As_bot [mm²]" value={asBot} onChangeText={setAsBot} />
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.buttonPrimary, !isValid && styles.buttonDisabled]} 
          onPress={onCalculate} 
          disabled={!isValid || loading}
          activeOpacity={0.8}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Calculate</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0b1020'
  },
  hero: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#12172a',
    borderWidth: 1,
    borderColor: '#222a45'
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
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
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: '#e6e8ee',
    letterSpacing: 0.2
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#a5abc6',
    marginBottom: 12
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginHorizontal: -4
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(91, 140, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(91, 140, 255, 0.35)',
    margin: 4
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22d3ee',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6
  },
  chipText: {
    fontSize: 12,
    color: '#dfe4ff'
  },
  card: {
    backgroundColor: '#151b31',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222a45',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 8
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    color: '#dfe4ff'
  },
  hint: {
    fontSize: 13,
    color: '#a5abc6',
    marginBottom: 12
  },
  inputGrid: {
    marginTop: 4
  },
  button: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4e79ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8
  },
  buttonPrimary: {
    backgroundColor: '#5b8cff'
  },
  buttonDisabled: {
    backgroundColor: '#415a9f',
    shadowOpacity: 0
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  },
});


