'use strict';

// Arreglos pequeños sobre app.js. Va después de real-places.js.

(() => {
  // app.js llama a depositOf() pero no existe en el archivo: sin esto, las fichas con reserva fallan
  if (typeof depositOf === 'undefined') window.depositOf = s => (s && s.dep) || 0;

  // Resultados ordenados por cercanía (los de la demo usan su distancia de texto)
  const metros = b => {
    if (b.distM != null) return b.distM;
    const m = /([\d.,]+)\s*(km|m)\b/i.exec(b.distance || '');
    if (!m) return 1e9;
    const n = parseFloat(m[1].replace(',', '.'));
    return m[2].toLowerCase() === 'km' ? n * 1000 : n;
  };
  const pintarLista = window.renderBusinesses;
  window.renderBusinesses = function (contenedor, lista) {
    pintarLista(contenedor, [...lista].sort((a, b) => metros(a) - metros(b)));
  };

  // Antes las horas ocupadas cambiaban al azar en cada clic. Ahora dependen del negocio, el día y la hora.
  window.renderBookingFlow = function () {
    const el = $('#bookingFlow'); if (!el) return;

    if (!booking.biz) {
      const pasa = b => {
        if (!bookFilter) return true;
        if (bookFilter === 'comida') return b.type === 'comida';
        if (bookFilter === 'otros') return !['belleza', 'spa', 'comida'].includes(b.type);
        return b.type === bookFilter;
      };
      el.innerHTML =
        `<div class="rchips">${BOOK_FILTERS.map(([id, l]) => `<button type="button" class="rchip ${id === bookFilter ? 'on' : ''}" data-t="${id}">${l}</button>`).join('')}</div>` +
        BUSINESSES.filter(b => b.services?.length && pasa(b)).map(b => `
          <div class="list-item" role="button" tabindex="0" onclick="startBooking('${b.id}')">
            <div class="emoji-tile thumb">${brandCover(b, 'sm')}</div>
            <div class="info"><h4>${esc(b.name)}</h4><p>${esc(b.category)} · ⭐ ${b.rating}</p></div>
            <div class="chevron">›</div>
          </div>`).join('');
      el.querySelectorAll('.rchip').forEach(c => c.addEventListener('click', () => { bookFilter = c.dataset.t; renderBookingFlow(); }));
      return;
    }

    const b = bizById(booking.biz);

    if (booking.service === null) {
      el.innerHTML = `
        <div class="step-track"><div class="done"></div><div></div><div></div></div>
        <h3>${esc(b.name)}</h3>
        ${b.services.map((s, i) => `
          <button type="button" class="svc-card" onclick="booking.service=${i};renderBookingFlow()">
            <span class="info"><b>${esc(s.n)}</b><small>${s.dur}${s.p ? ' · ' + eur(s.p) : ''}${depositOf(s) ? ' · seña ' + eur(depositOf(s)) : ''}</small></span>
            <span class="svc-go">Elegir ›</span></button>`).join('')}`;
      return;
    }

    const servicio = b.services[booking.service];
    const dias = bookingDays();
    const dia = dias[booking.day];

    if (!booking.slot) {
      const horas = SLOTS[b.slots || 'day'];
      el.innerHTML = `
        <div class="step-track"><div class="done"></div><div class="done"></div><div></div></div>
        <h3>${esc(servicio.n)}</h3>
        <div class="day-row">${dias.map((d, i) => `
          <button type="button" class="day-pill ${booking.day === i ? 'selected' : ''}" onclick="booking.day=${i};renderBookingFlow()">
            <span class="dow">${DOW[d.getDay()]}</span><span class="num">${d.getDate()}</span>
          </button>`).join('')}</div>
        <div class="slot-grid">${horas.map(h => {
          const ocupada = hash(`${b.id}|${isoDate(dia)}|${h}`) % 100 < 15;
          return `<button type="button" class="slot" ${ocupada ? 'disabled' : ''} onclick="booking.slot='${h}';renderBookingFlow()">${h}</button>`;
        }).join('')}</div>`;
      return;
    }

    const sena = depositOf(servicio);
    el.innerHTML = `
      <div class="step-track"><div class="done"></div><div class="done"></div><div class="done"></div></div>
      <div class="summary-card">
        <div class="summary-row"><span>Negocio</span><strong>${esc(b.name)}</strong></div>
        <div class="summary-row"><span>Servicio</span><strong>${esc(servicio.n)}</strong></div>
        <div class="summary-row"><span>Fecha</span><strong>${DOW[dia.getDay()]} ${dia.getDate()}/${dia.getMonth() + 1}</strong></div>
        <div class="summary-row"><span>Hora</span><strong>${booking.slot}</strong></div>
        ${sena ? `<div class="summary-row total"><span>Seña</span><strong>${eur(sena)}</strong></div>` : '<div class="summary-row total"><span>Total</span><strong>Sin seña</strong></div>'}
      </div>
      <button type="button" class="primary-action" onclick="confirmarReserva()">${sena ? 'Pagar seña ' + eur(sena) : 'Confirmar reserva'}</button>`;
  };
})();