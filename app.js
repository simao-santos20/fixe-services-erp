const SUPABASE_URL = 'https://dvwodxkeasqvbjneuqhv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_wl7GphLmmD7AO0Ls2GKsnA_J5sm7P5C';

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
const STORE='fixe-erp-operational-v1';
const fmt=v=>`Kz ${Number(v||0).toLocaleString('pt-AO')}`;
const code=(p,n)=>`${p}-2026-${String(180+n).padStart(4,'0')}`;
const seed={
orders:[
{id:'FIXE-2026-0187',client:'Condomínio Horizonte',place:'Bloco C · Kilamba',service:'Canalização',tech:'Paulo António',time:'Hoje, 08:30',priority:'SOS',state:'Em execução',materials:[]},{id:'FIXE-2026-0189',client:'Escritórios Kamba',place:'Maianga · Luanda',service:'Electricidade',tech:'João Manuel',time:'Hoje, 10:00',priority:'Alta',state:'Em execução',materials:[]},{id:'FIXE-2026-0190',client:'Clínica Vida',place:'Ingombota · Luanda',service:'Climatização',tech:'Carla Mendes',time:'Hoje, 14:30',priority:'Normal',state:'Agendada',materials:[]},{id:'FIXE-2026-0185',client:'Maria da Conceição',place:'Talatona · Luanda Sul',service:'Reparação geral',tech:'Por atribuir',time:'Hoje, 15:00',priority:'Alta',state:'Atrasada',materials:[]},{id:'FIXE-2026-0182',client:'Restaurante Kilombo',place:'Mutamba · Luanda',service:'Pintura',tech:'Manuel José',time:'30 Ago, 09:00',priority:'Normal',state:'Atrasada',materials:[]},{id:'FIXE-2026-0179',client:'Casa Sabor',place:'Benfica · Luanda',service:'Canalização',tech:'Paulo António',time:'29 Ago, 16:00',priority:'Normal',state:'Atrasada',materials:[]},{id:'FIXE-2026-0191',client:'Hotel Baía',place:'Ilha de Luanda',service:'Manutenção geral',tech:'Ana Lemos',time:'01 Set, 09:00',priority:'Normal',state:'Agendada',materials:[]},{id:'FIXE-2026-0188',client:'Residencial Atlântico',place:'Talatona',service:'Electricidade',tech:'João Manuel',time:'Hoje, 11:30',priority:'Urgente',state:'Em execução',materials:[]}],
stock:[{id:'ELE-CAB-025',name:'Cabo eléctrico 2,5 mm',unit:'m',qty:8,min:30,cost:240,supplier:'Electro Luanda'},{id:'CAN-TOR-016',name:'Torneira de cozinha',unit:'un.',qty:3,min:10,cost:18500,supplier:'Casa das Obras'},{id:'CLI-FIL-012',name:'Filtro AC 12.000 BTU',unit:'un.',qty:1,min:4,cost:12800,supplier:'ClimaTech'},{id:'MAN-FIT-001',name:'Fita isoladora profissional',unit:'un.',qty:28,min:12,cost:480,supplier:'Electro Luanda'}],
invoices:[{id:'FT 2026/0089',client:'Condomínio Horizonte',amount:180000,due:'Vencida há 4 dias',state:'VENCIDA',paid:false},{id:'FT 2026/0091',client:'Casa Sabor',amount:140000,due:'Vence hoje',state:'VENCE HOJE',paid:false}],
records:{purchases:[{name:'Reposição de cabos eléctricos',status:'Aguardando aprovação',date:'Hoje',amount:'Kz 82.000'}],suppliers:[{name:'Electro Luanda',status:'Activo',date:'Última compra: 28 Ago',amount:'Kz 340.000'}],assets:[{name:'Gerador 12 KVA',status:'Operacional',date:'Condomínio Horizonte',amount:'QR activo'}],fleet:[{name:'LD-45-98-AB · Toyota Hilux',status:'Operacional',date:'Próxima revisão: 14 Set',amount:'18.430 km'}],hr:[{name:'João Manuel',status:'Em serviço',date:'Electricista',amount:'Presença confirmada'}],documents:[{name:'Contrato · Condomínio Horizonte',status:'Válido',date:'Expira em 12 meses',amount:'PDF'}],audit:[{name:'Amélia M. atribuiu a OS FIXE-2026-0187',status:'Auditado',date:'Hoje, 08:12',amount:'Ordens de serviço'}]}}
let db;try{db=JSON.parse(localStorage.getItem(STORE))||structuredClone(seed)}catch{db=structuredClone(seed)}
if(!db.clients)db.clients=[{name:'Condomínio Horizonte',nif:'5410028791',type:'Condomínio',phone:'+244 923 456 781',last:'Hoje · FIXE-0187',classify:'VIP',status:'Activo'},{name:'Maria da Conceição',nif:'Particular',type:'Particular',phone:'+244 931 201 984',last:'28 Ago · FIXE-0172',classify:'Recorrente',status:'Activo'},{name:'Clínica Vida',nif:'5001234567',type:'Empresa',phone:'+244 222 030 150',last:'26 Ago · FIXE-0169',classify:'Novo',status:'Activo'}];
if(!db.teams)db.teams=['Electricistas','Canalizadores','Climatização','Manutenção geral','Pintura'];
if(!db.employees)db.employees=[{name:'João Manuel',role:'Electricista',team:'Electricistas',phone:'+244 923 010 245',state:'No local'},{name:'Paulo António',role:'Canalizador',team:'Canalizadores',phone:'+244 923 112 392',state:'Em deslocação'},{name:'Carla Mendes',role:'Técnica de climatização',team:'Climatização',phone:'+244 923 224 870',state:'Disponível'},{name:'Ana Lemos',role:'Técnica geral',team:'Manutenção geral',phone:'+244 923 340 095',state:'Disponível'}];
const save=()=>localStorage.setItem(STORE,JSON.stringify(db));
const cls=s=>({'Em execução':'execution','Agendada':'available','Atrasada':'delayed','No local':'execution','Em deslocação':'transit'}[s]||'available');
const badge=p=>`<span class="badge ${p==='SOS'||p==='Urgente'?'red-badge':p==='Alta'?'gold':''}">${p}</span>`;
function toast(msg){const t=document.getElementById('toast');document.getElementById('toastText').textContent=msg;t.classList.add('show');clearTimeout(window.tt);window.tt=setTimeout(()=>t.classList.remove('show'),3200)}
function log(msg,module='Operações'){db.records.audit.unshift({name:msg,status:'Auditado',date:'Agora mesmo',amount:module});save()}
function switchView(view,module){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));document.querySelectorAll('.nav-item').forEach(b=>b.classList.remove('active'));document.getElementById(view)?.classList.add('active-view');document.querySelector(`.nav-item[data-view="${view}"]${module?`[data-module="${module}"]`:''}`)?.classList.add('active');if(view==='registry')renderRegistry(module||'purchases');window.scrollTo({top:0,behavior:'smooth'});document.getElementById('sidebar').classList.remove('open')}
function renderOrders(filter='all'){const list=filter==='all'?db.orders:db.orders.filter(o=>o.state===filter);document.getElementById('ordersTable').innerHTML=list.map(o=>`<tr><td><strong>${o.id}</strong></td><td><strong>${o.client}</strong><small>${o.place}</small></td><td>${o.service}</td><td>${o.tech}</td><td>${o.time}</td><td>${badge(o.priority)}</td><td><span class="status ${cls(o.state)}">${o.state}</span></td><td><button class="small-btn" data-order="${o.id}">Ver</button></td></tr>`).join('');document.getElementById('allOrderCount').textContent=db.orders.length;document.getElementById('ordersNavCount').textContent=db.orders.length;document.getElementById('lateOrders').textContent=`${db.orders.filter(o=>o.state==='Atrasada').length} ordens atrasadas`}
function renderRecent(){document.getElementById('recentOrders').innerHTML=db.orders.slice(0,4).map(o=>`<div class="order-preview"><div class="order-number">${o.id.slice(-4)}</div><div><strong>${o.client}</strong><small>${o.service} · ${o.time}</small></div><div><small>${o.tech}</small></div><span class="status ${cls(o.state)}">${o.state}</span></div>`).join('')}
function renderStock(query=''){const list=db.stock.filter(s=>Object.values(s).join(' ').toLowerCase().includes(query.toLowerCase()));document.getElementById('lowStockMetric').textContent=db.stock.filter(s=>s.qty<=s.min).length;document.getElementById('stockValue').textContent=fmt(db.stock.reduce((x,s)=>x+s.qty*s.cost,0));document.getElementById('stockTable').innerHTML=list.map(s=>`<tr><td><strong>${s.name}</strong></td><td>${s.id}</td><td>Principal</td><td><span class="${s.qty<=s.min/2?'stock-critical':s.qty<=s.min?'stock-low':''}">${s.qty} ${s.unit}</span></td><td>${s.min} ${s.unit}</td><td>${s.supplier}</td><td><button class="small-btn" data-restock="${s.id}">Repor</button></td></tr>`).join('')||'<tr><td colspan="7">Nenhum material encontrado.</td></tr>'}
function renderClients(query=''){const list=db.clients.filter(c=>Object.values(c).join(' ').toLowerCase().includes(query.toLowerCase()));document.getElementById('clientsTable').innerHTML=list.map((c,n)=>`<tr><td><strong>${c.name}</strong><small>${c.nif==='Particular'?'Particular':'NIF '+c.nif}</small></td><td>${c.type}</td><td>${c.phone}</td><td>${c.last}</td><td><span class="badge ${c.classify==='VIP'?'gold':c.classify==='Recorrente'?'blue-badge':''}">${c.classify}</span></td><td><span class="badge green-badge">${c.status}</span></td><td><button class="small-btn" data-client="${n}">Ver</button></td></tr>`).join('')||'<tr><td colspan="7">Nenhum cliente encontrado.</td></tr>';document.getElementById('activeClients').textContent=248+db.clients.filter(c=>c.status==='Activo').length-3;document.getElementById('recurringClients').textContent=36+db.clients.filter(c=>c.classify==='Recorrente').length-1;document.getElementById('leadClients').textContent=18+db.clients.filter(c=>c.classify==='Lead').length}
function renderTeam(){const available=db.employees.filter(e=>e.state==='Disponível').length,field=db.employees.filter(e=>e.state==='No local'||e.state==='Em deslocação').length;document.getElementById('teamCount').textContent=db.teams.length;document.getElementById('availableTechs').textContent=available;document.getElementById('fieldTechs').textContent=field;document.getElementById('teamSummary').textContent=`${db.employees.length} colaboradores · ${available} disponíveis · ${field} no terreno.`;document.getElementById('employeesTable').innerHTML=db.employees.map((e,n)=>`<tr><td><strong>${e.name}</strong></td><td>${e.role}</td><td>${e.team}</td><td>${e.phone}</td><td><span class="status ${cls(e.state)}">${e.state}</span></td><td><button class="small-btn" data-employee="${n}">Actualizar</button></td></tr>`).join('')}
function renderFinance(){document.getElementById('invoicedMetric').textContent=fmt(db.invoices.reduce((x,i)=>x+i.amount,5420000));document.getElementById('receivedMetric').textContent=fmt(db.invoices.filter(i=>i.paid).reduce((x,i)=>x+i.amount,4180000));document.getElementById('receivables').innerHTML=db.invoices.filter(i=>!i.paid).map(i=>`<div class="receivable"><div><span class="badge ${i.state==='VENCIDA'?'red-badge':'gold'}">${i.state}</span><strong>${i.id} · ${fmt(i.amount)}</strong><small>${i.client} · ${i.due}</small></div><button class="small-btn" data-pay="${i.id}">Registar pagamento</button></div>`).join('')||'<p class="muted">Não existem facturas em aberto.</p>'}
function renderRegistry(module){const m={purchases:['COMPRAS','Compras','Requisições, aprovações, pedidos e recepção de materiais.'],suppliers:['FORNECEDORES','Fornecedores','Cadastro, desempenho e histórico de compras.'],assets:['ACTIVOS','Equipamentos','Equipamentos, QR Code e histórico de manutenção.'],fleet:['FROTA','Viaturas','Quilometragem, manutenção, seguro e custos.'],hr:['RECURSOS HUMANOS','RH e presenças','Colaboradores, assiduidade, férias e documentos.'],documents:['DOCUMENTAL','Documentos','Ficheiros ligados a clientes, contratos e colaboradores.'],audit:['SEGURANÇA','Auditoria','Registo imutável de acções relevantes no sistema.']}[module];window.currentModule=module;document.getElementById('registryEyebrow').textContent=m[0];document.getElementById('registryTitle').textContent=m[1];document.getElementById('registrySubtitle').textContent=m[2];document.getElementById('registryTableTitle').textContent=`${m[1]} recentes`;document.getElementById('registryCreate').textContent=module==='audit'?'Exportar auditoria':'＋ Novo registo';document.getElementById('registryHead').innerHTML='<tr><th>REGISTO</th><th>ESTADO</th><th>DETALHE</th><th>REFERÊNCIA</th><th></th></tr>';document.getElementById('registryBody').innerHTML=db.records[module].map((r,n)=>`<tr><td><strong>${r.name}</strong></td><td><span class="badge ${/Activo|Operacional|Válido/.test(r.status)?'green-badge':''}">${r.status}</span></td><td>${r.date}</td><td>${r.amount}</td><td>${module==='audit'?'':`<button class="small-btn" data-record="${n}">Ver</button>`}</td></tr>`).join('')}
function flow(html){document.getElementById('flowModal').innerHTML=`<button class="modal-close" type="button" data-close>×</button>${html}`;document.getElementById('flowBackdrop').classList.add('open')}
function closeFlow(){document.getElementById('flowBackdrop').classList.remove('open')}
function openOrder(){document.getElementById('modalBackdrop').classList.add('open');document.getElementById('formClient').focus()}
function detail(o){flow(`<p class="eyebrow">${o.id}</p><h2>${o.client}</h2><p class="muted">${o.service} · ${o.place}</p><div class="workflow-status"><span class="status ${cls(o.state)}">${o.state}</span>${badge(o.priority)}</div><p class="detail-line"><b>Técnico:</b> ${o.tech}</p><p class="detail-line"><b>Materiais:</b> ${o.materials.length?o.materials.join(', '):'Sem materiais registados'}</p><div class="modal-actions"><button class="btn secondary" data-assign="${o.id}">Atribuir técnico</button><button class="btn secondary" data-material="${o.id}">Consumir material</button><button class="btn primary" data-progress="${o.id}">${o.state==='Concluída'?'Gerar factura':'Avançar estado'}</button></div>`) }
function incident(){flow(`<form id="incidentForm"><p class="eyebrow">NOVA OCORRÊNCIA</p><h2>Registar pedido</h2><label>Cliente<input required name="client" placeholder="Nome do cliente"></label><label>Local<input required name="place" placeholder="Morada ou imóvel"></label><label>Tipo / problema<input required name="title" placeholder="Ex.: Fuga de água"></label><label>Prioridade<select name="priority"><option>Normal</option><option>Alta</option><option>Urgente</option><option>SOS</option></select></label><label>Origem<select name="source"><option>Chamada telefónica</option><option>WhatsApp</option><option>Portal do cliente</option><option>Técnico</option></select></label><button class="btn primary" type="submit">Criar ocorrência e OS</button></form>`) }
function stockForm(stockId){const s=db.stock.find(x=>x.id===stockId);window.stockTarget=stockId;flow(`<form id="stockForm"><p class="eyebrow">MOVIMENTO DE STOCK</p><h2>${s?'Repor '+s.name:'Entrada de material'}</h2><label>Produto<input required name="name" value="${s?s.name:''}" placeholder="Produto"></label><label>Quantidade<input required type="number" min="1" name="qty" placeholder="Quantidade"></label><label>Fornecedor<input required name="supplier" value="${s?s.supplier:''}" placeholder="Fornecedor"></label><button class="btn primary">Registar entrada</button></form>`) }
function invoiceForm(){flow(`<form id="invoiceForm"><p class="eyebrow">NOVA FACTURA</p><h2>Emitir factura</h2><label>Cliente<input required name="client" placeholder="Nome do cliente"></label><label>Valor (Kz)<input required type="number" min="1" name="amount" placeholder="0"></label><label>Vencimento<select name="due"><option>Vence em 7 dias</option><option>Vence em 15 dias</option><option>Pagamento imediato</option></select></label><button class="btn primary">Emitir factura</button></form>`) }
function clientForm(){flow(`<form id="clientForm"><p class="eyebrow">NOVO CLIENTE</p><h2>Criar cliente</h2><label>Nome / nome comercial<input required name="name" placeholder="Nome do cliente"></label><label>Tipo<select name="type"><option>Particular</option><option>Empresa</option><option>Condomínio</option><option>Instituição</option></select></label><label>Telefone / WhatsApp<input required name="phone" placeholder="+244 9xx xxx xxx"></label><label>NIF<input name="nif" placeholder="NIF (opcional para particular)"></label><label>Classificação<select name="classify"><option>Novo</option><option>Lead</option><option>Activo</option><option>Recorrente</option><option>VIP</option></select></label><button class="btn primary">Guardar cliente</button></form>`) }
function employeeForm(){flow(`<form id="employeeForm"><p class="eyebrow">NOVO COLABORADOR</p><h2>Adicionar à equipa</h2><label>Nome completo<input required name="name" placeholder="Nome do colaborador"></label><label>Função<input required name="role" placeholder="Ex.: Electricista"></label><label>Equipa<select name="team">${db.teams.map(t=>`<option>${t}</option>`).join('')}</select></label><label>Telefone<input required name="phone" placeholder="+244 9xx xxx xxx"></label><label>Estado<select name="state"><option>Disponível</option><option>Em deslocação</option><option>No local</option><option>Offline</option></select></label><button class="btn primary">Criar colaborador</button></form>`) }
function teamForm(){flow(`<form id="teamForm"><p class="eyebrow">NOVA EQUIPA</p><h2>Criar equipa técnica</h2><label>Nome da equipa<input required name="name" placeholder="Ex.: Brigada SOS Norte"></label><label>Especialidade<input required name="specialty" placeholder="Ex.: Electricidade"></label><button class="btn primary">Criar equipa</button></form>`) }
function registryForm(){flow(`<form id="registryForm"><p class="eyebrow">${document.getElementById('registryTitle').textContent.toUpperCase()}</p><h2>Novo registo</h2><label>Nome / descrição<input required name="name" placeholder="Descrição do registo"></label><label>Estado<select name="status"><option>Activo</option><option>Em análise</option><option>Operacional</option><option>Pendente</option></select></label><label>Detalhe<input required name="detail" placeholder="Responsável, data ou localização"></label><button class="btn primary">Guardar registo</button></form>`) }
function all(){renderOrders();renderRecent();renderStock();renderFinance();renderClients();renderTeam();if(document.getElementById('registry').classList.contains('active-view'))renderRegistry(window.currentModule||'purchases')}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view,b.dataset.module)));document.querySelectorAll('.pill').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.pill').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderOrders(b.dataset.filter)}));
document.getElementById('newOrder').onclick=openOrder;document.getElementById('newOrder2').onclick=openOrder;document.getElementById('newIncident').onclick=incident;document.getElementById('newIncident2').onclick=incident;document.getElementById('newClient').onclick=clientForm;document.getElementById('clientSearch').oninput=e=>renderClients(e.target.value);document.getElementById('newEmployee').onclick=employeeForm;document.getElementById('newTeam').onclick=teamForm;document.getElementById('mapOpen').onclick=()=>{document.getElementById('operationMap').hidden=false;document.getElementById('operationMap').scrollIntoView({behavior:'smooth'})};document.getElementById('mapClose').onclick=()=>document.getElementById('operationMap').hidden=true;document.getElementById('stockEntry').onclick=()=>stockForm();document.getElementById('newInvoice').onclick=invoiceForm;document.getElementById('createPurchaseRequest').onclick=()=>{switchView('registry','purchases');toast('Requisição de compra preparada.')};document.getElementById('registryCreate').onclick=()=>window.currentModule==='audit'?toast('Exportação preparada para integração com Excel/PDF.'):registryForm();
document.getElementById('modalClose').onclick=()=>document.getElementById('modalBackdrop').classList.remove('open');document.getElementById('modalBackdrop').onclick=e=>{if(e.target.id==='modalBackdrop')e.currentTarget.classList.remove('open')};document.getElementById('flowBackdrop').onclick=e=>{if(e.target.id==='flowBackdrop'||e.target.dataset.close!==undefined)closeFlow()};
document.getElementById('orderForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),o={id:code('FIXE',db.orders.length+12),client:f.get('client').trim(),place:'Local a confirmar',service:f.get('service'),tech:'Por atribuir',time:'Por agendar',priority:f.get('priority'),state:'Nova',materials:[]};db.orders.unshift(o);log(`Nova ${o.id} criada para ${o.client}.`);save();all();e.target.reset();document.getElementById('modalBackdrop').classList.remove('open');switchView('orders');toast(`Ordem ${o.id} criada.`)};
document.addEventListener('submit',e=>{if(e.target.id==='incidentForm'){e.preventDefault();const f=new FormData(e.target),o={id:code('FIXE',db.orders.length+12),client:f.get('client'),place:f.get('place'),service:f.get('title'),tech:'Por atribuir',time:'Triagem pendente',priority:f.get('priority'),state:'Nova',materials:[]};db.orders.unshift(o);log(`Ocorrência recebida via ${f.get('source')} e convertida em ${o.id}.`,'Ocorrências');save();all();closeFlow();switchView('orders');toast(`Ocorrência criada e ${o.id} gerada.`)}if(e.target.id==='clientForm'){e.preventDefault();const f=new FormData(e.target),c={name:f.get('name'),nif:f.get('nif')||'Particular',type:f.get('type'),phone:f.get('phone'),last:'Sem OS',classify:f.get('classify'),status:'Activo'};db.clients.unshift(c);log(`Novo cliente ${c.name} criado.`,'CRM');save();renderClients();closeFlow();toast(`Cliente ${c.name} criado com sucesso.`)}if(e.target.id==='employeeForm'){e.preventDefault();const f=new FormData(e.target),p={name:f.get('name'),role:f.get('role'),team:f.get('team'),phone:f.get('phone'),state:f.get('state')};db.employees.unshift(p);log(`Novo colaborador ${p.name} adicionado à equipa ${p.team}.`,'RH');save();renderTeam();closeFlow();toast(`Colaborador ${p.name} criado com sucesso.`)}if(e.target.id==='teamForm'){e.preventDefault();const f=new FormData(e.target),name=f.get('name');db.teams.push(name);log(`Nova equipa ${name} criada (${f.get('specialty')}).`,'Equipas');save();renderTeam();closeFlow();toast(`Equipa ${name} criada.`)}if(e.target.id==='stockForm'){e.preventDefault();const f=new FormData(e.target),q=Number(f.get('qty')),s=db.stock.find(x=>x.id===window.stockTarget)||db.stock.find(x=>x.name===f.get('name'));if(s)s.qty+=q;else db.stock.push({id:`MAT-${Date.now().toString().slice(-5)}`,name:f.get('name'),unit:'un.',qty:q,min:5,cost:0,supplier:f.get('supplier')});log(`Entrada de ${q} unidades de ${f.get('name')}.`,'Stock');save();all();closeFlow();toast('Entrada de stock registada.')}if(e.target.id==='invoiceForm'){e.preventDefault();const f=new FormData(e.target),i={id:`FT 2026/${String(92+db.invoices.length).padStart(4,'0')}`,client:f.get('client'),amount:Number(f.get('amount')),due:f.get('due'),state:'ABERTA',paid:false};db.invoices.unshift(i);log(`${i.id} emitida para ${i.client}.`,'Facturação');save();renderFinance();closeFlow();toast('Factura emitida e conta a receber criada.')}if(e.target.id==='registryForm'){e.preventDefault();const f=new FormData(e.target),m=window.currentModule;db.records[m].unshift({name:f.get('name'),status:f.get('status'),date:f.get('detail'),amount:'Criado agora'});log(`Novo registo adicionado em ${document.getElementById('registryTitle').textContent}.`,m);save();renderRegistry(m);closeFlow();toast('Registo guardado com sucesso.')}});
document.addEventListener('click',e=>{let o=db.orders.find(x=>x.id===e.target.dataset.order);if(o)detail(o);if(e.target.dataset.progress){o=db.orders.find(x=>x.id===e.target.dataset.progress);const steps=['Nova','Agendada','Atribuída','Em deslocação','No local','Em execução','Concluída'];o.state=steps[Math.min(steps.indexOf(o.state)+1,steps.length-1)];if(o.state==='Concluída'){const i={id:`FT 2026/${String(92+db.invoices.length).padStart(4,'0')}`,client:o.client,amount:75000,due:'Vence em 7 dias',state:'ABERTA',paid:false};db.invoices.unshift(i);toast('OS concluída e factura criada automaticamente.')}else toast(`OS actualizada para “${o.state}”.`);log(`Estado da ${o.id} actualizado para ${o.state}.`);save();all();closeFlow();detail(o)}if(e.target.dataset.assign){o=db.orders.find(x=>x.id===e.target.dataset.assign);o.tech='Carla Mendes';o.state='Atribuída';log(`Carla Mendes atribuída à ${o.id}.`);save();all();closeFlow();toast('Técnica atribuída e notificada.')}if(e.target.dataset.material){o=db.orders.find(x=>x.id===e.target.dataset.material);const s=db.stock.find(x=>x.qty>0);s.qty--;o.materials.push(`${s.name} (1 ${s.unit})`);log(`1 ${s.unit} de ${s.name} consumido na ${o.id}.`,'Stock');save();all();closeFlow();detail(o);toast('Material consumido; stock actualizado.')}if(e.target.dataset.restock)stockForm(e.target.dataset.restock);if(e.target.dataset.pay){const i=db.invoices.find(x=>x.id===e.target.dataset.pay);i.paid=true;i.state='PAGA';log(`Pagamento de ${i.id} registado.`,'Recebimentos');save();renderFinance();toast('Pagamento registado e factura marcada como paga.')}if(e.target.classList.contains('assign-incident'))incident()});
document.getElementById('menuBtn').onclick=()=>document.getElementById('sidebar').classList.toggle('open');document.getElementById('notificationBtn').onclick=()=>toast('Notificações: OS atrasadas, stock crítico e pagamento vencido.');document.getElementById('globalSearch').onkeydown=e=>{if(e.key==='Enter'){const q=e.target.value.trim().toLowerCase(),o=db.orders.find(x=>Object.values(x).join(' ').toLowerCase().includes(q));if(o){switchView('orders');toast(`Resultado: ${o.id} · ${o.client}`)}else toast('Nenhum resultado encontrado nos dados locais.')}};document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('globalSearch').focus()}});document.addEventListener('click',e=>{if(e.target.dataset.employee!==undefined){const n=Number(e.target.dataset.employee),p=db.employees[n];flow(`<form id="employeeStatusForm"><p class="eyebrow">COLABORADOR</p><h2>${p.name}</h2><label>Estado operacional<select name="state"><option ${p.state==='Disponível'?'selected':''}>Disponível</option><option ${p.state==='Em deslocação'?'selected':''}>Em deslocação</option><option ${p.state==='No local'?'selected':''}>No local</option><option ${p.state==='Offline'?'selected':''}>Offline</option></select></label><button class="btn primary">Actualizar estado</button></form>`);window.employeeTarget=n}});document.addEventListener('submit',e=>{if(e.target.id==='employeeStatusForm'){e.preventDefault();const p=db.employees[window.employeeTarget],state=new FormData(e.target).get('state');p.state=state;log(`Estado de ${p.name} actualizado para ${state}.`,'Equipas');save();renderTeam();closeFlow();toast('Estado operacional actualizado.')}});all();
// RECUPERAÇÃO DE PALAVRA-PASSE
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

