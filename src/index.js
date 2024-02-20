const { gql, ApolloServer } = require('apollo-server');
const { QueryDocumentKeys } = require('graphql/language/ast');

//CREATE FAKE DATABASE
let laws = [
    {
      "titulo": "Lei de Lítigio de Asno (Lei de Burke)",
      "descricao": "A Lei de Lítigio de Asno, também conhecida como Lei de Burke, foi uma legislação promulgada na Inglaterra em 1330 durante o reinado de Eduardo III. Esta lei estipulava que os litígios envolvendo a posse de terras podiam ser resolvidos mediante um acordo mútuo, desde que ambas as partes cavalgassem em burros na presença de testemunhas. Se um burro se ajoelhasse durante o percurso, o litígio seria decidido a favor do outro partido.",
      "impacto": "Embora possa parecer uma prática estranha nos dias de hoje, a Lei de Lítigio de Asno foi uma tentativa de resolver disputas de terras de forma rápida e sem recorrer a litígios prolongados. No entanto, a eficácia dessa lei é questionável, pois dependia da natureza imprevisível dos burros.",
      "isFavorite": false
    },
    {
      "titulo": "Lei do Grande Pombo de Londres",
      "descricao": "A Lei do Grande Pombo de Londres foi promulgada em 1586 durante o reinado da Rainha Elizabeth I da Inglaterra. Esta lei proibia a construção de novos criadouros de pombos em Londres, devido à preocupação com o excesso de excrementos de pombo nas ruas da cidade. A legislação também impunha multas severas aos proprietários de criadouros de pombos existentes que não tomassem medidas para conter a superpopulação de aves.",
      "impacto": "Embora possa parecer uma preocupação trivial, a Lei do Grande Pombo de Londres reflete a importância da higiene pública e do controle de pragas na Londres do século XVI. O excesso de pombos representava um problema de saúde pública e também causava danos às propriedades devido à corrosão causada pelo ácido úrico presente nas fezes das aves.",
      "isFavorite": true
    },
    {
      "titulo": "Lei da Locomoção de Cavalo no Kentucky",
      "descricao": "A Lei da Locomoção de Cavalo no Kentucky foi promulgada em 1879 e proibia que qualquer pessoa conduzisse um cavalo a uma velocidade maior que 12 milhas por hora nas ruas da cidade. Esta lei foi uma resposta ao aumento da popularidade dos veículos motorizados, como carros e carruagens, que estavam causando preocupações com a segurança pública.",
      "impacto": "Embora inicialmente destinada a garantir a segurança nas ruas, a Lei da Locomoção de Cavalo no Kentucky acabou se tornando obsoleta com o avanço da tecnologia dos veículos motorizados. No entanto, ela permanece como um lembrete curioso dos primeiros dias da era dos transportes motorizados.",
      "isFavorite": false
    },
    {
      "titulo": "Lei do Espelho Quebrado",
      "descricao": "A Lei do Espelho Quebrado foi uma legislação peculiar promulgada na França em 1670 durante o reinado de Luís XIV. Esta lei estipulava que qualquer pessoa que quebrasse um espelho seria condenada a sete anos de azar, a menos que pagasse uma multa significativa como forma de compensação pelo azar causado.",
      "impacto": "Embora seja mais uma superstição do que uma lei efetiva, a Lei do Espelho Quebrado reflete a crença popular na época de que quebrar um espelho traria azar. Essa superstição persiste em muitas culturas até hoje, embora raramente resulte em penalidades legais.",
      "isFavorite": false
    },
    {
      "titulo": "Lei da Boa Ordem na Pensilvânia",
      "descricao": "A Lei da Boa Ordem na Pensilvânia foi promulgada em 1682 pelo fundador da Pensilvânia, William Penn. Esta lei proibia expressamente qualquer pessoa de espirrar ou assoar o nariz em público sob pena de multa. A legislação visava promover a higiene pública e manter as ruas limpas.",
      "impacto": "Embora pareça uma regulamentação extrema, a Lei da Boa Ordem na Pensilvânia reflete as preocupações com a saúde pública e a higiene pessoal no século XVII. Embora não seja mais aplicada, ela ilustra a evolução das normas sociais ao longo do tempo.",
      "isFavorite": true
    },
    {
      "titulo": "Lei do Controle de Chapéus na Rússia Imperial",
      "descricao": "A Lei do Controle de Chapéus na Rússia Imperial foi promulgada em 1731 durante o reinado de Ana da Rússia. Esta lei exigia que todos os homens usassem chapéus como parte de um esforço para modernizar a vestimenta masculina e promover uma imagem mais civilizada do país.",
      "impacto": "Embora possa parecer uma legislação trivial, a Lei do Controle de Chapéus na Rússia Imperial reflete os esforços dos governantes russos para ocidentalizar o país e adotar práticas europeias. No entanto, a aplicação rigorosa dessa lei também gerou ressentimento entre a população e provocou resistência.",
      "isFavorite": false
    },
    {
      "titulo": "Lei do Chicote em Massachusetts",
      "descricao": "A Lei do Chicote em Massachusetts foi promulgada em 1676 durante o período colonial. Esta lei exigia que qualquer pessoa que fosse pega jogando cartas, dados ou praticando qualquer forma de jogo de azar fosse chicoteada publicamente como forma de dissuasão.",
      "impacto": "Embora severa, a Lei do Chicote em Massachusetts reflete as atitudes puritanas em relação ao jogo e à moralidade durante o período colonial. No entanto, a eficácia dessa punição na prevenção do jogo ilegal é questionável, e a lei foi eventualmente revogada devido à oposição pública.",
      "isFavorite": false
    },
    {
      "titulo": "Lei da Proibição de Animação Japonesa",
      "descricao": "A Lei da Proibição de Animação Japonesa foi promulgada em 1925 durante o período Taisho no Japão. Esta lei proibia a exibição e produção de animações consideradas subversivas ou moralmente questionáveis, como forma de controlar a influência da mídia sobre a juventude japonesa.",
      "impacto": "Embora visasse proteger a moralidade pública, a Lei da Proibição de Animação Japonesa foi alvo de críticas por restringir a liberdade de expressão e limitar a criatividade dos artistas. A legislação foi posteriormente revogada, mas seu impacto no desenvolvimento da animação japonesa foi significativo.",
      "isFavorite": true
    },
    {
      "titulo": "Lei da Luneta na Inglaterra",
      "descricao": "A Lei da Luneta, promulgada em 1600 na Inglaterra, proibia o uso de lunetas em locais públicos. A legislação foi uma resposta à popularidade crescente das lunetas entre a classe alta, e os críticos argumentavam que o acessório encorajava a ociosidade e a indiscrição.",
      "impacto": "Embora pareça uma proibição arbitrária, a Lei da Luneta na Inglaterra reflete as preocupações sociais e culturais do período em relação à ostentação e à privacidade. A legislação foi eventualmente revogada à medida que as lunetas se tornaram mais comuns e aceitáveis na sociedade britânica.",
      "isFavorite": false
    },
    {
      "titulo": "Lei do Desfile de Elefantes em Vermont",
      "descricao": "A Lei do Desfile de Elefantes em Vermont foi promulgada em 1827 e proibia que elefantes fossem conduzidos pelas ruas da cidade após o anoitecer, a menos que estivessem acompanhados por pelo menos três homens segurando lanternas. Esta legislação peculiar foi uma resposta aos espetáculos de circo itinerantes que frequentemente passavam pela região.",
      "impacto": "Embora pareça uma lei absurda nos dias de hoje, a Lei do Desfile de Elefantes em Vermont reflete as preocupações com a segurança pública e a preservação da ordem nas comunidades rurais do século XIX. A legislação também ilustra a interação entre a vida cotidiana e os eventos incomuns trazidos pelos circos itinerantes.",
      "isFavorite": false
    }
  ];

//DEFINE TYPES
 const typeDefs = gql`
    type Law {
        id: ID
        titulo: String
        descricao: String
        impacto: String
        isFavorite: Boolean
    }

    type Query {
        laws: [Law]
        favoriteLaws: [Law]
    }

    type Mutation {
        updateLaw: Law
    }

 `;

//DEFINE RESOLVERS
const resolvers = {
    Query: {
        laws: () => {
            return laws
        }, 
        favoriteLaws: () => {
            return laws.filter(law => law.isFavorite === true);
        },
    },

    Mutation: {
        updateLaw: (_, {titulo}) => {
            const law = laws.find((law) => laws.title === titulo);
            law.isFavorite = law.isFavorite ? false : true;
            return law 
        },
    },
}     

//CREATE SERVER
const app = new ApolloServer({ typeDefs, resolvers })

//RUN SERVER
app.listen().then(({url}) => console.log('Server running on ${url}')); 