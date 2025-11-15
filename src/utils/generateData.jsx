export function generateData(qtd = 5000) {
    const tiposCorrente = [
        "Bom dia com flores",
        "Fake news política",
        "Receita milagrosa",
        "Corrente religiosa URGENTE",
        "PDF desconhecido",
        "Mensagem motivacional",
        "Horóscopo inventado",
        "Promoção falsa de supermercado",
        "Notícia chocante sem fonte",
        "Dica de saúde duvidosa",
    ];

    const frequencias = [
        "Diário",
        "Semanal",
        "Quinzenal",
        "Mensal",
        "De hora em hora",
    ];

    const tios = [
        "Tio João",
        "Tia Marlene",
        "Tio Roberto",
        "Tia Graça",
        "Tio Zeca",
        "Tia Cida",
        "Tio Geraldo",
        "Tia Nair",
        "Tio Paulo",
        "Tia Sandra",
        "Tio Milton",
        "Tia Neide",
        "Tio Arlindo",
        "Tia Rosa",
        "Tio Sérgio",
    ];

    const sobrenomes = [
        "Silva",
        "Souza",
        "Oliveira",
        "Pereira",
        "Carvalho",
        "Nascimento",
        "Barbosa",
        "Macedo",
        "Ribeiro",
        "Gonçalves",
        "Monteiro",
        "Albuquerque",
        "Moraes",
        "Cardoso",
        "Vieira",
    ];

    const dados = Array.from({ length: qtd }, (_, i) => {
        const tipoCorrente =
            tiposCorrente[Math.floor(Math.random() * tiposCorrente.length)];
        const frequencia =
            frequencias[Math.floor(Math.random() * frequencias.length)];

        const nomeTio = `${tios[Math.floor(Math.random() * tios.length)]} ${
            sobrenomes[Math.floor(Math.random() * sobrenomes.length)]
        }`;

        return {
            matricula: 20230000 + i + 1,
            tipoCorrente,
            frequenciaEnvio: frequencia,
            remetente: nomeTio,
        };
    });

    console.log(`Gerado ${qtd} registros de tios do WhatsApp.`);
    console.log(dados);
    return dados;
}
