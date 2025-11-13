export function createIndex(data) {
    const index = {};
    data.forEach((aluno, i) => {
        const key = String(aluno.nome[0] || "").toLowerCase();
        if (!index[key]) index[key] = [];
        index[key].push(i);
    });
    return index;
}

export function indexedSearch(index, data, term) {
    const lowerTerm = String(term).toLowerCase();
    const key = lowerTerm[0];
    const candidates = index[key] ? index[key].map((i) => data[i]) : [];

    const results = candidates.filter((aluno) => {
        const matricula = String(aluno.matricula).toLowerCase();
        const nome = String(aluno.nome).toLowerCase();
        const dia = String(aluno.diaSemana).toLowerCase();

        return (
            matricula.includes(lowerTerm) ||
            nome.includes(lowerTerm) ||
            dia.includes(lowerTerm)
        );
    });

    return results;
}
