// Cria hash com chave = matrícula e nome
export function createHash(data) {
    const hash = {};
    data.forEach((tio) => {
        const matriculaKey = String(tio.matricula).toLowerCase();
        const nomeKey = String(tio.nome).toLowerCase();

        hash[matriculaKey] = tio;
        hash[nomeKey] = tio;
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
