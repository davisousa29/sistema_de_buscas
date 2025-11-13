// Cria hash com chave = matrícula e nome
export function createHash(data) {
    const hash = {};
    data.forEach((aluno) => {
        const matriculaKey = String(aluno.matricula).toLowerCase();
        const nomeKey = String(aluno.nome).toLowerCase();

        hash[matriculaKey] = aluno;
        hash[nomeKey] = aluno;
    });
    return hash;
}

// Busca por hash (chave exata ou aproximada)
export function hashSearch(hash, term) {
    const lowerTerm = String(term).toLowerCase();
    const results = [];

    // Busca exata
    if (hash[lowerTerm]) {
        results.push(hash[lowerTerm]);
    } else {
        // Busca parcial nas chaves
        for (const key in hash) {
            if (key.includes(lowerTerm)) {
                results.push(hash[key]);
            }
        }
    }

    // Remove duplicados
    const uniqueResults = Array.from(new Set(results.map((a) => a.id))).map(
        (id) => results.find((a) => a.id === id)
    );

    return uniqueResults;
}
