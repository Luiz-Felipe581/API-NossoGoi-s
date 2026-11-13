const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.json());

// ===== BASE DE DADOS (array de objetos) =====
const curiosidades = [
  {
    id: 1,
    categoria: "Cultura",
    titulo: "Cavalhadas de Pirenópolis",
    descricao:
      "Realizada há mais de 200 anos durante a Festa do Divino Espírito Santo, a Cavalhada encena a batalha entre mouros e cristãos em um torneio a cavalo. Os personagens usam trajes coloridos e os 'mascarados' percorrem as ruas em cavalos enfeitados."
  },
  {
    id: 2,
    categoria: "Cultura",
    titulo: "Cidade de Goiás — Patrimônio Mundial da UNESCO",
    descricao:
      "Fundada em 1727 como Vila Boa, foi a primeira capital do estado. Seu centro histórico colonial, com casarões, igrejas e ruas de pedra, foi declarado Patrimônio Cultural da Humanidade pela UNESCO em 2001."
  },
  {
    id: 3,
    categoria: "Cultura",
    titulo: "Pequi, o fruto símbolo do Cerrado",
    descricao:
      "Usado no tradicional arroz com pequi, o fruto é tão importante para a cultura goiana que existe uma legislação estadual específica sobre seu consumo e preservação. Seu caroço possui espinhos que exigem cuidado ao ser roído."
  },
  {
    id: 4,
    categoria: "Cultura",
    titulo: "Catira e Cururu — danças tradicionais goianas",
    descricao:
      "A catira é uma dança de palmas e sapateado ao som da viola caipira, geralmente executada por homens. O cururu é um desafio cantado entre violeiros, com versos improvisados que exaltam a religiosidade e a vida no campo."
  },
  {
    id: 5,
    categoria: "Cultura",
    titulo: "Festa do Divino Espírito Santo",
    descricao:
      "Uma das festas religiosas mais tradicionais do Brasil, celebrada em Pirenópolis e em diversas cidades goianas. Inclui folias, cortejos, a coroação do Imperador do Divino e a Cavalhada, misturando fé e manifestações populares."
  },
  {
    id: 6,
    categoria: "Ciência",
    titulo: "Caldas Novas e as águas termais",
    descricao:
      "Uma das maiores estâncias hidrominerais do mundo. Suas águas brotam de aquíferos subterrâneos aquecidos pelo calor interno da Terra (energia geotérmica), atingindo temperaturas de até 50 °C e atraindo turistas e pesquisadores."
  },
  {
    id: 7,
    categoria: "Ciência",
    titulo: "Cerrado: a savana mais biodiversa do mundo",
    descricao:
      "O Cerrado ocupa grande parte de Goiás e é considerado a savana tropical com maior biodiversidade do planeta. É o 'berço das águas' do Brasil, abrigando nascentes de bacias como a do São Francisco, Tocantins e Paraná."
  },
  {
    id: 8,
    categoria: "Ciência",
    titulo: "Embrapa Arroz e Feijão — Santo Antônio de Goiás",
    descricao:
      "Unidade da Embrapa sediada em Goiás é referência mundial em pesquisa de arroz e feijão, desenvolvendo cultivares mais produtivas e resistentes a pragas e doenças, com impacto direto na segurança alimentar brasileira."
  },
  {
    id: 9,
    categoria: "Ciência",
    titulo: "Universidade Federal de Goiás (UFG)",
    descricao:
      "Fundada em 1960, é uma das principais instituições de ensino e pesquisa do Centro-Oeste. Destaca-se em estudos sobre biodiversidade do Cerrado, saúde pública, agronegócio e patrimônio histórico-cultural."
  },
  {
    id: 10,
    categoria: "Ciência",
    titulo: "Serra dos Pireneus",
    descricao:
      "Localizada entre Pirenópolis, Cocalzinho e Corumbá, possui picos de até 1.385 m. É um importante sítio geológico com formações de quartzito, vegetação típica de Cerrado e pinturas rupestres que datam de milhares de anos."
  },
  {
    id: 11,
    categoria: "Ciência",
    titulo: "Descoberta de 'Chaminés de Fada' no Cerrado",
    descricao: "Pesquisadores da UFG identificaram formações geológicas raras conhecidas como 'chaminés de fada' no nordeste de Goiás, na região de Campos Belos. Essas estruturas revelam detalhes importantes sobre a evolução do relevo e do patrimônio geológico do Cerrado."
  },
  {
    id: 12,
    categoria: "Ciência",
    titulo: "Bioinsumos goianos reconhecidos pela ONU",
    descricao: "O Centro de Excelência em Bioinsumos (Cebio), do IF Goiano, foi selecionado pela FAO (ONU) como 'Experiência Excepcional'. O projeto usa bacteriófagos e fungos para substituir defensivos químicos no combate a pragas, aproximando a ciência do produtor rural."
  },
  {
    id: 13,
    categoria: "Ciência",
    titulo: "Nova espécie de rã-de-vidro em Luziânia",
    descricao: "Batizada de Vitreorana micaelae, a rã tem pouco mais de 2 centímetros, é quase transparente e só canta durante chuvas fortes. A descoberta, feita por pesquisadores da PUC-GO, UFG e UnB, foi confirmada por meio de análises de DNA, morfologia e bioacústica."
  },
  {
    id: 14,
    categoria: "Ciência",
    titulo: "Fósseis de megafauna no solo goiano",
    descricao: "Escavações em Goiás já revelaram fósseis de animais pré-históricos, como preguiças-gigantes e tatus gigantes (gliptodontes). Esses achados ajudam os cientistas a entenderem como era o clima e a fauna do Brasil Central há milhares de anos."
  },
  {
    id: 15,
    categoria: "Ciência",
    titulo: "Estudos de águas subterrâneas no Cerrado",
    descricao: "Goiás abriga partes importantes do Aquífero Guarani e do Aquífero Bambuí. Pesquisadores da UFG e de outras instituições estudam a recarga dessas águas para garantir a sustentabilidade hídrica do estado, fundamental para a agricultura e o abastecimento urbano."
  },
    {
    id: 16,
    categoria: "Ciência",
    titulo: "Observatório Astronômico da UFG",
    descricao: "Localizado no Campus Samambaia, em Goiânia, o Observatório Astronômico da UFG é um dos mais importantes do Centro-Oeste. Ele realiza pesquisas em astrofísica e oferece sessões públicas de observação do céu, aproximando a ciência da população."
  },
  {
    id: 17,
    categoria: "Ciência",
    titulo: "Pesquisas com plantas medicinais do Cerrado",
    descricao: "Universidades goianas, como a UFG e o IFG, mantêm linhas de pesquisa focadas no potencial farmacológico de plantas do Cerrado, como o barbatimão e o murici. Os estudos buscam validar cientificamente o uso tradicional dessas plantas para criar novos medicamentos."
  },
  {
    id: 18,
    categoria: "Ciência",
    titulo: "Instituto de Patologia Tropical e Saúde Pública (IPTSP)",
    descricao: "Ligado à UFG, o IPTSP é uma referência nacional em pesquisas sobre doenças tropicais negligenciadas, como dengue, malária e leishmaniose. O instituto desenvolve estudos fundamentais para o controle de vetores e o desenvolvimento de novas abordagens terapêuticas."
  },
  {
    id: 19,
    categoria: "Ciência",
    titulo: "Laboratório de Paleontologia da UFG",
    descricao: "O laboratório abriga fósseis de animais pré-históricos encontrados em território goiano, como preguiças-gigantes e tatus fósseis. As pesquisas ajudam a reconstruir o ecossistema do Cerrado há milhares de anos e a entender as mudanças climáticas da região."
  },
  {
    id: 20,
    categoria: "Ciência",
    titulo: "Estudos de conservação do rio Araguaia",
    descricao: "Pesquisadores de Goiás atuam fortemente em projetos de conservação do Rio Araguaia, um dos mais importantes do país. Os estudos monitoram a qualidade da água, a biodiversidade (como os botos e tartarugas) e os impactos das mudanças climáticas no ecossistema."
  },
  {
    id: 21,
    categoria: "Cultura",
    titulo: "O tradicional Empadão Goiano",
    descricao: "O empadão goiano é um dos pratos mais famosos da culinária do estado. Recheado com frango, carne, linguiça, queijo e às vezes pequi, ele foi criado na antiga capital (Cidade de Goiás) e é um símbolo da hospitalidade goiana."
  },
  {
    id: 22,
    categoria: "Cultura",
    titulo: "Bernardo Élis: o imortal goiano",
    descricao: "Nascido em Corumbá de Goiás, Bernardo Élis foi o primeiro escritor goiano a ocupar uma cadeira na Academia Brasileira de Letras (ABL). Suas obras, como 'O Tronco', retratam com maestria o homem do campo, os conflitos agrários e a cultura do interior de Goiás."
  },
  {
    id: 23,
    categoria: "Cultura",
    titulo: "Folia de Reis em Goiás",
    descricao: "Entre o Natal e o Dia de Reis (6 de janeiro), grupos de foliões percorrem as cidades e zonas rurais de Goiás. Vestidos com roupas coloridas e tocando violas, sanfonas e tambores, eles visitam as casas cantando versos religiosos e recebendo doações em nome dos Santos Reis."
  },
  {
    id: 24,
    categoria: "Cultura",
    titulo: "Museu Antropológico da UFG",
    descricao: "Fundado em 1969, o museu é um guardião da memória cultural e arqueológica de Goiás. Seu acervo conta com milhares de peças indígenas, achados arqueológicos e objetos que documentam a história dos povos originários e da formação da sociedade goiana."
  },
  {
    id: 25,
    categoria: "Cultura",
    titulo: "Artesanato em cerâmica de bichos do Cerrado",
    descricao: "A produção de cerâmica é uma forte expressão cultural em Goiás, especialmente na Cidade de Goiás e em regiões rurais. Artesãos modelam o barro para criar esculturas únicas de animais típicos do Cerrado, como tatus, tamanduás e aves, muitas vezes com pinturas naturais."
  },
  {
    id: 26,
    categoria: "Cultura",
    titulo: "Procissão do Fogaréu",
    descricao: "Realizada na Cidade de Goiás durante a Semana Santa, a procissão encena a prisão de Cristo por soldados romanos. Homens encapuzados (farricocos) percorrem as ruas históricas com tochas acesas à meia-noite, em uma das manifestações culturais mais emblemáticas de Goiás."
  },
  {
    id: 27,
    categoria: "Cultura",
    titulo: "Congada de Catalão",
    descricao: "Uma das festas afro-brasileiras mais antigas do estado. A Congada, realizada em louvor a Nossa Senhora do Rosário e a São Benedito, mistura danças, cantos e a coroação de reis, preservando a herança cultural africana e a religiosidade popular."
  },
  {
    id: 28,
    categoria: "Cultura",
    titulo: "Casa de Cora Coralina",
    descricao: "Localizada na Cidade de Goiás, a casa onde viveu a poetisa Ana Lins dos Guimarães Peixoto Bretas (Cora Coralina) foi transformada em museu. É um dos pontos culturais mais visitados do estado, celebrando a obra da doceira e poetisa que só publicou seu primeiro livro aos 75 anos."
  },
  {
    id: 29,
    categoria: "Cultura",
    titulo: "58 comunidades quilombolas reconhecidas",
    descricao: "Goiás possui 58 comunidades remanescentes de quilombos reconhecidas pela Fundação Cultural Palmares. Essas comunidades preservam tradições, saberes e modos de vida herdados de ancestrais africanos, sendo parte fundamental da identidade cultural goiana."
  },
  {
    id: 30,
    categoria: "Cultura",
    titulo: "Feira Hippie de Goiânia",
    descricao: "Criada em 1969, é considerada a maior feira a céu aberto da América Latina, reunindo artesanato, gastronomia e manifestações artísticas. Acontece todos os domingos no Setor Campinas e é um patrimônio cultural imaterial de Goiânia."
  },
  {
    id: 31,
    categoria: "Tecnologia",
    titulo: "Distrito de Inteligência Artificial de Goiás (DI.IA)",
    descricao: "Goiás lançou um distrito de IA com investimento de R$ 300 milhões em 91 hectares no Setor Leste Universitário, em Goiânia. O projeto prevê a atração de empresas de tecnologia, escolas e centros de pesquisa para consolidar o estado como referência nacional no setor.[reference:5]"
  },
  {
    id: 32,
    categoria: "Tecnologia",
    titulo: "Ceia-UFG: maior centro de IA da América Latina",
    descricao: "O Centro de Excelência em Inteligência Artificial da UFG já atraiu cerca de R$ 500 milhões em investimentos e mais de 5 mil empregos. Com mais de 100 empresas clientes, incluindo Google, Vivo e iFood, desenvolve soluções usadas por cerca de 150 milhões de pessoas no Brasil e no exterior.[reference:6]"
  },
  {
    id: 33,
    categoria: "Tecnologia",
    titulo: "Semantix: multinacional de dados em Goiás",
    descricao: "A Semantix, multinacional brasileira especializada em dados, analytics e IA, avaliada em cerca de US$ 1 bilhão, assinou memorando para ser a primeira empresa a se instalar no Distrito de Inovação e Inteligência Artificial de Goiás (DI.IA).[reference:7]"
  },
  {
    id: 34,
    categoria: "Tecnologia",
    titulo: "Primeiros supercomputadores da Nvidia na América Latina",
    descricao: "Goiás recebeu, em março, os primeiros oito supercomputadores de inteligência artificial da Nvidia na América Latina. Cada chip Blackwell B200 custa cerca de US$ 30 mil, e o investimento total de R$ 40 milhões foi viabilizado por meio de parcerias entre Fapeg e Embrapii.[reference:8]"
  },
  {
    id: 35,
    categoria: "Tecnologia",
    titulo: "Primeiro bacharelado em Inteligência Artificial do Brasil",
    descricao: "A UFG criou, em 2020, o primeiro curso de bacharelado em Inteligência Artificial do país. A iniciativa reforça o protagonismo de Goiás na formação de talentos para o setor de tecnologia e inovação.[reference:9]"
  },
  {
    id: 36,
    categoria: "Tecnologia",
    titulo: "Lei pioneira de IA no Brasil",
    descricao: "Goiás foi o primeiro estado brasileiro a aprovar uma lei específica para tratar do uso e desenvolvimento da inteligência artificial, criando um marco regulatório que estimula a inovação tecnológica no estado.[reference:10]"
  },
  {
    id: 37,
    categoria: "Tecnologia",
    titulo: "Sou AgroSoluções: gestão de royalties agrícolas",
    descricao: "Criada em 2018, em Goiânia, a agtech desenvolveu as plataformas SafraControl e AgroRoyalties. A empresa atende gigantes como Amaggi, Basf e AgroGalaxy e foi a primeira integrada via API ao sistema global da Bayer, gerenciando mais de R$ 1 bilhão em royalties por safra.[reference:11]"
  },
  {
    id: 38,
    categoria: "Tecnologia",
    titulo: "WiMilk: IA que previne doenças em vacas leiteiras",
    descricao: "Desenvolvida por estudantes da UEG, UFG e PUC Goiás, a startup WiMilk usa visão computacional e tags RFID para monitorar o comportamento de vacas 24h por dia. A IA detecta sinais de mastite subclínica e pode reduzir em até 60% o uso de antibióticos.[reference:12]"
  },
  {
    id: 39,
    categoria: "Tecnologia",
    titulo: "XR Seeds: IA no setor de sementes",
    descricao: "Fundada em 2020 e incubada no IF Goiano – Campus Rio Verde, a startup XR Seeds utiliza inteligência artificial para facilitar a rotina de empresas sementeiras, otimizando processos e melhorando a tomada de decisão no campo.[reference:13]"
  },
  {
    id: 40,
    categoria: "Tecnologia",
    titulo: "Cilia Tecnologia: referência em soluções automotivas",
    descricao: "Empresa goiana que se tornou referência nacional na criação de soluções digitais para o setor automotivo. Com apoio do Ceia-UFG, desenvolveu um sistema de aprendizado de máquina que reconhece amassados e quebras em veículos, automatizando orçamentos para seguradoras e oficinas.[reference:14]"
  },
  {
    id: 41,
    categoria: "Tecnologia",
    titulo: "RBC: pioneirismo em rádio FM em Goiás",
    descricao: "Quando surgiu em Goiás, na década de 1940, a Rádio Brasil Central (RBC) chamou atenção pelo uso pioneiro de transmissores de ondas curtas e de frequência modulada (FM) para criar links entre o estúdio e as equipes externas, inovando na comunicação do estado.[reference:15]"
  },
  {
    id: 42,
    categoria: "Tecnologia",
    titulo: "Museu de Informática e Computação da UFG",
    descricao: "O Museu de Informática e Computação da UFG preserva um acervo com exemplares de equipamentos antigos, mídias de entrada e saída de dados e manuais dos primeiros microcomputadores lançados no Brasil, documentando a evolução da tecnologia no país.[reference:16]"
  },
  {
    id: 43,
    categoria: "Tecnologia",
    titulo: "Tecnologias imersivas e realidade virtual",
    descricao: "Goiás é pioneiro no desenvolvimento de tecnologias imersivas, incluindo hologramas, robôs em tamanho real, realidade virtual, processamento de fala e inteligência artificial generativa, com produtos desenvolvidos em solo goiano.[reference:17]"
  },
  {
    id: 44,
    categoria: "Tecnologia",
    titulo: "Inovação tecnológica dos primeiros humanos no Brasil Central",
    descricao: "Pesquisa do Museu da UFG identificou diversidade morfológica e funcional em ferramentas líticas encontradas em sítio arqueológico goiano (GO-Ni.1 Caieira Barreiro, em Planaltina de Goiás), revelando que o povoamento inicial do Brasil Central tinha produção e inovação tecnológica mais complexa do que se pensava.[reference:18]"
  },
  {
    id: 45,
    categoria: "Tecnologia",
    titulo: "Hub Goiás e o ecossistema de startups",
    descricao: "O Hub Goiás leva inovação ao agro e a diversos setores, reunindo startups com soluções que vão desde Agrotech puro até ferramentas de transformação digital, Fintechs e EdTechs. O ecossistema goiano de inovação tem se consolidado como um dos mais dinâmicos do país.[reference:19]"
  }
];

// ===== ROTAS =====

// Raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Ciência & Cultura de Goiás',
    endpoints: {
      todasCuriosidades: '/api/curiosidades',
      porId: '/api/curiosidades/:id',
      filtrarPorCategoria: '/api/curiosidades?categoria=Cultura',
      categorias: '/api/categorias'
    }
  });
});

// Listar todas (com filtro opcional por categoria)
app.get('/api/curiosidades', (req, res) => {
  const { categoria } = req.query;

  if (categoria) {
    const filtradas = curiosidades.filter(
      c => c.categoria.toLowerCase() === categoria.toLowerCase()
    );
    return res.json({ total: filtradas.length, dados: filtradas });
  }

  res.json({ total: curiosidades.length, dados: curiosidades });
});

// Buscar por id
app.get('/api/curiosidades/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = curiosidades.find(c => c.id === id);

  if (!item) {
    return res.status(404).json({ erro: 'Curiosidade não encontrada' });
  }
  res.json(item);
});

// Listar categorias disponíveis
app.get('/api/categorias', (req, res) => {
  const categorias = [...new Set(curiosidades.map(c => c.categoria))];
  res.json(categorias);
});

// ===== START =====
app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
