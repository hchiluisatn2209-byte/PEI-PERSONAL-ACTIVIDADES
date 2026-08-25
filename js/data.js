// ============================================================
// PYL SYSTEM — Mock Data (reemplazar con llamadas Supabase)
// ============================================================

const PYL = {};

// ── Semanas ──────────────────────────────────────────────
PYL.semanas = [
  { id: 1, label: 'DEL 30 DIC AL 03 ENE', inicio: '2024-12-30', fin: '2025-01-03', semana: 1 },
  { id: 2, label: 'DEL 06 AL 10 ENERO',   inicio: '2025-01-06', fin: '2025-01-10', semana: 2 },
  { id: 3, label: 'DEL 13 AL 17 ENERO',   inicio: '2025-01-13', fin: '2025-01-17', semana: 3 },
  { id: 4, label: 'DEL 20 AL 24 ENERO',   inicio: '2025-01-20', fin: '2025-01-24', semana: 4 },
  { id: 5, label: 'DEL 27 AL 31 ENERO',   inicio: '2025-01-27', fin: '2025-01-31', semana: 5 },
  { id: 6, label: 'DEL 03 AL 07 FEBRERO', inicio: '2025-02-03', fin: '2025-02-07', semana: 6 },
];
PYL.semanaActual = 2;

