export function generateData(qtd = 5000) {
    const nomes = [
        "Ana",
        "Bruno",
        "Carlos",
        "Daniela",
        "Eduardo",
        "Fernanda",
        "Gabriel",
        "Helena",
        "Igor",
        "Julia",
        "Lucas",
        "Mariana",
        "Rafael",
        "Patrícia",
        "Thiago",
    ];
    const sobrenomes = [
        "Silva",
        "Souza",
        "Oliveira",
        "Costa",
        "Pereira",
        "Santos",
        "Lima",
        "Moura",
        "Ribeiro",
        "Carvalho",
    ];
    const cursos = [
        "Engenharia",
        "Direito",
        "Medicina",
        "Administração",
        "Sistemas de Informação",
        "Psicologia",
        "Arquitetura",
        "Biologia",
    ];
    const dias = [
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
    ];

    const alunos = Array.from({ length: qtd }, (_, i) => {
        const nome = `${nomes[Math.floor(Math.random() * nomes.length)]} ${
            sobrenomes[Math.floor(Math.random() * sobrenomes.length)]
        }`;
        const curso = cursos[Math.floor(Math.random() * cursos.length)];
        const diaSemana = dias[Math.floor(Math.random() * dias.length)];

        return {
            id: i + 1,
            matricula: 20230000 + i + 1,
            nome,
            curso,
            diaSemana,
        };
    });

    console.log(`Generated ${qtd} student records.`);
    console.log(alunos);
    return alunos;
}
