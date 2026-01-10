class BeamInput {
  final double fck;
  final double fyk;
  final double b, h, d1, d2, AsTop, AsBot;

  BeamInput({
    required this.fck,
    required this.fyk,
    required this.b,
    required this.h,
    required this.d1,
    required this.d2,
    required this.AsTop,
    required this.AsBot,
  });
}

class BeamResult {
  final double x, a, epsSTop, epsSBot, fsTop, fsBot;
  final double fcKN, fsTopKN, fsBotKN, mRdKNm;

  BeamResult({
    required this.x,
    required this.a,
    required this.epsSTop,
    required this.epsSBot,
    required this.fsTop,
    required this.fsBot,
    required this.fcKN,
    required this.fsTopKN,
    required this.fsBotKN,
    required this.mRdKNm,
  });
}

BeamResult calculateBeamCapacity(BeamInput input) {
  final fcd = input.fck / 1.5;
  final fyd = input.fyk / 1.15;
  final Es = 200000.0;
  final epsilonCu = 0.003;

  double steelStress(double Es, double fyd, double epsS) {
    final fsEl = Es * epsS;
    var fs = fsEl;
    if (fsEl.abs() >= fyd) fs = fsEl.sign * fyd;
    return fs;
  }

  double forceBalance(double x) {
    if (x <= 0) return double.maxFinite;
    final term1 = 0.85 * fcd * input.b * (0.85 * x);
    final term2 = input.AsTop * steelStress(Es, fyd, epsilonCu * (x - input.d1) / x);
    final term3 = input.AsBot * steelStress(Es, fyd, epsilonCu * (input.d2 - x) / x);
    return term1 + term2 - term3;
  }

  double neutralAxis() {
    const xMin = 1e-6;
    final xMax = input.h - 1e-6;
    const tol = 1e-6;
    int n = 200;
    final xs = List.generate(n, (i) => xMin + (xMax - xMin) * i / (n - 1));
    final vals = xs.map(forceBalance).toList();
    int? idx;
    for (int i = 0; i < n - 1; i++) {
      if (vals[i] * vals[i + 1] < 0) { idx = i; break; }
    }
    double aB, bB;
    if (idx != null) { aB = xs[idx]; bB = xs[idx + 1]; }
    else { aB = xMin; bB = xMax; }
    double fa = forceBalance(aB), fb = forceBalance(bB);
    if (fa * fb > 0) throw Exception('No sign change in force balance interval.');
    for (int iter = 0; iter < 100; iter++) {
      final c = 0.5 * (aB + bB);
      final fc = forceBalance(c);
      if (fc.abs() < tol) return c;
      if (fa * fc < 0) { bB = c; fb = fc; } else { aB = c; fa = fc; }
    }
    return 0.5 * (aB + bB);
  }

  final x = neutralAxis();
  final a = 0.85 * x;
  final epsSTop = epsilonCu * (x - input.d1) / x;
  final epsSBot = epsilonCu * (input.d2 - x) / x;
  final fsTop = steelStress(Es, fyd, epsSTop);
  final fsBot = steelStress(Es, fyd, epsSBot);
  final fcN = 0.85 * fcd * input.b * a;
  final fsTopN = fsTop * input.AsTop;
  final fsBotN = fsBot * input.AsBot;

  final mFcNmm = -fcN * (a / 2);
  final mFsTopNmm = -fsTopN * input.d1;
  final mFsBotNmm = fsBotN * input.d2;
  final mTotalNmm = mFcNmm + mFsTopNmm + mFsBotNmm;
  final mTotalKNm = mTotalNmm / 1e6;

  return BeamResult(
    x: x,
    a: a,
    epsSTop: epsSTop,
    epsSBot: epsSBot,
    fsTop: fsTop,
    fsBot: fsBot,
    fcKN: fcN / 1000,
    fsTopKN: fsTopN / 1000,
    fsBotKN: fsBotN / 1000,
    mRdKNm: mTotalKNm,
  );
}