// ── Colaboradores ────────────────────────────────────────
PYL.colaboradores = [
  // PROYECTOS CRM
  { id: 'jruiz',    iniciales: 'JR', nombre: 'JESSICA RUIZ',      apellidos: 'RUIZ ANDRADE JESSICA KATHIUSKA',  cargo: 'Coordinador',            ciudad: 'GYE', grupo: 'PROY_CRM',    disponibilidad: 'operativo',   backup1: 'AG', backup2: null,  clientes: [],                              ts: null,                        obs: null },
  { id: 'agallardo',iniciales: 'AG', nombre: 'ALEJANDRA GALLARDO',apellidos: 'GALLARDO REASCO DIANA ALEJANDRA', cargo: 'PM JR',                   ciudad: 'UIO', grupo: 'PROY_CRM',    disponibilidad: 'operativo',   backup1: 'CA', backup2: null,  clientes: ['PRODUBANCO'],                  ts: null,                        obs: 'REINGENIERÍAS / PROYECTO PLANIFICACIÓN' },
  { id: 'calmeida', iniciales: 'CA', nombre: 'CHRISTIAN ALMEIDA', apellidos: 'ALMEIDA CHICAIZA CHRISTIAN DAVID',cargo: 'PM JR',                   ciudad: 'UIO', grupo: 'PROY_CRM',    disponibilidad: 'operativo',   backup1: 'AG', backup2: null,  clientes: ['COOP. JEP'],                   ts: null,                        obs: null },

  // OTS MASIVAS - Guayaquil
  { id: 'gmina',    iniciales: 'GM', nombre: 'GABRIELA MINA',     apellidos: 'MINA MORAN GABRIELA STEPHANIE',   cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'MC', backup2: 'MOV', clientes: ['PYCCA','BANCO BOLIVARIANO'],   ts: 'TS ORELLANA',               obs: null },
  { id: 'vcarrillo',iniciales: 'MC', nombre: 'VERONICA CARRILLO', apellidos: 'CARRILLO QUEZADA VERONICA MELINA',cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'lactancia',   backup1: 'GM', backup2: 'WG',  clientes: ['INTERAGUA'],                   ts: 'TS MANTA - WILSON MORENO',  obs: 'Concluye permiso lactancia: 11-05-2025' },
  { id: 'racosta',  iniciales: 'RA', nombre: 'ROMINA ACOSTA',     apellidos: 'ACOSTA MATO ROMINA ALEXANDRA',    cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'MOV',backup2: 'AM',  clientes: ['BANCO PICHINCHA'],             ts: 'TS QUITO',                  obs: null },
  { id: 'morozco',  iniciales: 'MOV',nombre: 'MELANY OROZCO',     apellidos: 'OROZCO VEGA MELANY ARACELY',      cargo: 'Planificador Proyectos',  ciudad: 'UIO', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'RA', backup2: 'GM',  clientes: ['GRUPO ICESA','BANCO GUAYAQUIL'],ts: 'TS AMBATO - XAVIER SALAGATA',obs: null },
  { id: 'amejia',   iniciales: 'AM', nombre: 'ANGEL MEJIA',       apellidos: 'MEJÍA CHUVA ANGEL TITO',          cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'AM', backup2: null,  clientes: ['BANCO INTERNACIONAL'],         ts: 'TS GUAYAQUIL',              obs: 'REEMPLAZO RA - REINGENIERIA' },
  { id: 'loviedo',  iniciales: 'LO', nombre: 'LOURDES OVIEDO',    apellidos: 'OVIEDO ZAMBRANO LOURDES ESTEFANY',cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'CV', backup2: 'LG',  clientes: ['CORP. GPF','FRANQUICIADO'],    ts: 'TS MILAGRO - WILSON MORENO',obs: null },
  { id: 'cvalarezo',iniciales: 'CV', nombre: 'CHRISTIAN VALAREZO',apellidos: 'VALAREZO CARPIO CHRISTIAN ENRIQUE',cargo:'Planificador Proyectos', ciudad: 'MIL', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'LO', backup2: 'SO',  clientes: ['GRUPO DIFARE','MEDILABOR'],    ts: 'TS QUEVEDO - WILSON MORENO',obs: null },
  { id: 'sortiz',   iniciales: 'SO', nombre: 'SILVIA ORTIZ',      apellidos: 'ORTIZ GRANDA SILVIA VALERIA',     cargo: 'PM JR',                   ciudad: 'UIO', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'LG', backup2: 'MO',  clientes: ['BANCO PRODUBANCO'],            ts: 'TS MACHALA - WILSON MORENO',obs: null },
  { id: 'lgaibor',  iniciales: 'LG', nombre: 'LUIS GAIBOR',       apellidos: 'GAIBOR NOBOA LUIS ALBERTO',       cargo: 'PM JR',                   ciudad: 'UIO', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'SO', backup2: 'MO',  clientes: ['NEDETEL','S&C'],               ts: 'TS ESMERALDAS - XAVIER SALAGATA',obs: null },
  { id: 'morellana',iniciales: 'MO', nombre: 'MELANY ORELLANA',   apellidos: 'ORELLANA DIAZ MELANY ESTHEFANIA', cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'SO', backup2: 'LG',  clientes: [],                              ts: 'TS GUAYAQUIL',              obs: null },
  { id: 'aguallpa', iniciales: 'BGU',nombre: 'ANA GUALLPA',       apellidos: 'GUALLPA PARRA ANA BEATRIZ',       cargo: 'Planificador Proyectos',  ciudad: 'UIO', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'SV', backup2: null,  clientes: ['INTERTELNET','BRIGHCELL'],     ts: 'TS STO. DOMINGO - XAVIER SALAGATA',obs:'TRANSICIÓN DE RESPONSABILIDADES'},
  { id: 'svacacela',iniciales: 'SV', nombre: 'SORAYA VACACELA',   apellidos: 'VACACELA DE LA A SORAYA LISSETTE',cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'CMV',backup2: null,  clientes: ['BANCO PACIFICO'],              ts: 'TS IBARRA - XAVIER SALAGATA',obs: null },
  { id: 'kherrera', iniciales: 'KH', nombre: 'KAREN HERRERA',     apellidos: 'HERRERA CAÑIZARES KAREN MARIANELLA',cargo:'Planificador Proyectos',ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'FB', backup2: null,  clientes: ['GRUPO KFC','DIPAC MANTA'],     ts: 'TS LOJA',                   obs: null },
  { id: 'fbonifas', iniciales: 'FB', nombre: 'FERNANDO BONIFAS',  apellidos: 'BONIFAS PERALTA FERNANDO ALEXANDER',cargo:'Planificador Proyectos',ciudad: 'UIO', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'KH', backup2: null,  clientes: ['COOP JEP'],                   ts: 'TS CUENCA - XAVIER SALAGATA',obs: null },
  { id: 'wgaona',   iniciales: 'WG', nombre: 'WENDY GAONA',       apellidos: 'GAONA BARBA WENDY DENISSE',       cargo: 'Planificador Proyectos',  ciudad: 'GYE', grupo: 'OTS_MASIVAS', disponibilidad: 'operativo',   backup1: 'MC', backup2: 'AM',  clientes: ['TUTI'],                        ts: 'TS LAGO AGRIO',             obs: null },

  // TERCERIZADOS
  { id: 'vcruz',    iniciales: 'VC', nombre: 'VERÓNICA CRUZ',     apellidos: 'CRUZ CARGUA VERÓNICA LUCIA',      cargo: 'Planificador Proyectos',  ciudad: 'UIO', grupo: 'TERCERIZADOS',disponibilidad: 'operativo',   backup1: null, backup2: null,  clientes: ['OTECEL'],                      ts: 'TS LOJA',                   obs: null },
  { id: 'aonate',   iniciales: 'AO', nombre: 'ALEXIS OÑATE',      apellidos: 'OÑATE CAMPANA ALEXIS DAVID',      cargo: 'Planificador Proyectos',  ciudad: 'UIO', grupo: 'TERCERIZADOS',disponibilidad: 'operativo',   backup1: null, backup2: null,  clientes: ['OTECEL'],                      ts: 'TS RIOBAMBA - XAVIER SALAGATA',obs:null },
  { id: 'elopez',   iniciales: 'EL', nombre: 'ERIKA LÓPEZ',       apellidos: 'LOPEZ TOPANTA ERIKA ALEXANDRA',   cargo: 'Planificador Proyectos',  ciudad: 'UIO', grupo: 'TERCERIZADOS',disponibilidad: 'operativo',   backup1: null, backup2: null,  clientes: ['OTECEL'],                      ts: 'TS SALINAS - WILSON MORENO',obs: null },
];

