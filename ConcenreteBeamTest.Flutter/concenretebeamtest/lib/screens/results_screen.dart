import 'package:flutter/material.dart';
import '../beam_calculator.dart';

class ResultsScreen extends StatelessWidget {
  final BeamResult result;
  final BeamInput inputs;
  final VoidCallback onBack;

  const ResultsScreen({super.key, required this.result, required this.inputs, required this.onBack});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0b1020),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Row(children:[
                  Container(width:10,height:10,decoration:BoxDecoration(color:Color(0xFF22d3ee),borderRadius:BorderRadius.circular(99),boxShadow:[BoxShadow(color:Color(0x8822d3ee),blurRadius:8)])),
                  const SizedBox(width:10),
                  const Text('Results', style: TextStyle(color: Color(0xFFe6e8ee),fontSize:18,fontWeight:FontWeight.bold,letterSpacing:.3))
                ]),
                TextButton(onPressed: onBack, child: const Text('← Back', style: TextStyle(color:Color(0xFFdfe4ff),fontWeight:FontWeight.w600)))
              ]),
              const SizedBox(height: 8),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(color:Color(0xFF12172a),borderRadius:BorderRadius.circular(16),border: Border.all(color:Color(0xFF222a45))),
                child: Column(crossAxisAlignment: CrossAxisAlignment.start,children: [
                  const Text('Beam Capacity Calculation', style: TextStyle(fontSize:20,fontWeight:FontWeight.bold,color:Color(0xFFe6e8ee))),
                  const SizedBox(height:6),
                  Text('Design moment capacity: ${result.mRdKNm.toStringAsFixed(3)} kNm',style:TextStyle(fontSize:16,color:Color(0xFF5b8cff),fontWeight:FontWeight.w600))
                ]),
              ),
              const SizedBox(height:10),
              _Section(title:'Design Parameters',children:[
                _GridItem(label:'fck', value:'${inputs.fck} MPa'),
                _GridItem(label:'fyk', value:'${inputs.fyk} MPa'),
                _GridItem(label:'b', value:'${inputs.b} mm'),
                _GridItem(label:'h', value:'${inputs.h} mm'),
              ]),
              _Section(title:'Neutral Axis & Dimensions',children:[
                _GridItem(label:'x', value:'${result.x.toStringAsFixed(2)} mm'),
                _GridItem(label:'a', value:'${result.a.toStringAsFixed(2)} mm'),
              ]),
              _Section(title:'Reinforcement Strains',children:[
                _GridItem(label:'εs_top', value:result.epsSTop.toStringAsExponential(3)),
                _GridItem(label:'εs_bot', value:result.epsSBot.toStringAsExponential(3)),
              ]),
              _Section(title:'Reinforcement Stresses',children:[
                _GridItem(label:'fs_top', value:'${result.fsTop.toStringAsFixed(2)} MPa'),
                _GridItem(label:'fs_bot', value:'${result.fsBot.toStringAsFixed(2)} MPa'),
              ]),
              _Section(title:'Forces',children:[
                _GridItem(label:'Fc', value:'${result.fcKN.toStringAsFixed(2)} kN'),
                _GridItem(label:'Fs_top', value:'${result.fsTopKN.toStringAsFixed(2)} kN'),
                _GridItem(label:'Fs_bot', value:'${result.fsBotKN.toStringAsFixed(2)} kN'),
              ]),
              Container(
                margin: const EdgeInsets.symmetric(vertical:20),
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(color: Color(0x265B8CFF),border:Border.all(color:Color(0xFF5b8cff),width:2),borderRadius:BorderRadius.circular(16)),
                child: Column(children:[
                  const Text('Design Moment Capacity', style: TextStyle(fontSize:14, color:Color(0xFFb7bee1), fontWeight:FontWeight.w600)),
                  const SizedBox(height:8),
                  Text('${result.mRdKNm.toStringAsFixed(3)} kNm', style: TextStyle(fontSize:32, color:Color(0xFF5b8cff), fontWeight:FontWeight.bold, letterSpacing:.5))
                ]),
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF5b8cff),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                onPressed: onBack,
                child: const Text('Calculate Another', style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final String title;
  final List<Widget> children;
  const _Section({required this.title,required this.children});
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(color:Color(0xFF151b31),borderRadius:BorderRadius.circular(14),border:Border.all(color:Color(0xFF222a45))),
      margin: EdgeInsets.only(bottom:16),
      padding: EdgeInsets.all(16),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start,children:[
        Text(title, style: const TextStyle(fontSize:16, fontWeight: FontWeight.bold, color:Color(0xFFdfe4ff))),
        const SizedBox(height:10),
        Row(children:children),
      ]),
    );
  }
}

class _GridItem extends StatelessWidget {
  final String label;
  final String value;
  const _GridItem({required this.label,required this.value});
  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal:6),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color:Color(0xFF0f1428),borderRadius:BorderRadius.circular(10),border:Border.all(color:Color(0xFF222a45))),
        child: Column(crossAxisAlignment:CrossAxisAlignment.start,children:[
          Text(label, style: const TextStyle(fontSize:12, color:Color(0xFFb7bee1), fontWeight:FontWeight.w600)),
          Text(value, style: const TextStyle(fontSize:16, color:Colors.white, fontWeight:FontWeight.w600)),
        ]),
      ),
    );
  }
}
