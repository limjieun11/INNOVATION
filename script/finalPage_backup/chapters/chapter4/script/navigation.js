(function () {
  const BANK = window.CH4_BANK;

  function getProfile() {
    try {
      return JSON.parse(localStorage.getItem('surveyProfile'));
    } catch (_) {
      return null;
    }
  }

  function pickQuestions(profile) {
    if (!profile || !profile.tags) return ['G1', 'G2', 'G3', 'R1'];

    const ranked = Object.entries(profile.tags)
      .sort((a, b) => b[1] - a[1])
      .map(([k]) => k);

    const primary = ranked[0];
    const secondary = ranked[1] || null;

    const findId = (tag) => BANK.find((q) => q.tag === tag)?.id;
    const a = findId(primary);
    const b = secondary ? findId(secondary) : null;

    const generals = BANK.filter((q) => q.tag === 'general').map((q) => q.id);
    const picked = [];
    if (a) picked.push(a);
    if (b && b !== a) picked.push(b);

    while (picked.length < 3 && generals.length) {
      const i = Math.floor(Math.random() * generals.length);
      const g = generals.splice(i, 1)[0];
      if (!picked.includes(g)) picked.push(g);
    }
    if (!picked.includes('R1')) picked.push('R1');
    return picked.slice(0, 4);
  }

  function ensureOrder(opts = {}) {
    const force = !!opts.force;
    const profile = getProfile();
    const pTs = profile?.ts || 0;

    let saved;
    try {
      saved = JSON.parse(localStorage.getItem('ch4OrderV2'));
    } catch (_) {}

    const needRebuild =
      force ||
      !saved ||
      !Array.isArray(saved.ids) ||
      (pTs && (!saved.profileTs || pTs > saved.profileTs));

    if (needRebuild) {
      const ids = pickQuestions(profile);
      saved = { ids, profileTs: pTs };
      localStorage.setItem('ch4OrderV2', JSON.stringify(saved));
    }

    if (localStorage.getItem('ch4Order')) localStorage.removeItem('ch4Order');
    return saved.ids;
  }

  window.CH4Nav = {
    ensureOrder,
    start: () => {
      ensureOrder({ force: true });
      location.href = './question1.html';
    },
    nextHref: (idx) =>
      idx + 1 <= 4 ? `./question${idx + 1}.html` : './result.html',
  };
})();
