// ============================================================
// PYL SYSTEM — App Logic
// ============================================================

'use strict';

// ── Estado global ─────────────────────────────────────────
const App = {
  semanaIdx:    PYL.semanaActual,
  modulo:       'dashboard',
  filtroGrupo:  'all',
  filtroCiudad: 'all',
  filtroDisp:   'all',
  busqueda:     '',
  tareas:       JSON.parse(JSON.stringify(PYL.tareasSemana)), // copia mutable
};

// ── DOM refs ──────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── Iconos SVG (inline) ───────────────────────────────────
const ICONS = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  planning:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  personal:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="10" r="3"/><path d="M21 21v-2a3 3 0 00-3-3"/></svg>`,
  turnos:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>`,
  clientes:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  ts:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  motivos:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  acuerdos:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,11 12,14 22,4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`,
  check:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20,6 9,17 4,12"/></svg>`,
  chevLeft:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15,18 9,12 15,6"/></svg>`,
  chevRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,18 15,12 9,6"/></svg>`,
  close:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  plus:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  download:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  users:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>`,
  activity:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>`,
  alert:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  google:    `<svg viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`,
};

// ── Render helpers ────────────────────────────────────────
function renderIcon(name, cls = '') {
  return `<span class="nav-icon ${cls}">${ICONS[name] || ''}</span>`;
}

function initBadge(iniciales, ciudad, size = '') {
  const c = PYL.getCityClass(ciudad);
  const s = size ? `sz-${size}` : '';
  return `<div class="initials-badge ${c} ${s}" data-tooltip="${iniciales}">${iniciales}</div>`;
}

function renderBadge(disp) {
  const b = PYL.getDisponibilidadBadge(disp);
  const dot = disp !== 'operativo'
    ? `<span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;"></span>`
    : '';
  return `<span class="badge ${b.cls}">${dot}${b.label}</span>`;
}

function renderCheckbox(checked) {
  return `<div class="task-check ${checked ? 'checked' : ''}" role="checkbox" aria-checked="${checked}">
    ${ICONS.check}
  </div>`;
}

// ── Sidebar ───────────────────────────────────────────────
function renderSidebar() {
  return `
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="sidebar-logo-mark">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <path d="M22 12H18L15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div class="logo-text">
          <div class="logo-product">PYL System</div>
          <div class="logo-company">Telconet</div>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-label">Principal</div>
        <div class="nav-item ${App.modulo === 'dashboard' ? 'active' : ''}"
             onclick="navigate('dashboard')">
          ${renderIcon('dashboard')} Dashboard
        </div>
        <div class="nav-item ${App.modulo === 'planning' ? 'active' : ''}"
             onclick="navigate('planning')">
          ${renderIcon('planning')} Distribución Semanal
          <span class="nav-badge">↻</span>
        </div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">RRHH</div>
        <div class="nav-item ${App.modulo === 'personal' ? 'active' : ''}"
             onclick="navigate('personal')">
          ${renderIcon('personal')} Personal
        </div>
        <div class="nav-item ${App.modulo === 'turnos' ? 'active' : ''}"
             onclick="navigate('turnos')">
          ${renderIcon('turnos')} Turnos
          <span class="nav-badge" style="background:#8B5CF6">2</span>
        </div>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">Operativo</div>
        <div class="nav-item ${App.modulo === 'clientes' ? 'active' : ''}"
             onclick="navigate('clientes')">
          ${renderIcon('clientes')} Clientes
        </div>
        <div class="nav-item ${App.modulo === 'ts' ? 'active' : ''}"
             onclick="navigate('ts')">
          ${renderIcon('ts')} Técnicas Sucursales
        </div>
        <div class="nav-item ${App.modulo === 'motivos' ? 'active' : ''}"
             onclick="navigate('motivos')">
          ${renderIcon('motivos')} Motivos y Plantillas
        </div>
        <div class="nav-item ${App.modulo === 'acuerdos' ? 'active' : ''}"
             onclick="navigate('acuerdos')">
          ${renderIcon('acuerdos')} Acuerdos y Directrices
        </div>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">HC</div>
        <div class="user-info">
          <div class="user-name">H. Chiluisa</div>
          <div class="user-role">Coordinador</div>
        </div>
      </div>
    </div>
  </aside>`;
}

// ── Header ────────────────────────────────────────────────
function renderHeader(title, sub = '') {
  const semana = PYL.semanas[App.semanaIdx];
  return `
  <header class="app-header">
    <div class="header-title">${title}
      ${sub ? `<span class="header-subtitle">${sub}</span>` : ''}
    </div>
    <div class="header-actions">
      ${App.modulo === 'planning' ? `
        <div class="week-nav">
          <button class="week-btn" onclick="changeSemana(-1)" title="Semana anterior">
            ${ICONS.chevLeft}
          </button>
          <div>
            <div class="week-nav-label">${semana.label}</div>
            <div class="week-nav-sub">
              ${PYL.formatDate(semana.inicio)} — ${PYL.formatDate(semana.fin)}
            </div>
          </div>
          <button class="week-btn" onclick="changeSemana(1)" title="Semana siguiente">
            ${ICONS.chevRight}
          </button>
        </div>
      ` : ''}
      <button class="btn btn-secondary btn-sm">
        ${ICONS.download} Exportar
      </button>
    </div>
  </header>`;
}