// ── Tareas por colaborador (semana 2 - datos del Excel) ──
PYL.tareasSemana = {
  'jruiz':     { base_ots:false,base_tareas:false,envio_prog:true, asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'agallardo': { base_ots:true, base_tareas:false,envio_prog:true, asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'calmeida':  { base_ots:true, base_tareas:true, envio_prog:false,asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'gmina':     { base_ots:true, base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'vcarrillo': { base_ots:true, base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'racosta':   { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'morozco':   { base_ots:true, base_tareas:false,envio_prog:true, asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'amejia':    { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:true, formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'loviedo':   { base_ots:true, base_tareas:false,envio_prog:true, asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'cvalarezo': { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'sortiz':    { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'lgaibor':   { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'morellana': { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'aguallpa':  { base_ots:true, base_tareas:false,envio_prog:true, asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'svacacela': { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'kherrera':  { base_ots:true, base_tareas:false,envio_prog:true, asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'fbonifas':  { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'wgaona':    { base_ots:true, base_tareas:false,envio_prog:true, asig_proy:false,formato:true, barrido:true, resumen:true,  fiscalizador:false,notif_nl:true  },
  'vcruz':     { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'aonate':    { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
  'elopez':    { base_ots:false,base_tareas:false,envio_prog:false,asig_proy:false,formato:false,barrido:false,resumen:false, fiscalizador:false,notif_nl:false },
};

// ── Turnos ───────────────────────────────────────────────
PYL.turnos = [
  { fecha:'20-21 ENERO',  planificador:'TATIANA URBANO',    iniciales:'TU',  ciudad:'UIO', tipo:'Fin de semana' },
  { fecha:'27-28 ENERO',  planificador:'SILVIA ORTIZ',      iniciales:'SO',  ciudad:'UIO', tipo:'Fin de semana' },
  { fecha:'3-4 FEBRERO',  planificador:'WENDY SALAZAR',     iniciales:'WS',  ciudad:'GYE', tipo:'Fin de semana' },
  { fecha:'10-11 FEBRERO',planificador:'LOURDES OVIEDO',    iniciales:'LO',  ciudad:'GYE', tipo:'Fin de semana' },
  { fecha:'12-13 FEBRERO',planificador:'ANA GUALLPA',       iniciales:'BGU', ciudad:'UIO', tipo:'Fin de semana' },
  { fecha:'17-18 FEBRERO',planificador:'STEVEN VERA',       iniciales:'SV2', ciudad:'GYE', tipo:'Fin de semana' },
  { fecha:'24-25 FEBRERO',planificador:'SORAYA VACACELA',   iniciales:'SV',  ciudad:'GYE', tipo:'Fin de semana' },
  { fecha:'2-3 MARZO',    planificador:'CHRISTIAN VALAREZO',iniciales:'CV',  ciudad:'MIL', tipo:'Fin de semana' },
  { fecha:'9-10 MARZO',   planificador:'KAREN HERRERA',     iniciales:'KH',  ciudad:'GYE', tipo:'Fin de semana' },
  { fecha:'16-17 MARZO',  planificador:'GABRIELA MINA',     iniciales:'GM',  ciudad:'GYE', tipo:'Fin de semana' },
];

// ── KPIs ─────────────────────────────────────────────────
PYL.kpis = {
  totalColaboradores: 21,
  personalOperativo:  16,
  enMaternidad:        2,
  enVacaciones:        1,
  turnosSemana:        2,
  solicitudesPendientes: 3,
  clientesActivos:    24,
  actividadesDetenidas: 5,
  actividadesReplanificadas: 3,
  tsActivas: 16,
};

// ── Grupos de distribución ───────────────────────────────
PYL.grupos = [
  { id:'PROY_CRM',    label:'Proyectos CRM',                    color:'#9C27B0', dot:'#9C27B0' },
  { id:'OTS_MASIVAS', label:'OTS / Tareas / Proyectos Masivas', color:'#2196F3', dot:'#2196F3' },
  { id:'TERCERIZADOS',label:'Tercerizados',                     color:'#FF9800', dot:'#FF9800' },
];

// ── Columnas de tareas (headers de la tabla) ─────────────
PYL.columnaTareas = [
  { key:'base_ots',    label:'BASE\nOTS',     abbr:'OTS'  },
  { key:'base_tareas', label:'BASE\nTAREAS',  abbr:'TAR'  },
  { key:'envio_prog',  label:'ENVÍO\nPROG.',  abbr:'ENV'  },
  { key:'asig_proy',   label:'ASIG.\nPROY.',  abbr:'PRO'  },
  { key:'formato',     label:'FMT\nDIARIO',   abbr:'FMT'  },
  { key:'barrido',     label:'BARRIDO\nBASE', abbr:'BAR'  },
  { key:'resumen',     label:'RESUMEN\nPEND.',abbr:'RES'  },
  { key:'fiscalizador',label:'FISCALI-\nZADOR',abbr:'FIS' },
  { key:'notif_nl',    label:'NOTIF\nNL',     abbr:'NTF'  },
];

// ── Helpers ───────────────────────────────────────────────
PYL.getCityClass = (ciudad) => {
  const map = { UIO:'city-uio', GYE:'city-gye', MIL:'city-mil' };
  return map[ciudad] || 'city-other';
};

PYL.getDisponibilidadBadge = (disp) => {
  const map = {
    operativo:  { cls:'badge-op',      label:'Operativo'   },
    maternidad: { cls:'badge-mat',     label:'Maternidad'  },
    lactancia:  { cls:'badge-mat',     label:'Lactancia'   },
    vacaciones: { cls:'badge-vac',     label:'Vacaciones'  },
    descanso_medico: { cls:'badge-med',label:'Desc. Médico'},
    permiso:    { cls:'badge-neutral', label:'Permiso'     },
  };
  return map[disp] || { cls:'badge-neutral', label: disp };
};

PYL.getRowClass = (disp) => {
  const map = {
    maternidad: 'row-maternidad',
    lactancia:  'row-maternidad',
    vacaciones: 'row-vacaciones',
    descanso_medico: 'row-medico',
  };
  return map[disp] || '';
};

PYL.formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-EC', { day:'2-digit', month:'short' });
};
