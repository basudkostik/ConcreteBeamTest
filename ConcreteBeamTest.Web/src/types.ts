export type BeamInput = {
  fck: number;
  fyk: number;
  b: number;
  h: number;
  d1: number;
  d2: number;
  As_top: number;
  As_bot: number;
};

export type BeamResult = {
  x: number;
  a: number;
  fcd: number;
  fyd: number;
  es: number;
  epsilon_cu: number;
  eps_s_top: number;
  eps_s_bot: number;
  fs_top: number;
  fs_bot: number;
  fc_kN: number;
  fs_top_kN: number;
  fs_bot_kN: number;
  m_rd_kNm: number;
};