// ── Dashboard ─────────────────────────────────────────────
function renderDashboard() {
  const k = PYL.kpis;
  const kpis = [
    { icon:'users',    cls:'green',  value: k.totalColaboradores,    label:'Colaboradores',           sub:'Total equipo PYL' },
    { icon:'activity', cls:'accent', value: k.personalOperativo,     label:'Personal Operativo',      sub:'Disponibles esta semana' },
    { icon:'alert',    cls:'yellow', value: k.enMaternidad,          label:'Maternidad/Lactancia',    sub:'Con permiso activo' },
    { icon:'planning', cls:'purple', value: k.turnosSemana,          label:'Turnos Próximos',         sub:'Próximos 30 días' },
    { icon:'clientes', cls:'accent', value: k.clientesActivos,       label:'Clientes Activos',        sub:'En gestión 1 a 1' },
    { icon:'alert',    cls:'red',    value: k.actividadesDetenidas,  label:'Actividades Detenidas',   sub:'Requieren atención' },
    { icon:'alert',    cls:'yellow', value: k.actividadesReplanificadas,'label':'Replanificadas',     sub:'Esta semana' },
    { icon:'ts',       cls:'green',  value: k.tsActivas,             label:'TS Activas',              sub:'Técnicas Sucursales' },
  ];

  const kpisHtml = kpis.map(k => `
    <div class="kpi-card">
      <div class="kpi-icon ${k.cls}">${ICONS[k.icon]}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-sub">${k.sub}</div>
    </div>
  `).join('');

  // Resumen de disponibilidad del equipo
  const dispSum = PYL.colaboradores.reduce((acc, c) => {
    acc[c.disponibilidad] = (acc[c.disponibilidad] || 0) + 1;
    return acc;
  }, {});

  const proxTurnos = PYL.turnos.slice(0, 5).map(t => `
    <div class="turno-row">
      <div class="turno-fecha">${t.fecha}</div>
      <div class="turno-planificador">
        ${initBadge(t.iniciales, t.ciudad)}
        <span class="turno-nombre">${t.planificador}</span>
      </div>
      <div class="turno-tipo">
        <span class="badge badge-neutral">${t.tipo}</span>
      </div>
    </div>
  `).join('');

  // Mini tabla resumen de distribución actual
  const miniDist = PYL.colaboradores.slice(0, 8).map(c => `
    <div class="turno-row">
      ${initBadge(c.iniciales, c.ciudad)}
      <div style="flex:1; min-width:0;">
        <div style="font-size:var(--text-xs);font-weight:600;color:var(--text-primary);">${c.nombre}</div>
        <div style="font-size:var(--text-xs);color:var(--text-muted);">${c.clientes.slice(0,2).join(', ') || '—'}</div>
      </div>
      <div>${renderBadge(c.disponibilidad)}</div>
      <div style="font-size:var(--text-xs);color:var(--accent);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
        ${c.ts || '—'}
      </div>
    </div>
  `).join('');

  return `
  <div class="section-header">
    <div>
      <div class="section-title">Panel General</div>
      <div class="section-desc">Semana ${PYL.semanas[App.semanaIdx].label}</div>
    </div>
    <button class="btn btn-primary btn-sm" onclick="navigate('planning')">
      ${ICONS.planning} Ver Distribución Semanal
    </button>
  </div>

  <div class="kpi-grid">${kpisHtml}</div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-4);">
    <div class="card">
      <div class="card-header">
        <div class="card-title">Próximos Turnos de Fin de Semana</div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('turnos')">Ver todos →</button>
      </div>
      <div class="card-body" style="padding:var(--sp-3) var(--sp-4);">
        <div class="turno-list">${proxTurnos}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Estado del Equipo — Esta Semana</div>
        <button class="btn btn-ghost btn-sm" onclick="navigate('personal')">Ver equipo →</button>
      </div>
      <div class="card-body" style="padding:var(--sp-3) var(--sp-4);">
        <div style="display:flex;gap:var(--sp-3);margin-bottom:var(--sp-4);flex-wrap:wrap;">
          ${Object.entries(dispSum).map(([d,n]) => `
            ${renderBadge(d)} <span style="font-family:var(--font-mono);font-size:var(--text-xs);font-weight:700;">${n}</span>
          `).join('')}
        </div>
        <div class="turno-list">${miniDist}</div>
      </div>
    </div>
  </div>`;
}

