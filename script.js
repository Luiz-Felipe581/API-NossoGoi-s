// ===== Configuração =====
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000/api/curiosidades'
  : 'https://api-nossogoias.onrender.com/api/curiosidades';
const CENTRO_GOIAS = [-15.95, -49.6];
const IBGE_GOIAS = "https://servicodados.ibge.gov.br/api/v3/malhas/estados/52?formato=application/vnd.geo+json";

// Usadas só se a curiosidade não tiver latitude/longitude no banco
const CIDADES = {
  "goiania":[-16.6869,-49.2648],"anapolis":[-16.3267,-48.9534],"pirenopolis":[-15.8517,-48.9594],
  "goias":[-15.9333,-50.14],"cidade de goias":[-15.9333,-50.14],"caldas novas":[-17.7441,-48.6246],
  "catalao":[-18.1656,-47.944],"rio verde":[-17.7923,-50.9192],"alto paraiso":[-14.1306,-47.5097],
  "chapada dos veadeiros":[-14.1306,-47.5097],"trindade":[-16.6519,-49.4934],"luziania":[-16.2527,-47.9503],
  "formosa":[-15.5405,-47.3341],"itumbiara":[-18.4091,-49.2159],"jatai":[-17.8814,-51.7144],
  "porangatu":[-13.4392,-49.1494],"aparecida de goiania":[-16.8198,-49.2469],"posse":[-14.0925,-46.3689],
  "corumba de goias":[-15.9236,-48.81],"niquelandia":[-14.4663,-48.4598],"morrinhos":[-17.7313,-49.1069],
  "ceres":[-15.3053,-49.5987],"cristalina":[-16.7684,-47.6137],"mineiros":[-17.5653,-52.5517]
};

// Se um dia o banco passar a ter "latitude" e "longitude", esses valores têm prioridade.
// "dir" (opcional) é o lado do rótulo: right (padrão), left, top ou bottom.
// Itens marcados com (~) não têm um único endereço: a posição é ilustrativa e pode ser trocada.
const POSICOES = {
  // Cultura
  1:  { lat: -15.8517, lng: -48.9594, dir: "left"   }, // Cavalhadas — Pirenópolis
  2:  { lat: -15.9333, lng: -50.1400 },                // Cidade de Goiás
  3:  { lat: -15.1000, lng: -49.3000 },                // Pequi (~ Cerrado goiano)
  4:  { lat: -16.0200, lng: -49.8100, dir: "left"   }, // Catira e Cururu (~ interior)
  5:  { lat: -15.9300, lng: -48.8500, dir: "bottom" }, // Festa do Divino — Pirenópolis
  21: { lat: -15.9400, lng: -50.1200 },                // Empadão — Cidade de Goiás
  22: { lat: -15.9236, lng: -48.8100 },                // Bernardo Élis — Corumbá de Goiás
  23: { lat: -17.7313, lng: -49.1069 },                // Folia de Reis (~ Morrinhos)
  24: { lat: -16.6055, lng: -49.2635 },                // Museu Antropológico UFG
  25: { lat: -15.9400, lng: -50.1500, dir: "left"   }, // Cerâmica — Cidade de Goiás
  26: { lat: -15.9290, lng: -50.1330, dir: "top"    }, // Fogaréu — Cidade de Goiás
  27: { lat: -18.1656, lng: -47.9440 },                // Congada — Catalão
  28: { lat: -15.9335, lng: -50.1405, dir: "bottom" }, // Casa de Cora Coralina
  29: { lat: -13.7981, lng: -47.4570 },                // Quilombolas — Cavalcante (Kalunga)
  30: { lat: -16.6700, lng: -49.2680, dir: "left"   }, // Feira Hippie — Setor Campinas
  // Ciência
  6:  { lat: -17.7441, lng: -48.6246 },                // Caldas Novas
  7:  { lat: -14.1306, lng: -47.5097 },                // Cerrado — Chapada dos Veadeiros
  8:  { lat: -16.4886, lng: -49.3095, dir: "left"   }, // Embrapa — Santo Antônio de Goiás
  9:  { lat: -16.6020, lng: -49.2650 },                // UFG — Campus Samambaia
  10: { lat: -15.7600, lng: -48.8200, dir: "top"    }, // Serra dos Pireneus
  11: { lat: -13.0356, lng: -46.7742 },                // Chaminés de Fada — Campos Belos
  12: { lat: -17.8050, lng: -50.9100 },                // Cebio — IF Goiano Rio Verde
  13: { lat: -16.2527, lng: -47.9503 },                // Rã-de-vidro — Luziânia
  14: { lat: -17.5000, lng: -51.0000 },                // Fósseis de megafauna (~ sudoeste)
  15: { lat: -17.3000, lng: -50.6000, dir: "left"   }, // Águas subterrâneas (~ Guarani, sudoeste)
  16: { lat: -16.5990, lng: -49.2670, dir: "left"   }, // Observatório UFG
  17: { lat: -16.6790, lng: -49.2450 },                // Plantas medicinais — UFG (Goiânia)
  18: { lat: -16.6686, lng: -49.2420 },                // IPTSP — UFG
  19: { lat: -16.6040, lng: -49.2620, dir: "bottom" }, // Paleontologia UFG
  20: { lat: -14.9239, lng: -51.0753 },                // Rio Araguaia — Aruanã
  // Tecnologia
  31: { lat: -16.6700, lng: -49.2300 },                // DI.IA — Setor Leste Universitário
  32: { lat: -16.6008, lng: -49.2645, dir: "top"    }, // Ceia-UFG
  33: { lat: -16.6680, lng: -49.2310, dir: "bottom" }, // Semantix — DI.IA
  34: { lat: -16.6900, lng: -49.2600 },                // Supercomputadores Nvidia — Goiânia
  35: { lat: -16.5995, lng: -49.2640 },                // Bacharelado em IA — UFG
  36: { lat: -16.6799, lng: -49.2550 },                // Lei de IA — Goiânia
  37: { lat: -16.7050, lng: -49.2700 },                // Sou AgroSoluções — Goiânia
  38: { lat: -16.6980, lng: -49.2420 },                // WiMilk — Goiânia
  39: { lat: -17.8000, lng: -50.9000, dir: "bottom" }, // XR Seeds — Rio Verde
  40: { lat: -16.7100, lng: -49.2300 },                // Cilia — Goiânia
  41: { lat: -16.6750, lng: -49.2500 },                // RBC — Goiânia
  42: { lat: -16.6010, lng: -49.2630, dir: "left"   }, // Museu de Informática UFG
  43: { lat: -16.7000, lng: -49.2850, dir: "left"   }, // Tecnologias imersivas — Goiânia
  44: { lat: -15.4528, lng: -47.6086 },                // Sítio arqueológico — Planaltina de Goiás
  45: { lat: -16.7250, lng: -49.2550 }                 // Hub Goiás — Goiânia
};

