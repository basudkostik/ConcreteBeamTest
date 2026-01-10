import 'package:flutter/material.dart';
import '../widgets/input_field.dart';
import '../beam_calculator.dart';
import 'results_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final controllerFck = TextEditingController(text: '30');
  final controllerFyk = TextEditingController(text: '420');
  final controllerB   = TextEditingController(text: '300');
  final controllerH   = TextEditingController(text: '500');
  final controllerD1  = TextEditingController(text: '50');
  final controllerD2  = TextEditingController(text: '200');
  final controllerAsTop = TextEditingController(text: '600');
  final controllerAsBot = TextEditingController(text: '1200');
  bool loading = false;
  BeamResult? result;
  bool showResult = false;

  bool get isValid => [controllerFck,controllerFyk,controllerB,controllerH,controllerD1,controllerD2,controllerAsTop,controllerAsBot]
    .every((c) => double.tryParse(c.text.replaceAll(',', '.')) != null && double.parse(c.text.replaceAll(',', '.')) >= 0);

  void onCalculate() {
    if (!isValid) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please enter valid numeric values in all fields.')));
      return;
    }
    setState(() => loading=true);
    try {
      final input = BeamInput(
        fck: double.parse(controllerFck.text),
        fyk: double.parse(controllerFyk.text),
        b: double.parse(controllerB.text),
        h: double.parse(controllerH.text),
        d1: double.parse(controllerD1.text),
        d2: double.parse(controllerD2.text),
        AsTop: double.parse(controllerAsTop.text),
        AsBot: double.parse(controllerAsBot.text),
      );
      final res = calculateBeamCapacity(input);
      setState(() { result = res; showResult = true; });
    } catch(e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Calculation error: $e')));
    } finally {
      setState(() => loading=false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (showResult && result != null) {
      final input = BeamInput(
        fck: double.parse(controllerFck.text),
        fyk: double.parse(controllerFyk.text),
        b: double.parse(controllerB.text),
        h: double.parse(controllerH.text),
        d1: double.parse(controllerD1.text),
        d2: double.parse(controllerD2.text),
        AsTop: double.parse(controllerAsTop.text),
        AsBot: double.parse(controllerAsBot.text),
      );
      return ResultsScreen(result: result!, inputs: input, onBack: () => setState(() => showResult = false));
    }
    return Scaffold(
      backgroundColor: const Color(0xFF0b1020),
      body: SafeArea(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _HeroHead(),
            const SizedBox(height: 16),
            Container(
              decoration: BoxDecoration(color: const Color(0xFF151b31), borderRadius: BorderRadius.circular(16), border: Border.all(color: const Color(0xFF222a45)), boxShadow: [BoxShadow(blurRadius: 30,offset: Offset(0,10),color: Colors.black26)]),
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Inputs', style: TextStyle(fontSize:16, fontWeight: FontWeight.bold, color: Color(0xFFdfe4ff))),
                  const Text('Enter section and material values. Units: MPa, mm, mm².', style: TextStyle(fontSize:13, color: Color(0xFFa5abc6))),
                  const SizedBox(height: 8),
                  InputField(label: 'fck [MPa]', value: controllerFck.text, onChanged: (v) => setState(() => controllerFck.text = v)),
                  InputField(label: 'fyk [MPa]', value: controllerFyk.text, onChanged: (v) => setState(() => controllerFyk.text = v)),
                  InputField(label: 'b [mm]', value: controllerB.text, onChanged: (v) => setState(() => controllerB.text = v)),
                  InputField(label: 'h [mm]', value: controllerH.text, onChanged: (v) => setState(() => controllerH.text = v)),
                  InputField(label: 'd1 (top) [mm]', value: controllerD1.text, onChanged: (v) => setState(() => controllerD1.text = v)),
                  InputField(label: 'd2 (bottom) [mm]', value: controllerD2.text, onChanged: (v) => setState(() => controllerD2.text = v)),
                  InputField(label: 'As_top [mm²]', value: controllerAsTop.text, onChanged: (v) => setState(() => controllerAsTop.text = v)),
                  InputField(label: 'As_bot [mm²]', value: controllerAsBot.text, onChanged: (v) => setState(() => controllerAsBot.text = v)),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: isValid ? const Color(0xFF5b8cff) : const Color(0xFF415a9f),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    onPressed: isValid && !loading ? onCalculate : null,
                    child: loading ? const SizedBox(width:24,height:24,child:CircularProgressIndicator(strokeWidth:3,color:Colors.white)) : const Text('Calculate', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    ));
  }
}

class _HeroHead extends StatelessWidget {
  const _HeroHead();
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 4),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF12172a),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF222a45)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children:[
            Container(width:10, height:10, decoration: BoxDecoration(color: Color(0xFF22d3ee), borderRadius: BorderRadius.circular(99), boxShadow:[BoxShadow(color:Color(0x8822d3ee), blurRadius:8)])),
            const SizedBox(width:10),
            const Text('Concrete Beam', style: TextStyle(color: Color(0xFFe6e8ee), fontWeight: FontWeight.w700, fontSize: 16, letterSpacing: .3)),
          ]),
          const SizedBox(height: 10),
          const Text('Reinforced Concrete Beam Capacity Calculator', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: Color(0xFFe6e8ee), letterSpacing: .2)),
          const SizedBox(height: 6),
          const Text('Calculate beam strength with code-based assumptions', style: TextStyle(fontSize:14, color:Color(0xFFa5abc6))),
          const SizedBox(height: 10),
          Wrap(children:[
            _Chip(text:"Auto design strengths"),
            SizedBox(width:8),
            _Chip(text:"Neutral axis bisection"),
          ])
        ],
      ));
  }
}
class _Chip extends StatelessWidget {
  final String text;
  const _Chip({required this.text});
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right:5,bottom:4),
      padding: const EdgeInsets.symmetric(horizontal:12, vertical:8),
      decoration: BoxDecoration(
        color: const Color(0x205B8CFF),
        border: Border.all(color: Color(0x595B8CFF)),
        borderRadius: BorderRadius.circular(999)),
      child: Row(children: [
        Container(width:6, height:6, decoration: BoxDecoration(color: Color(0xFF22d3ee), borderRadius: BorderRadius.circular(3), boxShadow: [BoxShadow(color:Color(0x5522d3ee),blurRadius:6)])),
        const SizedBox(width:8),
        Text(text, style: const TextStyle(fontSize:12,color: Color(0xFFdfe4ff))),
      ]),
    );
  }
}