// ── Planning / Distribución Semanal ──────────────────────
function renderPlanning() {
  const semana = PYL.semanas[App.semanaIdx];
  const tareas = PYL.columnaTareas;

  // Filtrar colaboradores
  let colabs = PYL.colaboradores.filter(c => {
    if (App.filtroGrupo  !== 'all' && c.grupo !== App.filtroGrupo) return false;
    if (App.filtroCiudad !== 'all' && c.ciudad !== App.filtroCiudad) return false;
    if (App.filtroDisp   !== 'all' && c.disponibilidad !== App.filtroDisp) return false;
    if (App.busqueda) {
      const q = App.busqueda.toLowerCase();
      return c.nombre.toLowerCase().includes(q) ||
             c.iniciales.toLowerCase().includes(q) ||
             c.clientes.join(' ').toLowerCase().includes(q);
    }
    return true;
  });

  // Construir headers de tareas
  const taskHeaders = tareas.map(t => `
    <th class="task-cell" data-tooltip="${t.label.replace('\n', ' ')}">${t.abbr}</th>
  `).join('');

  // Construir filas agrupadas
  const grupos = PYL.grupos;
  let rowsHtml = '';

  grupos.forEach(grupo => {
    const miembros = colabs.filter(c => c.grupo === grupo.id);
    if (miembros.length === 0) return;

    // Header de grupo
    rowsHtml += `
      <tr class="group-header">
        <td colspan="${7 + tareas.length}">
          <span class="group-dot" style="background:${grupo.dot}"></span>
          ${grupo.label}
          <span style="opacity:.5;margin-left:8px;font-weight:400;">(${miembros.length})</span>
        </td>
      </tr>`;

    // Filas de miembros
    miembros.forEach(c => {
      const tarea = App.tareas[c.id] || {};
      const rowCls = PYL.getRowClass(c.disponibilidad);
      const disp   = c.disponibilidad;
      const bDisp  = PYL.getDisponibilidadBadge(disp);

      // Backup badges
      const bk1 = c.backup1 ? `<span class="backup-badge">${c.backup1}</span>` : '';
      const bk2 = c.backup2 ? `<span class="backup-badge">${c.backup2}</span>` : '';

      // Clientes
      const cliHtml = c.clientes.length
        ? c.clientes.map(cl => `<span class="cliente-tag">• ${cl}</span>`).join('')
        : `<span class="cliente-tag" style="color:var(--text-muted);font-style:italic;">Sin asignación</span>`;

      // TS display
      const tsHtml = disp !== 'operativo' && disp !== 'lactancia'
        ? `<span class="badge ${bDisp.cls}" style="font-size:10px;">${bDisp.label.toUpperCase()}</span>`
        : c.ts
          ? `<span class="ts-value">${c.ts}</span>`
          : `<span class="ts-empty">— Sin TS asignada —</span>`;

      // Checkboxes de tareas
      const taskCells = tareas.map(t =>
        `<td class="task-cell">
          <div class="task-check ${tarea[t.key] ? 'checked' : ''}"
               onclick="toggleTarea('${c.id}','${t.key}',this)"
               role="checkbox" aria-checked="${!!tarea[t.key]}">
            ${ICONS.check}
          </div>
        </td>`
      ).join('');

      rowsHtml += `
        <tr class="${rowCls}" data-id="${c.id}">
          <td class="col-planificador">
            <div class="planner-cell">
              ${initBadge(c.iniciales, c.ciudad)}
              <div class="planner-info">
                <div class="planner-name">${c.nombre}</div>
                <div class="planner-cargo">${c.cargo}</div>
              </div>
            </div>
          </td>
          <td class="dispon-cell">${renderBadge(disp)}</td>
          <td class="ts-cell">${tsHtml}</td>
          <td class="backup-cell">
            <div class="backup-pair">${bk1}${bk2}</div>
          </td>
          <td class="clientes-cell">
            <div class="cliente-tags">${cliHtml}</div>
          </td>
          <td class="obs-cell">
            <span class="obs-text" title="${c.obs || ''}">${c.obs || ''}</span>
          </td>
          ${taskCells}
        </tr>`;
    });
  });

  return `
  <div class="dist-wrap">
    <div class="dist-toolbar">
      <div class="dist-toolbar-title">
        Distribución Semanal
        <span style="font-weight:400;color:var(--text-muted);margin-left:8px;">${semana.label}</span>
      </div>

      <div class="filter-group">
        <div class="search-wrap">
          <span class="search-icon">${ICONS.search}</span>
          <input type="text" class="search-input" placeholder="Buscar planificador..."
                 id="searchInput" value="${App.busqueda}"
                 oninput="App.busqueda=this.value;renderModule()">
        </div>
      </div>

      <div class="filter-group">
        <select class="filter-select" onchange="App.filtroGrupo=this.value;renderModule()">
          <option value="all">Todos los grupos</option>
          ${PYL.grupos.map(g => `
            <option value="${g.id}" ${App.filtroGrupo === g.id ? 'selected' : ''}>${g.label}</option>
          `).join('')}
        </select>

        <select class="filter-select" onchange="App.filtroCiudad=this.value;renderModule()">
          <option value="all">Todas las ciudades</option>
          <option value="UIO" ${App.filtroCiudad === 'UIO' ? 'selected' : ''}>UIO — Quito</option>
          <option value="GYE" ${App.filtroCiudad === 'GYE' ? 'selected' : ''}>GYE — Guayaquil</option>
          <option value="MIL" ${App.filtroCiudad === 'MIL' ? 'selected' : ''}>MIL — Milagro</option>
        </select>

        <select class="filter-select" onchange="App.filtroDisp=this.value;renderModule()">
          <option value="all">Toda disponibilidad</option>
          <option value="operativo"  ${App.filtroDisp === 'operativo'  ? 'selected' : ''}>Operativo</option>
          <option value="lactancia"  ${App.filtroDisp === 'lactancia'  ? 'selected' : ''}>Lactancia</option>
          <option value="maternidad" ${App.filtroDisp === 'maternidad' ? 'selected' : ''}>Maternidad</option>
          <option value="vacaciones" ${App.filtroDisp === 'vacaciones' ? 'selected' : ''}>Vacaciones</option>
        </select>
      </div>

      <button class="btn btn-primary btn-sm" onclick="openModalNuevoRegistro()">
        ${ICONS.plus} Nueva fila
      </button>
    </div>

    <div class="dist-scroll">
      <table class="dist-table">
        <thead>
          <tr>
            <th class="col-sticky" style="min-width:200px;">Planificador</th>
            <th style="min-width:100px;">Disponibilidad</th>
            <th style="min-width:180px;">Técnica Sucursal</th>
            <th style="min-width:90px;">Backups</th>
            <th style="min-width:200px;">Clientes / Proyectos</th>
            <th style="min-width:160px;">Observaciones</th>
            ${taskHeaders}
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  </div>

  <div style="padding:var(--sp-4) var(--sp-5);display:flex;align-items:center;gap:var(--sp-4);">
    <div style="display:flex;gap:var(--sp-3);align-items:center;flex-wrap:wrap;">
      ${PYL.grupos.map(g => `
        <span style="display:flex;align-items:center;gap:6px;font-size:var(--text-xs);color:var(--text-muted);">
          <span style="width:10px;height:10px;border-radius:50%;background:${g.dot};display:inline-block;"></span>
          ${g.label}
        </span>
      `).join('')}
    </div>
    <div style="margin-left:auto;display:flex;gap:var(--sp-3);flex-wrap:wrap;">
      ${['operativo','lactancia','maternidad','vacaciones'].map(d => {
        const b = PYL.getDisponibilidadBadge(d);
        return `<span class="badge ${b.cls}">${b.label}</span>`;
      }).join('')}
    </div>
  </div>`;
}

