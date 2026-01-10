using ConcreteBeamTest.API.Models;

namespace ConcreteBeamTest.API.Services
{
    public class ConcreteCalculator
    {
        public OutputModel CalculateBeamCapacity(InputModel input)
        {
            try
            {
                // Input validation
                ValidateInput(input);

                // Otomatik atanan değerler
                double fcd = input.fck / 1.5; // Beton tasarım basınç dayanımı [MPa]
                double fyd = input.fyk / 1.15; // Çelik tasarım akma dayanımı [MPa]
                double Es = 200000; // MPa (sabit)
                double epsilon_cu = 0.003; // Betonun maksimum basınç deformasyonu (sabit)

                Console.WriteLine($"Otomatik atanmıştır: fcd = {fcd:F2} MPa, fyd = {fyd:F2} MPa, Es = 200000 MPa, eps_cu = 0.003");

                // Kuvvet dengesi fonksiyonu
                Func<double, double> forceBalance = (x) =>
                {
                    if (x <= 0) return double.MaxValue; // x pozitif olmalı
                    
                    double term1 = 0.85 * fcd * input.b * (0.85 * x);
                    double term2 = input.As_top * SteelStress(Es, fyd, epsilon_cu * (x - input.d1) / x);
                    double term3 = input.As_bot * SteelStress(Es, fyd, epsilon_cu * (input.d2 - x) / x);
                    
                    return term1 + term2 - term3;
                };

                // Nötr eksen derinliğini bul (iteratif yöntem)
                double x = FindNeutralAxis(forceBalance, input.h);

                // Hesaplamalar
                double a = 0.85 * x;
                double eps_s_top = epsilon_cu * (x - input.d1) / x;
                double eps_s_bot = epsilon_cu * (input.d2 - x) / x;

                double fs_top = SteelStress(Es, fyd, eps_s_top);
                double fs_bot = SteelStress(Es, fyd, eps_s_bot);

                double Fc_N = 0.85 * fcd * input.b * a;
                double Fs_top_N = fs_top * input.As_top;
                double Fs_bot_N = fs_bot * input.As_bot;

                double M_Fc_Nmm = -Fc_N * (a / 2);
                double M_Fs_top_Nmm = -Fs_top_N * input.d1;
                double M_Fs_bot_Nmm = Fs_bot_N * input.d2;
                double M_total_Nmm = M_Fc_Nmm + M_Fs_top_Nmm + M_Fs_bot_Nmm;
                double M_total_kNm = M_total_Nmm / 1e6;

                return new OutputModel
                {
                    x = x,
                    a = a,
                    fcd = fcd,
                    fyd = fyd,
                    Es = Es,
                    epsilon_cu = epsilon_cu,
                    eps_s_top = eps_s_top,
                    eps_s_bot = eps_s_bot,
                    fs_top = fs_top,
                    fs_bot = fs_bot,
                    Fc_kN = Fc_N / 1000,
                    Fs_top_kN = Fs_top_N / 1000,
                    Fs_bot_kN = Fs_bot_N / 1000,
                    M_rd_kNm = M_total_kNm
                };
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Betonarme kesit hesabı sırasında hata oluştu: {ex.Message}", ex);
            }
        }

        private double FindNeutralAxis(Func<double, double> forceBalance, double h)
        {
            double x_min = 1e-6;
            double x_max = h - 1e-6;
            double tolerance = 1e-6;
            int maxIterations = 100;

            // Önce işaret değişimini bul
            int n = 200;
            double[] xs = new double[n];
            double[] vals = new double[n];
            
            for (int i = 0; i < n; i++)
            {
                xs[i] = x_min + (x_max - x_min) * i / (n - 1);
                vals[i] = forceBalance(xs[i]);
            }

            // İşaret değişimi noktasını bul
            int signChangeIndex = -1;
            for (int i = 0; i < n - 1; i++)
            {
                if (vals[i] * vals[i + 1] < 0)
                {
                    signChangeIndex = i;
                    break;
                }
            }

            double a_b, b_b;
            if (signChangeIndex >= 0)
            {
                a_b = xs[signChangeIndex];
                b_b = xs[signChangeIndex + 1];
            }
            else
            {
                a_b = x_min;
                b_b = x_max;
            }

            // Bisection method
            double fa = forceBalance(a_b);
            double fb = forceBalance(b_b);

            if (fa * fb > 0)
            {
                throw new InvalidOperationException("Nötr eksen için kuvvet dengesi aralığında işaret değişimi yok. Girdi değerlerini kontrol edin.");
            }

            for (int iter = 0; iter < maxIterations; iter++)
            {
                double c = 0.5 * (a_b + b_b);
                double fc = forceBalance(c);

                if (Math.Abs(fc) < tolerance)
                {
                    return c;
                }

                if (fa * fc < 0)
                {
                    b_b = c;
                    fb = fc;
                }
                else
                {
                    a_b = c;
                    fa = fc;
                }
            }

            return 0.5 * (a_b + b_b);
        }

        private double SteelStress(double Es, double fyd, double eps_s)
        {
            double fs_el = Es * eps_s;
            double fs = fs_el;
            
            if (Math.Abs(fs_el) >= fyd)
            {
                fs = Math.Sign(fs_el) * fyd;
            }
            
            return fs;
        }

        private void ValidateInput(InputModel input)
        {
            if (input.d1 + input.d2 >= input.h)
            {
                throw new ArgumentException("Üst ve alt donatı merkezleri arasındaki mesafe kesit yüksekliğinden küçük olmalıdır.");
            }

            if (input.d1 >= input.h / 2 || input.d2 >= input.h / 2)
            {
                throw new ArgumentException("Donatı merkezleri kesit yarısından küçük olmalıdır.");
            }

            if (input.As_top == 0 && input.As_bot == 0)
            {
                throw new ArgumentException("En az bir donatı alanı sıfırdan büyük olmalıdır.");
            }
        }
    }
}