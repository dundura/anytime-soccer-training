(function () {
  function el(id) { return document.getElementById(id); }

  function fmt(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function calc() {
    var reg       = parseFloat(el('sbc-reg').value)       || 0;
    var tours     = parseFloat(el('sbc-tours').value)     || 0;
    var tourCost  = parseFloat(el('sbc-tour-cost').value) || 0;
    var gear      = parseFloat(el('sbc-gear').value)      || 0;
    var privSess  = parseFloat(el('sbc-priv').value)      || 0;
    var privCost  = parseFloat(el('sbc-priv-cost').value) || 0;
    var sessWeek  = parseFloat(el('sbc-sess').value)      || 4;
    var months    = parseFloat(el('sbc-months').value)    || 10;

    var tourTotal    = tours * tourCost;
    var privTotal    = privSess * privCost * 12;
    var annual       = reg + tourTotal + gear + privTotal;
    var monthly      = annual / 12;
    var totalSessions = sessWeek * 4.33 * months;
    var perSession   = totalSessions > 0 ? annual / totalSessions : 0;

    el('sbc-out-reg').textContent    = fmt(reg);
    el('sbc-out-tours').textContent  = fmt(tourTotal);
    el('sbc-out-gear').textContent   = fmt(gear);
    el('sbc-out-priv').textContent   = fmt(privTotal);
    el('sbc-out-annual').textContent = fmt(annual);
    el('sbc-out-month').textContent  = fmt(monthly);
    el('sbc-out-session').textContent = fmt(perSession);

    // bar widths (capped at 100%)
    var max = Math.max(annual, 1);
    el('sbc-bar-reg').style.width    = Math.min(100, (reg / max) * 100) + '%';
    el('sbc-bar-tours').style.width  = Math.min(100, (tourTotal / max) * 100) + '%';
    el('sbc-bar-gear').style.width   = Math.min(100, (gear / max) * 100) + '%';
    el('sbc-bar-priv').style.width   = Math.min(100, (privTotal / max) * 100) + '%';

    // label syncing
    el('sbc-lbl-reg').textContent       = fmt(reg);
    el('sbc-lbl-tours').textContent     = tours + ' trips';
    el('sbc-lbl-tour-cost').textContent = fmt(tourCost) + '/trip';
    el('sbc-lbl-gear').textContent      = fmt(gear);
    el('sbc-lbl-priv').textContent      = privSess + '/mo';
    el('sbc-lbl-priv-cost').textContent = fmt(privCost) + '/session';
    el('sbc-lbl-sess').textContent      = sessWeek + 'x/week';
    el('sbc-lbl-months').textContent    = months + ' months';
  }

  // Wire up all inputs
  var ids = ['sbc-reg','sbc-tours','sbc-tour-cost','sbc-gear',
             'sbc-priv','sbc-priv-cost','sbc-sess','sbc-months'];
  ids.forEach(function(id) {
    var inp = el(id);
    if (inp) inp.addEventListener('input', calc);
  });

  // Run once on load
  if (el('sbc-reg')) calc();
})();