// ── Personal ──────────────────────────────────────────────
function renderPersonal() {
  const cards = PYL.colaboradores.map(c => {
    const b = PYL.getDisponibilidadBadge(c.disponibilidad);
    return `
      <div class="personal-card">
        <div class="personal-card-header">
          ${initBadge(c.iniciales, c.ciudad, 'lg')}
          <div class="personal-card-info">
            <div class="personal-name">${c.nombre}</div>
            <div class="personal-cargo">${c.cargo}</div>
          </div>
          <span class="badge ${b.cls}">${b.label}</span>
        </div>
        <div class="personal-card-details">
          <div class="personal-detail">
            ${ICONS.ts}
            <span>${c.ciudad === 'UIO' ? 'Quito' : c.ciudad === 'GYE' ? 'Guayaquil' : 'Milagro'}</span>
          </div>
          <div class="personal-detail">
            ${ICONS.clientes}
            <span>${c.clientes.length ? c.clientes.join(', ') : 'Sin clientes asignados'}</span>
          </div>
          ${c.ts ? `
          <div class="personal-detail">
            ${ICONS.ts}
            <span style="color:var(--accent);">${c.ts}</span>
          </div>` : ''}
        </div>
        <div class="personal-card-footer">
          <div class="backup-pair">
            ${c.backup1 ? `<span class="backup-badge">BK1: ${c.backup1}</span>` : ''}
            ${c.backup2 ? `<span class="backup-badge">BK2: ${c.backup2}</span>` : ''}
          </div>
          <span style="font-size:var(--text-xs);color:var(--text-muted);
                       font-family:var(--font-mono);">${c.grupo}</span>
        </div>
      </div>`;
  }).join('');

  return `
  <div class="section-header">
    <div>
      <div class="section-title">Equipo PYL</div>
      <div class="section-desc">${PYL.colaboradores.length} colaboradores registrados</div>
    </div>
    <button class="btn btn-primary btn-sm">
      ${ICONS.plus} Nuevo colaborador
    </button>
  </div>
  <div class="personal-grid">${cards}</div>`;
}

// ── Turnos ────────────────────────────────────────────────
function renderTurnos() {
  const rows = PYL.turnos.map((t, i) => `
    <div class="turno-row" style="animation:fadeIn .15s ease ${i * 30}ms both;">
      <div class="turno-fecha">${t.fecha}</div>
      <div class="turno-planificador">
        ${initBadge(t.iniciales, t.ciudad)}
        <span class="turno-nombre">${t.planificador}</span>
      </div>
      <div style="margin-left:auto;display:flex;align-items:center;gap:var(--sp-3);">
        <span class="badge badge-neutral">${t.tipo}</span>
        <button class="btn btn-ghost btn-sm btn-icon"
                onclick="showToast('Turno editado','success')"
                title="Editar turno">✎</button>
      </div>
    </div>
  `).join('');

  return `
  <div class="section-header">
    <div>
      <div class="section-title">Turnos de Fin de Semana</div>
      <div class="section-desc">Rotación anual del equipo</div>
    </div>
    <button class="btn btn-primary btn-sm">
      ${ICONS.plus} Asignar turno
    </button>
  </div>

  <div class="card">
    <div class="card-header">
      <div class="card-title">Próximos turnos programados</div>
      <span class="badge badge-neutral">${PYL.turnos.length} registros</span>
    </div>
    <div class="card-body">
      <div class="turno-list">${rows}</div>
    </div>
  </div>`;
}