if (forgotPasswordBtn) {
  forgotPasswordBtn.addEventListener('click', async () => {
    const emailInput = document.getElementById('loginEmail');
    const loginError = document.getElementById('loginError');

    const email = emailInput.value.trim();

    if (!email) {
      loginError.style.color = '#c00';
      loginError.textContent = 'Introduza primeiro o seu email.';
      emailInput.focus();
      return;
    }

    forgotPasswordBtn.disabled = true;
    forgotPasswordBtn.textContent = 'A enviar...';
    loginError.textContent = '';

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });

    if (error) {
      loginError.style.color = '#c00';
      loginError.textContent = 'Erro: ' + error.message;
    } else {
      loginError.style.color = '#16803c';
      loginError.textContent =
        'Email enviado. Verifique a sua caixa de entrada e o spam.';
    }

    forgotPasswordBtn.disabled = false;
    forgotPasswordBtn.textContent = 'Esqueci a palavra-passe';
  });
}
//
// RECUPERAÇÃO DE PALAVRA-PASSE
//

async function verificarRecuperacaoPassword() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    console.error('Erro ao verificar sessão:', error);
    return;
  }

  const session = data.session;

  // Verifica se estamos numa sessão de recuperação
  if (session && window.location.hash.includes('type=recovery')) {
    const loginScreen = document.getElementById('loginScreen');
    const loginForm = document.getElementById('loginForm');
    const resetScreen = document.getElementById('resetPasswordScreen');

    if (loginForm) loginForm.style.display = 'none';
    if (resetScreen) resetScreen.style.display = 'block';
    if (loginScreen) loginScreen.style.display = 'flex';

    console.log('Modo de recuperação de palavra-passe ativado.');
  }
}

