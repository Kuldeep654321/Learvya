import 'package:flutter/material.dart';

void main() => runApp(const LearvyaApp());

class LearvyaApp extends StatelessWidget {
  const LearvyaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Learvya',
      theme: ThemeData(useMaterial3: true),
      home: const Scaffold(
        body: Center(child: Text('Learvya')),
      ),
    );
  }
}