// ── Clientes ──────────────────────────────────────────────
function renderClientes() {
  const clientes = [
    { nombre:'BANCO PICHINCHA C.A.',           tipo:'banca_tamp',  gestor:'RA', ciudad:'GYE', estado:'activo' },
    { nombre:'COOPERATIVA JEP',                tipo:'banca_tamp',  gestor:'CA', ciudad:'UIO', estado:'activo' },
    { nombre:'BANCO DE LA PRODUCCION PRODUBANCO',tipo:'banca_tamp',gestor:'AG', ciudad:'UIO', estado:'activo' },
    { nombre:'GRUPO KFC',                       tipo:'nacional',    gestor:'KH', ciudad:'GYE', estado:'activo' },
    { nombre:'GRUPO DIFARE',                    tipo:'nacional',    gestor:'CV', ciudad:'GYE', estado:'activo' },
    { nombre:'CORPORACIÓN GPF (FYBECA)',        tipo:'nacional',    gestor:'MC', ciudad:'GYE', estado:'activo' },
    { nombre:'GRUPO ICESA',                     tipo:'nacional',    gestor:'MOV',ciudad:'GYE', estado:'activo' },
    { nombre:'TUTI TTDE S.A.',                  tipo:'nacional',    gestor:'WG', ciudad:'GYE', estado:'activo' },
    { nombre:'INTERAGUA',                       tipo:'nacional',    gestor:'MC', ciudad:'GYE', estado:'activo' },
    { nombre:'BANCO DEL PACÍFICO',              tipo:'banca_tamp',  gestor:'SV', ciudad:'GYE', estado:'activo' },
    { nombre:'OTECEL S.A.',                     tipo:'tercerizado',  gestor:'AO', ciudad:'UIO', estado:'activo' },
    { nombre:'INTERTELNET / BRIGHCELL',         tipo:'tercerizado',  gestor:'BGU',ciudad:'UIO', estado:'activo' },
    { nombre:'NEDETEL',                         tipo:'nacional',    gestor:'TU', ciudad:'UIO', estado:'activo' },
    { nombre:'BANCO INTERNACIONAL',             tipo:'banca_tamp',  gestor:'AM', ciudad:'GYE', estado:'activo' },
  ];

  const tipoLabel = { banca_tamp:'Banca/TAMP', nacional:'Nacional', tercerizado:'Tercerizado' };
  const tipoBadge = { banca_tamp:'badge-op', nacional:'badge-neutral', tercerizado:'badge-mat' };

  const rows = clientes.map(c => `
    <tr>
      <td style="font-weight:600;">${c.nombre}</td>
      <td><span class="badge ${tipoBadge[c.tipo]}">${tipoLabel[c.tipo]}</span></td>
      <td>${initBadge(c.gestor, c.ciudad)}</td>
      <td><span class="badge ${c.ciudad === 'UIO' ? 'badge-op' : 'badge-neutral'}">${c.ciudad}</span></td>
      <td><span class="badge badge-op">Activo</span></td>
      <td>
        <button class="btn btn-ghost btn-sm">Ver detalle</button>
      </td>
    </tr>
  `).join('');

  return `
  <div class="section-header">
    <div>
      <div class="section-title">Clientes Nacionales</div>
      <div class="section-desc">${clientes.length} clientes registrados</div>
    </div>
    <button class="btn btn-primary btn-sm">${ICONS.plus} Nuevo cliente</button>
  </div>

  <div class="card">
    <div class="dist-scroll" style="max-height:none;">
      <table class="dist-table">
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>Tipo</th>
            <th>Gestor</th>
            <th>Ciudad</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

// ── Técnicas Sucursales ───────────────────────────────────
function renderTS() {
  const tsList = [
    { codigo:'TS QUITO',         coord:'— (TS Principal)',    jefe:'—',            zonas:'Quito, Sangolquí, Tumbaco' },
    { codigo:'TS GUAYAQUIL',     coord:'— (TS Principal)',    jefe:'—',            zonas:'Guayaquil, Norte, Sur' },
    { codigo:'TS IBARRA',        coord:'William Mendoza',     jefe:'Jimmy Enriquez',zonas:'Ibarra, Otavalo, Tulcán, Cayambe' },
    { codigo:'TS AMBATO',        coord:'Vanessa Herrera',     jefe:'Diego Pilco',  zonas:'Ambato, Latacunga' },
    { codigo:'TS RIOBAMBA',      coord:'Verónica Ruiz',       jefe:'Jose Urquizo', zonas:'Riobamba, Guaranda, Puyo, Tena' },
    { codigo:'TS SANTO DOMINGO', coord:'Diego Valdivieso',    jefe:'Henry Reisancho',zonas:'Santo Domingo, El Carmen' },
    { codigo:'TS ESMERALDAS',    coord:'Kenya Castillo',      jefe:'Ismael Andrade',zonas:'Esmeraldas, Pedernales' },
    { codigo:'TS LAGO AGRIO',    coord:'Roman Ramo',          jefe:'Lenin Vera',   zonas:'Lago Agrio, Shushufindi' },
    { codigo:'TS ORELLANA',      coord:'Dixon Shacay',        jefe:'Alberto Pincay',zonas:'El Coca' },
    { codigo:'TS MANTA',         coord:'Patricio Barcia',     jefe:'Cesar Abarca', zonas:'Manta, Portoviejo, Chone' },
    { codigo:'TS MACHALA',       coord:'Christian Zaruma',    jefe:'Genaro Merchan',zonas:'Machala, Pasaje, Santa Rosa' },
    { codigo:'TS QUEVEDO',       coord:'Nelson Jara',         jefe:'Carlos Bravo', zonas:'Quevedo, Babahoyo' },
    { codigo:'TS CUENCA',        coord:'Freddy Fajardo',      jefe:'Victor Heredia',zonas:'Cuenca, Azogues, Macas' },
    { codigo:'TS SALINAS',       coord:'Janio Herrera',       jefe:'Byron Benavides',zonas:'Salinas, Santa Elena, Playas' },
    { codigo:'TS LOJA',          coord:'Sergio Jaramillo',    jefe:'Efrain Encarnacion',zonas:'Loja, Catamayo' },
    { codigo:'TS MILAGRO',       coord:'Leonardo Carrillo',   jefe:'Freddy Jaramillo',zonas:'Milagro, Yaguachi, Daule' },
  ];

  const rows = tsList.map(t => `
    <tr>
      <td style="font-weight:700;font-family:var(--font-mono);font-size:var(--text-xs);color:var(--accent);">${t.codigo}</td>
      <td style="font-size:var(--text-xs);">${t.coord}</td>
      <td style="font-size:var(--text-xs);">${t.jefe}</td>
      <td style="font-size:var(--text-xs);color:var(--text-muted);max-width:220px;">${t.zonas}</td>
      <td><span class="badge badge-op">Activa</span></td>
    </tr>
  `).join('');

  return `
  <div class="section-header">
    <div>
      <div class="section-title">Técnicas Sucursales</div>
      <div class="section-desc">${tsList.length} TS registradas con sus coordinadores</div>
    </div>
  </div>

  <div class="card">
    <div class="dist-scroll" style="max-height:none;">
      <table class="dist-table">
        <thead>
          <tr>
            <th>Código TS</th>
            <th>Coordinador</th>
            <th>Jefe TS</th>
            <th>Cobertura</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

// ── Motivos y plantillas ──────────────────────────────────
function renderMotivos() {
  const categorias = [
    { label:'Detener OT', cls:'badge-det', motivos:[
      { nombre:'Excedente de metraje',      plantilla:'COMERCIAL - CLIENTE: Se espera confirmación del cliente de acuerdo a la tarea de excedente de metraje creada a comercial # {tarea}' },
      { nombre:'Materiales Adicionales',    plantilla:'COMERCIAL - CLIENTE: Se espera confirmación del cliente de acuerdo a la tarea de material extra creada a comercial # {tarea}' },
      { nombre:'Cliente posterga fecha',    plantilla:'CLIENTE POSTERGA: {nombre} con CEL: {celular}, solicita la instalación para el {fecha}, debido {motivo}' },
      { nombre:'Cliente no contesta',       plantilla:'CLIENTE NO CONTESTA: Gestión realizada el {fecha}, no se tiene respuesta a los números de contacto. NÚMEROS {numeros}' },
    ]},
    { label:'Replanificar', cls:'badge-rep', motivos:[
      { nombre:'Gestión Concentrador',      plantilla:'CONCENTRADOR: Se verifica que el enlace depende del concentrador bajo login: {login}, una vez que se confirme como activo se procederá a coordinar la visita' },
      { nombre:'Gestión equipo/capacidad',  plantilla:'EQUIPO CAPACIDAD: Se gestiona el {equipo} bajo la tarea {tarea}.' },
      { nombre:'Gestión Tercerizados',      plantilla:'TERCERIZADOS: Se gestiona la UM y VLANs con la empresa {tercerizado}.' },
      { nombre:'Sector Regenerado',         plantilla:'GYE FISCALIZADOR: se espera disponibilidad del FISCALIZADOR por Zona soterrada.' },
    ]},
    { label:'Pausar Tarea', cls:'badge-mat', motivos:[
      { nombre:'Condiciones climáticas',    plantilla:'CLIMA: No fue posible realizar los trabajos debido a condiciones climáticas en la zona.' },
      { nombre:'Permisos cliente',          plantilla:'PERMISOS CLIENTE: {nombre} con CEL: {celular}, indica que va a gestionar los permisos.' },
      { nombre:'Empresa tercerizadora',     plantilla:'Se escala solicitud de trabajos a la TERCERIZADORA {nombre}, pendiente confirmación.' },
    ]},
  ];

  const sections = categorias.map(cat => `
    <div class="card mb-4">
      <div class="card-header">
        <span class="badge ${cat.cls}">${cat.label}</span>
        <span class="text-muted text-xs" style="margin-left:auto;">${cat.motivos.length} plantillas</span>
      </div>
      <div class="card-body" style="padding:0;">
        ${cat.motivos.map(m => `
          <div style="padding:var(--sp-3) var(--sp-5);border-bottom:1px solid var(--border);
                      display:flex;align-items:flex-start;gap:var(--sp-4);">
            <div style="flex:1;">
              <div style="font-size:var(--text-sm);font-weight:600;margin-bottom:4px;">${m.nombre}</div>
              <div style="font-size:var(--text-xs);color:var(--text-muted);
                          font-family:var(--font-mono);line-height:1.6;
                          background:var(--bg-row-alt);padding:8px;
                          border-radius:var(--r-sm);">${m.plantilla}</div>
            </div>
            <button class="btn btn-secondary btn-sm" style="flex-shrink:0;"
                    onclick="copyPlantilla(this,'${encodeURIComponent(m.plantilla)}')">
              Copiar
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  return `
  <div class="section-header">
    <div>
      <div class="section-title">Motivos y Plantillas</div>
      <div class="section-desc">Textos estándar para OTS, tareas y observaciones</div>
    </div>
  </div>
  ${sections}`;
}

// ── Acuerdos ──────────────────────────────────────────────
function renderAcuerdos() {
  const acuerdos = [
    { tipo:'Directriz', titulo:'Procedimiento de instalaciones - Tiempo máximo', descripcion:'Las instalaciones no pueden superar los 15 días autorizados por la GTN en estado FACTIBLE.', fecha:'2024-01-15', estado:'vigente', prioridad:'alta' },
    { tipo:'Acuerdo',   titulo:'Gestión de permisos CC El Recreo',               descripcion:'Los permisos siempre se deben gestionar para las 07:00 am. No se puede programar fines de semana y feriados.', fecha:'2024-03-10', estado:'vigente', prioridad:'media' },
    { tipo:'Procedimiento',titulo:'Rotación semanal de TS',                      descripcion:'Cada planificador rota la TS asignada semanalmente según la tabla de rotación publicada cada lunes.', fecha:'2024-06-01', estado:'vigente', prioridad:'alta' },
    { tipo:'Comunicado', titulo:'Actualización de equipos PRODUBANCO',            descripcion:'Se incorporan los modelos Aruba 515 para las agencias. Verificar disponibilidad en bodega antes de programar.', fecha:'2024-11-20', estado:'vigente', prioridad:'media' },
  ];

  const tipoBadge = { Directriz:'badge-det', Acuerdo:'badge-op', Procedimiento:'badge-mat', Comunicado:'badge-neutral' };
  const cards = acuerdos.map(a => `
    <div class="card mb-4">
      <div class="card-header">
        <span class="badge ${tipoBadge[a.tipo]}">${a.tipo}</span>
        <div style="flex:1;margin-left:var(--sp-3);">
          <div style="font-weight:700;">${a.titulo}</div>
        </div>
        <span class="badge badge-op" style="margin-left:auto;">Vigente</span>
      </div>
      <div class="card-body">
        <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.6;">${a.descripcion}</p>
        <div style="margin-top:var(--sp-3);font-size:var(--text-xs);color:var(--text-muted);">
          Fecha: ${PYL.formatDate(a.fecha)} · Prioridad: ${a.prioridad}
        </div>
      </div>
    </div>
  `).join('');

  return `
  <div class="section-header">
    <div>
      <div class="section-title">Acuerdos y Directrices</div>
      <div class="section-desc">Procedimientos operativos vigentes del equipo</div>
    </div>
    <button class="btn btn-primary btn-sm">${ICONS.plus} Nuevo acuerdo</button>
  </div>
  ${cards}`;
}

// ── Modal ─────────────────────────────────────────────────
function openModalNuevoRegistro() {
  const overlay = document.getElementById('modalOverlay');
  const body    = document.getElementById('modalBody');

  body.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Planificador</label>
        <select class="form-select">
          ${PYL.colaboradores.map(c =>
            `<option value="${c.id}">${c.nombre}</option>`
          ).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Disponibilidad</label>
        <select class="form-select">
          <option value="operativo">Operativo</option>
          <option value="maternidad">Maternidad</option>
          <option value="lactancia">Lactancia</option>
          <option value="vacaciones">Vacaciones</option>
          <option value="descanso_medico">Descanso Médico</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Técnica Sucursal</label>
      <input type="text" class="form-input" placeholder="Ej: TS QUITO, TS GUAYAQUIL...">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Backup 1</label>
        <input type="text" class="form-input" placeholder="Iniciales (ej: AG)">
      </div>
      <div class="form-group">
        <label class="form-label">Backup 2</label>
        <input type="text" class="form-input" placeholder="Iniciales (ej: CA)">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Clientes / Proyectos</label>
      <input type="text" class="form-input" placeholder="Ej: BANCO PICHINCHA, PROYECTO REINGENIERÍAS">
    </div>
    <div class="form-group">
      <label class="form-label">Observaciones</label>
      <textarea class="form-textarea" placeholder="Observaciones adicionales del periodo..."></textarea>
    </div>`;

  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// ── Interacciones ─────────────────────────────────────────
function toggleTarea(colaboradorId, tareaKey, el) {
  if (!App.tareas[colaboradorId]) App.tareas[colaboradorId] = {};
  App.tareas[colaboradorId][tareaKey] = !App.tareas[colaboradorId][tareaKey];
  const checked = App.tareas[colaboradorId][tareaKey];
  el.classList.toggle('checked', checked);
  el.setAttribute('aria-checked', checked);
  showToast(`Tarea ${checked ? 'marcada' : 'desmarcada'}`, 'success');
}

function changeSemana(dir) {
  const newIdx = App.semanaIdx + dir;
  if (newIdx >= 0 && newIdx < PYL.semanas.length) {
    App.semanaIdx = newIdx;
    renderModule();
  }
}

function copyPlantilla(btn, encoded) {
  const text = decodeURIComponent(encoded);
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copiado';
    setTimeout(() => { btn.textContent = 'Copiar'; }, 2000);
    showToast('Plantilla copiada al portapapeles', 'success');
  });
}

// ── Toast ─────────────────────────────────────────────────
function showToast(msg, type = 'default') {
  const container = document.getElementById('toastContainer');
  const icons = { success: ICONS.check, error: ICONS.alert, default: ICONS.activity };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.default}</span>${msg}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(24px)';
    toast.style.transition = 'all .2s ease';
    setTimeout(() => toast.remove(), 220);
  }, 2800);
}

// ── Router / Render principal ─────────────────────────────
function navigate(modulo) {
  App.modulo = modulo;
  // Reset filtros al cambiar módulo
  if (modulo !== 'planning') {
    App.busqueda = '';
  }
  render();
}

const moduleTitles = {
  dashboard: ['Dashboard', 'Panel General'],
  planning:  ['Distribución Semanal', 'PYL — Planificación y Logística'],
  personal:  ['Personal', 'Equipo PYL'],
  turnos:    ['Turnos', 'Fin de Semana — Rotación Anual'],
  clientes:  ['Clientes', 'Gestión de Clientes Nacionales'],
  ts:        ['Técnicas Sucursales', 'Coordinadores y Cobertura'],
  motivos:   ['Motivos y Plantillas', 'Textos Estándar Operativos'],
  acuerdos:  ['Acuerdos y Directrices', 'Operativo Vigente'],
};

function renderModule() {
  const main = document.getElementById('appMain');
  const header = document.getElementById('appHeader');

  const [title, sub] = moduleTitles[App.modulo] || ['PYL', ''];
  header.outerHTML = renderHeader(title, sub);
  // Re-bind header
  document.getElementById('appHeader');

  const renders = {
    dashboard: renderDashboard,
    planning:  renderPlanning,
    personal:  renderPersonal,
    turnos:    renderTurnos,
    clientes:  renderClientes,
    ts:        renderTS,
    motivos:   renderMotivos,
    acuerdos:  renderAcuerdos,
  };
  main.innerHTML = (renders[App.modulo] || renderDashboard)();
}

function render() {
  const shell = document.getElementById('appShell');
  const [title, sub] = moduleTitles[App.modulo] || ['PYL', ''];

  shell.innerHTML = `
    ${renderSidebar()}
    <div id="appHeader">${renderHeader(title, sub)}</div>
    <main class="app-main" id="appMain"></main>
  `;

  renderModule();

  // Rebind nav (sidebar se regenera)
  $$('.nav-item').forEach(el => {
    el.addEventListener('click', function() {
      const mod = this.getAttribute('onclick')?.match(/navigate\('(\w+)'\)/)?.[1];
      if (mod) {
        $$('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

// ── Login ──────────────────────────────────────────────────
function renderLogin() {
  return `
  <div class="login-screen" id="loginScreen">
    <div class="login-brand">
      <div style="text-align:center;">
        <div class="logo-icon" style="width:56px;height:56px;border-radius:16px;margin:0 auto var(--sp-5);">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" style="width:30px;height:30px;">
            <path d="M22 12H18L15 21 9 3 6 12 2 12"/>
          </svg>
        </div>
        <div style="font-size:1.5rem;font-weight:800;color:#fff;letter-spacing:-.02em;">PYL System</div>
        <div style="font-size:var(--text-sm);color:rgba(255,255,255,.4);margin-top:8px;">Planificación y Logística</div>
        <div style="margin-top:var(--sp-8);text-align:left;">
          <div style="font-size:var(--text-xs);font-weight:600;color:rgba(255,255,255,.3);
                      text-transform:uppercase;letter-spacing:.08em;margin-bottom:var(--sp-4);">
            Lo que encontrarás
          </div>
          ${[
            ['Distribución Semanal',   'Matriz planificador × semana en tiempo real'],
            ['Rotación de TS',         'Asignación automática de Técnicas Sucursales'],
            ['Gestión de Turnos',      'Calendario rotativo anual del equipo'],
            ['Plantillas Operativas',  'Textos estándar para OTS y observaciones'],
          ].map(([t,d]) => `
            <div style="display:flex;gap:var(--sp-3);margin-bottom:var(--sp-3);">
              <div style="width:20px;height:20px;background:rgba(0,168,232,.2);border-radius:50%;
                          display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00A8E8" stroke-width="3"
                     style="width:10px;height:10px;"><polyline points="20,6 9,17 4,12"/></svg>
              </div>
              <div>
                <div style="font-size:var(--text-sm);font-weight:600;color:rgba(255,255,255,.8);">${t}</div>
                <div style="font-size:var(--text-xs);color:rgba(255,255,255,.35);">${d}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="login-content">
      <div class="login-box">
        <div class="login-title">Bienvenido</div>
        <div class="login-sub">Ingresa con tu cuenta corporativa de Google para continuar</div>

        <button class="btn-google" onclick="doLogin()">
          ${ICONS.google}
          Continuar con Google Workspace
        </button>

        <div class="login-divider">o</div>

        <div style="text-align:center;">
          <button class="btn btn-ghost w-full" onclick="doLoginDemo()"
                  style="justify-content:center;color:rgba(255,255,255,.5);width:100%;font-size:var(--text-sm);">
            Ver demo sin autenticación →
          </button>
        </div>

        <div class="login-notice">
          Acceso restringido a cuentas corporativas autorizadas.<br>
          Si tienes problemas para ingresar, contacta al administrador.
        </div>
      </div>
    </div>
  </div>`;
}

function doLogin() {
  showToast('Redirigiendo a Google OAuth...', 'default');
  setTimeout(doLoginDemo, 1200);
}

function doLoginDemo() {
  document.getElementById('loginContainer').classList.add('hidden');
  document.getElementById('appShell').classList.remove('hidden');
  document.getElementById('toastContainer').classList.remove('hidden');
  render();
  showToast('Bienvenida, H. Chiluisa', 'success');
}

// ── Animaciones CSS dinámicas ─────────────────────────────
function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectKeyframes();
  document.getElementById('loginContainer').innerHTML = renderLogin();
});
