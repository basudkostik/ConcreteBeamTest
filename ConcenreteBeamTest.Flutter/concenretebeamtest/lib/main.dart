import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const ConcreteBeamApp());
}

class ConcreteBeamApp extends StatelessWidget {
  const ConcreteBeamApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Concrete Beam Flutter',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFF0b1020),
        brightness: Brightness.dark,
        useMaterial3: true,
        colorScheme: const ColorScheme.dark(
          surface: Color(0xFF0b1020),
          primary: Color(0xFF5b8cff),
          secondary: Color(0xFF22d3ee),
        ),
        fontFamily: 'Roboto',
      ),
      home: const HomeScreen(),
    );
  }
}