// ===== Utilidades =====
const semAcento = s => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const $ = id => document.getElementById(id);
const pick = (obj, chaves) => { for (const k of chaves) if (obj[k] != null && obj[k] !== "") return obj[k]; return ""; };

function categoria(txt) {
  const t = semAcento(txt);
  if (t.includes("cienc")) return "ciencia";
  if (t.includes("cultur")) return "cultura";
  if (t.includes("tecnolog")) return "tecnologia";
  return "outra";
}
const NOMES = { ciencia: "Ciência", cultura: "Cultura", tecnologia: "Tecnologia", outra: "Curiosidade" };

// Aceita vários formatos de resposta/nomes de campos da API
function normalizar(lista) {
  const itens = Array.isArray(lista) ? lista : (lista.dados || lista.data || lista.curiosidades || lista.results || []);
  return itens.map((it, i) => {
    const titulo = pick(it, ["titulo", "title", "nome", "name"]);
    const cidade = pick(it, ["cidade", "municipio", "local", "localizacao"]);
    let lat = parseFloat(pick(it, ["latitude", "lat"]));
    let lng = parseFloat(pick(it, ["longitude", "lng", "lon", "long"]));
    const pos = POSICOES[it.id];
    if ((isNaN(lat) || isNaN(lng)) && pos) { lat = pos.lat; lng = pos.lng; }
    if (isNaN(lat) || isNaN(lng)) {
      const alvo = semAcento(cidade + " " + titulo);
      const achada = Object.keys(CIDADES).find(c => alvo.includes(c));
      if (achada) [lat, lng] = CIDADES[achada];
      else { // espalha em espiral ao redor do centro, sempre na mesma posição para o mesmo item
        const ang = i * 2.399, raio = 0.35 + 0.18 * Math.sqrt(i);
        lat = CENTRO_GOIAS[0] + Math.sin(ang) * raio;
        lng = CENTRO_GOIAS[1] + Math.cos(ang) * raio;
      }
    }
    return {
      id: it.id ?? i, titulo: titulo || "Sem título",
      descricao: String(pick(it, ["descricao", "description", "texto", "conteudo", "detalhes"]) || "Sem descrição.").replace(/\[reference:\d+\]/g, "").trim(),
      cat: categoria(pick(it, ["categoria", "tipo", "area", "tema", "category"])),
      cidade, lat, lng, dir: pos?.dir || "right"
    };
  });
}

// ===== Mapa =====
const mapa = L.map("mapa", { zoomControl: false, minZoom: 5, maxZoom: 12, zoomSnap: .25 }).setView(CENTRO_GOIAS, 6.5);
L.control.zoom({ position: "bottomleft" }).addTo(mapa);
// Mapa base topográfico (Esri): colorido, com relevo e sem chave de API
L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Mapa: Esri, USGS, NOAA · Contorno: IBGE",
  maxZoom: 13
}).addTo(mapa);

