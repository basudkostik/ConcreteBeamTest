import React, { useMemo, useState } from 'react';
import { InputField } from './components/InputField';
import { calculateBeamCapacity } from './api';
import type { BeamInput, BeamResult } from './types';

function toNumber(text: string): number | null {
  if (text.trim() === '') return null;
  const n = Number(text.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

function format(n: number | null | undefined, opts?: Intl.NumberFormatOptions) {
  if (n === null || n === undefined || Number.isNaN(n)) return '-';
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 3, ...opts }).format(n);
}

export const App: React.FC = () => {
  const [fck, setFck] = useState('30');
  const [fyk, setFyk] = useState('420');
  const [b, setB] = useState('300');
  const [h, setH] = useState('500');
  const [d1, setD1] = useState('50');
  const [d2, setD2] = useState('200');
  const [asTop, setAsTop] = useState('600');
  const [asBot, setAsBot] = useState('1200');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BeamResult | null>(null);

  const isValid = useMemo(() => {
    const vals = [fck, fyk, b, h, d1, d2, asTop, asBot].map(toNumber);
    return vals.every(v => v !== null && v >= 0);
  }, [fck, fyk, b, h, d1, d2, asTop, asBot]);

  async function onCalculate() {
    if (!isValid) return;
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
    try {
      setLoading(true);
      setError(null);
      const data = await calculateBeamCapacity(payload);
      setResult(data);
    } catch (e: any) {
      setError(e?.message || 'Hata');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  function exportCsv(r: BeamResult) {
    const now = new Date();
    const section = (name: string, entries: Array<[string, string | number, string]>) =>
      entries.map(([k, v, unit]) => ({ Section: name, Key: k, Value: v, Unit: unit }));

    const inputs = section('Inputs', [
      ['fck', Number(fck), 'MPa'],
      ['fyk', Number(fyk), 'MPa'],
      ['b', Number(b), 'mm'],
      ['h', Number(h), 'mm'],
      ['d1 (top)', Number(d1), 'mm'],
      ['d2 (bottom)', Number(d2), 'mm'],
      ['As_top', Number(asTop), 'mm²'],
      ['As_bot', Number(asBot), 'mm²']
    ]);

    const results = section('Results', [
      ['fcd', r.fcd, 'MPa'],
      ['fyd', r.fyd, 'MPa'],
      ['Es', r.es, 'MPa'],
      ['epsilon_cu', r.epsilon_cu, ''],
      ['x', r.x, 'mm'],
      ['a', r.a, 'mm'],
      ['eps_s_top', r.eps_s_top, ''],
      ['eps_s_bot', r.eps_s_bot, ''],
      ['fs_top', r.fs_top, 'MPa'],
      ['fs_bot', r.fs_bot, 'MPa'],
      ['Fc', r.fc_kN, 'kN'],
      ['Fs_top', r.fs_top_kN, 'kN'],
      ['Fs_bot', r.fs_bot_kN, 'kN'],
      ['M_rd', r.m_rd_kNm, 'kNm']
    ]);

    const rows = [...inputs, ...results];
    const header = Object.keys(rows[0]).join(',');
    const escape = (val: string | number) => {
      const s = String(val);
      return s.includes(',') || s.includes('"') || s.includes('\n') ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const body = rows.map(r => [r.Section, r.Key, r.Value, r.Unit].map(escape).join(',')).join('\n');
    const meta = `Generated,${now.toISOString()}`;
    const csv = [header, body, meta].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beam_result_${now.toISOString().replace(/[:.]/g,'-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function PrintReport() {
    if (!result) return null;
    const now = new Date();
    return (
      <div className="print-report">
        <div className="report-header">
          <div className="brand"><span className="dot"></span><span>Concrete Beam</span></div>
          <div className="meta">{now.toLocaleString()}</div>
        </div>
        <h1>Beam Capacity Report</h1>
        <div className="report-grid">
          <div className="report-card">
            <h2>Inputs</h2>
            <div className="report-table">
              <div>fck</div><div>{fck} MPa</div>
              <div>fyk</div><div>{fyk} MPa</div>
              <div>b</div><div>{b} mm</div>
              <div>h</div><div>{h} mm</div>
              <div>d1 (top)</div><div>{d1} mm</div>
              <div>d2 (bottom)</div><div>{d2} mm</div>
              <div>As_top</div><div>{asTop} mm²</div>
              <div>As_bot</div><div>{asBot} mm²</div>
            </div>
          </div>
          <div className="report-card">
            <h2>Results</h2>
            <div className="report-table">
              <div>fcd</div><div>{format(result.fcd, { maximumFractionDigits: 2 })} MPa</div>
              <div>fyd</div><div>{format(result.fyd, { maximumFractionDigits: 2 })} MPa</div>
              <div>Es</div><div>{format(result.es, { maximumFractionDigits: 0 })} MPa</div>
              <div>epsilon_cu</div><div>{result.epsilon_cu.toFixed(4)}</div>
              <div>x</div><div>{format(result.x, { maximumFractionDigits: 2 })} mm</div>
              <div>a</div><div>{format(result.a, { maximumFractionDigits: 2 })} mm</div>
              <div>eps_s_top</div><div>{result.eps_s_top.toExponential(3)}</div>
              <div>eps_s_bot</div><div>{result.eps_s_bot.toExponential(3)}</div>
              <div>fs_top</div><div>{format(result.fs_top, { maximumFractionDigits: 2 })} MPa</div>
              <div>fs_bot</div><div>{format(result.fs_bot, { maximumFractionDigits: 2 })} MPa</div>
              <div>Fc</div><div>{format(result.fc_kN, { maximumFractionDigits: 2 })} kN</div>
              <div>Fs_top</div><div>{format(result.fs_top_kN, { maximumFractionDigits: 2 })} kN</div>
              <div>Fs_bot</div><div>{format(result.fs_bot_kN, { maximumFractionDigits: 2 })} kN</div>
              <div>M_rd</div><div>{format(result.m_rd_kNm, { maximumFractionDigits: 3 })} kNm</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <div className="header-inner">
          <div className="brand"><span className="dot"></span><span>Concrete Beam</span></div>
          <div className="sub"></div>
        </div>
      </div>

      <div className="container">
        <div className="hero fade">
          <h1>Reinforced Concrete Beam Capacity Calculator</h1>
          <p></p>
          <div className="chips">
            <div className="chip"><span className="dot"></span>Auto design strengths (fcd, fyd)</div>
            <div className="chip"><span className="dot"></span>Neutral axis via bisection</div>
            
          </div>
        </div>
        <div className="layout">
          <div className="panel fade">
            <h2>Inputs</h2>
            <div className="hint">Enter section and material values. Units: MPa, mm, mm².</div>
            <div className="group">
              <InputField label="fck [MPa]" value={fck} onChange={setFck} />
              <InputField label="fyk [MPa]" value={fyk} onChange={setFyk} />
              <InputField label="b [mm]" value={b} onChange={setB} />
              <InputField label="h [mm]" value={h} onChange={setH} />
              <InputField label="d1 (top) [mm]" value={d1} onChange={setD1} />
              <InputField label="d2 (bottom) [mm]" value={d2} onChange={setD2} />
              <InputField label="As_top [mm²]" value={asTop} onChange={setAsTop} />
              <InputField label="As_bot [mm²]" value={asBot} onChange={setAsBot} />
            </div>
            <div className="actions">
              <span className="badge"><span className="dot"></span>Check inputs</span>
              <button className="button primary" onClick={onCalculate} disabled={!isValid || loading}>
                {loading ? 'Calculating…' : 'Calculate'}
              </button>
              {result && (
                <>
                  <button className="button secondary" onClick={() => exportCsv(result)}>Export CSV</button>
                  <button className="button secondary" onClick={() => window.print()}>Export PDF</button>
                </>
              )}
            </div>
            {error && <div className="error">{error}</div>}
          </div>

          <div className="panel sticky fade">
            <h2>Results</h2>
            <div className="results-grid">
              <div className="kv"><div className="k">fcd</div><div className="v">{format(result?.fcd, { maximumFractionDigits: 2 })} MPa</div></div>
              <div className="kv"><div className="k">fyd</div><div className="v">{format(result?.fyd, { maximumFractionDigits: 2 })} MPa</div></div>
              <div className="kv"><div className="k">Es</div><div className="v">{format(result?.es, { maximumFractionDigits: 0 })} MPa</div></div>
              <div className="kv"><div className="k">epsilon_cu</div><div className="v">{result ? result.epsilon_cu.toFixed(4) : '-'}</div></div>
              <div className="divider"></div><div className="divider"></div>
              <div className="kv"><div className="k">x</div><div className="v">{format(result?.x, { maximumFractionDigits: 2 })} mm</div></div>
              <div className="kv"><div className="k">a</div><div className="v">{format(result?.a, { maximumFractionDigits: 2 })} mm</div></div>
              <div className="kv"><div className="k">eps_s_top</div><div className="v">{result ? result.eps_s_top.toExponential(3) : '-'}</div></div>
              <div className="kv"><div className="k">eps_s_bot</div><div className="v">{result ? result.eps_s_bot.toExponential(3) : '-'}</div></div>
              <div className="kv"><div className="k">fs_top</div><div className="v">{format(result?.fs_top, { maximumFractionDigits: 2 })} MPa</div></div>
              <div className="kv"><div className="k">fs_bot</div><div className="v">{format(result?.fs_bot, { maximumFractionDigits: 2 })} MPa</div></div>
              <div className="divider"></div><div className="divider"></div>
              <div className="kv"><div className="k">Fc</div><div className="v">{format(result?.fc_kN, { maximumFractionDigits: 2 })} kN</div></div>
              <div className="kv"><div className="k">Fs_top</div><div className="v">{format(result?.fs_top_kN, { maximumFractionDigits: 2 })} kN</div></div>
              <div className="kv"><div className="k">Fs_bot</div><div className="v">{format(result?.fs_bot_kN, { maximumFractionDigits: 2 })} kN</div></div>
              <div className="kv"><div className="k">M_rd</div><div className="v">{format(result?.m_rd_kNm, { maximumFractionDigits: 3 })} kNm</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-inner">
          <div>© 2025 Concrete Beam. All rights reserved.</div>
          <div className="links">
            <a
              href="/docs/ENG%20401%20Interdisciplinary%20Engineering%20Design%20Project%20%E2%80%93%20Research%20%26%20Report%20Guide.pdf"
              download="ENG401_Guide.pdf"
            >Docs</a>
            <a href="#" onClick={(e)=>e.preventDefault()}></a>
          </div>
        </div>
      </div>
      <PrintReport />
    </>
  );
};

export default App;


