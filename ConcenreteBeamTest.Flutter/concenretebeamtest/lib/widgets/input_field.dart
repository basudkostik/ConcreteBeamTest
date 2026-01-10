import 'package:flutter/material.dart';

class InputField extends StatelessWidget {
  final String label;
  final String value;
  final ValueChanged<String> onChanged;
  final String? hint;
  final TextInputType keyboardType;
  const InputField({
    super.key,
    required this.label,
    required this.value,
    required this.onChanged,
    this.hint,
    this.keyboardType = TextInputType.number,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(color: Color(0xFFc8ceea), fontWeight: FontWeight.w500, fontSize: 13),
          ),
          const SizedBox(height: 4),
          TextField(
            keyboardType: keyboardType,
            decoration: InputDecoration(
              filled: true,
              fillColor: const Color(0xFF0f1428),
              hintText: hint,
              contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
              enabledBorder: OutlineInputBorder(
                borderSide: const BorderSide(color: Color(0xFF222a45)),
                borderRadius: BorderRadius.circular(10),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: const BorderSide(color: Color(0xFF5b8cff)),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            style: const TextStyle(color: Color(0xFFe6e8ee), fontSize: 15),
            onChanged: onChanged,
            controller: TextEditingController(text: value),
          ),
        ],
      ),
    );
  }
}