fetch(IBGE_GOIAS)
  .then(r => r.json())
  .then(geo => {
    // Escurece levemente tudo que está fora de Goiás, para o estado ganhar destaque
    const geom = (geo.features ? geo.features[0].geometry : (geo.geometry || geo));
    const poligonos = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
    const buracos = poligonos.mapa(p => L.GeoJSON.coordsToLatLngs(p[0], 0));
    const mundo = [[-89, -180], [-89, 180], [89, 180], [89, -180]];
    L.polygon([mundo, ...buracos], { stroke: false, fillColor: "#14302B", fillOpacity: .35, interactive: false }).addTo(mapa);
    
    const contorno = L.geoJSON(geo, { style: { color: "#14302B", weight: 3, fill: false }, interactive: false }).addTo(mapa);
    const limites = contorno.getBounds();
    mapa.fitBounds(limites, { padding: [30, 30] });
    mapa.setMaxBounds(limites.pad(0.6));

    // Garante que o Leaflet recalcule o tamanho correto no celular
    setTimeout(() => {
      mapa.invalidateSize();
    }, 250);

  })
  .catch(err => console.error("Erro ao carregar o contorno do IBGE:", err));

// ===== Cartão de descrição =====
const cartao = $("cartao");
let marcadorSel = null;
function abrir(c, marcador, centralizar = false) {
  if (marcadorSel) marcadorSel.getElement()?.classList.remove("sel");
  marcadorSel = marcador; marcador.getElement()?.classList.add("sel");
  $("cartao-meta").innerHTML = `<i class="ponto c-${c.cat}"></i>${NOMES[c.cat]}${c.cidade ? " · " + c.cidade : ""}`;
  $("cartao-titulo").textContent = c.titulo;
  $("cartao-texto").textContent = c.descricao;
  cartao.dataset.cat = c.cat;
  cartao.hidden = false;
  // No toque/clique, afasta o pino da área coberta pelo cartão e pelo painel de filtros
  if (centralizar) mapa.panInside([c.lat, c.lng], { paddingTopLeft: [40, 130], paddingBottomRight: [40, 280] });
}
function fecharCartao() {
  cartao.hidden = true;
  if (marcadorSel) marcadorSel.getElement()?.classList.remove("sel");
  marcadorSel = null;
}
$("fechar").addEventListener("click", fecharCartao);
mapa.on("click", fecharCartao);
document.addEventListener("keydown", e => { if (e.key === "Escape") fecharCartao(); });

// ===== Marcadores e filtros =====
// Pinos muito próximos se agrupam em um círculo com a quantidade; ao dar zoom eles se separam.
const DESLOC = { right: [8, -8], left: [-8, -8], top: [0, -20], bottom: [0, 4] };
const grupo = L.markerClusterGroup({
  maxClusterRadius: 42,
  showCoverageOnHover: false,
  spiderfyOnMaxZoom: true,
  iconCreateFunction: cluster => L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`, className: "agrupa", iconSize: [36, 36]
  })
});
mapa.addLayer(grupo);

function desenhar(dados, filtro = "todas") {
  grupo.clearLayers();
  const visiveis = dados.filter(c => filtro === "todas" || c.cat === filtro);
  const pinos = visiveis.map(c => {
    const icone = L.divIcon({ className: "", html: `<div class="pino c-${c.cat}"></div>`, iconSize: [18, 18], iconAnchor: [9, 18] });
    const m = L.marker([c.lat, c.lng], { icon: icone, keyboard: true, title: c.titulo, riseOnHover: true });
    m.bindTooltip(c.titulo, { permanent: true, direction: c.dir, offset: DESLOC[c.dir], className: "rotulo" });
    m.on("mouseover", () => abrir(c, m)); // computador: passar o mouse
    m.on("click", e => { L.DomEvent.stopPropagation(e); abrir(c, m, true); }); // celular: tocar
    m.on("add", () => { // teclado: Tab chega ao pino e abre a descrição
      const el = m.getElement();
      if (el && !el.dataset.foco) { el.dataset.foco = "1"; el.addEventListener("focus", () => abrir(c, m)); }
    });
    return m;
  });
  grupo.addLayers(pinos);
  $("contagem").textContent = visiveis.length
    ? `${visiveis.length} ${visiveis.length === 1 ? "curiosidade" : "curiosidades"} no mapa`
    : "Nenhuma curiosidade neste tema.";
}

// ===== Carregar da API =====
const aviso = $("aviso");
async function carregar() {
  aviso.hidden = true;
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const dados = normalizar(await resp.json());
    desenhar(dados);
    $("filtros").addEventListener("click", e => {
      const b = e.target.closest(".filtro"); if (!b) return;
      document.querySelectorAll(".filtro").forEach(x => x.classList.toggle("ativo", x === b));
      fecharCartao();
      desenhar(dados, b.dataset.cat);
    });
  } catch (erro) {
    console.error(erro);
    $("contagem").textContent = "Não foi possível carregar as curiosidades.";
    aviso.innerHTML = `<h3>A API não respondeu</h3>
      <p>Confira se o servidor está rodando em <code>${API_URL}</code> e se o CORS está liberado (<code>app.use(cors())</code>).</p>
      <button id="tentar">Tentar de novo</button>`;
    aviso.hidden = false;
    $("tentar").addEventListener("click", carregar);
  }
}
carregar();