verificarRecuperacaoPassword();


//
// DEFINIR NOVA PALAVRA-PASSE
//

const updatePasswordBtn = document.getElementById('updatePasswordBtn');

if (updatePasswordBtn) {
  updatePasswordBtn.addEventListener('click', async () => {

    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('resetPasswordMessage');

    message.textContent = '';

    if (password.length < 6) {
      message.style.color = '#c00';
      message.textContent =
        'A palavra-passe deve ter pelo menos 6 caracteres.';
      return;
    }

    if (password !== confirmPassword) {
      message.style.color = '#c00';
      message.textContent =
        'As palavras-passe não coincidem.';
      return;
    }

    updatePasswordBtn.disabled = true;
    updatePasswordBtn.textContent = 'A guardar...';

    const { error } = await supabaseClient.auth.updateUser({
      password: password
    });

    if (error) {
      console.error(error);
      message.style.color = '#c00';
      message.textContent =
        'Erro ao alterar a palavra-passe: ' + error.message;

      updatePasswordBtn.disabled = false;
      updatePasswordBtn.textContent =
        'DEFINIR NOVA PALAVRA-PASSE';

      return;
    }

    message.style.color = '#16803c';
    message.textContent =
      'Palavra-passe alterada com sucesso! A entrar no sistema...';

    setTimeout(() => {
      window.location.hash = '';
      window.location.reload();
    }, 1500);
  });
}
