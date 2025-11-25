export function createHash(data) {
    const hash = {};
    data.forEach((tio) => {
        const matriculaKey = String(tio.matricula).toLowerCase();
        const nomeKey = String(tio.remetente).toLowerCase();

        hash[matriculaKey] = tio;
        hash[nomeKey] = tio;
    });
    return hash;
}

export function hashSearch(hash, term) {
    const lowerTerm = String(term).toLowerCase();
    const results = [];

    if (hash[lowerTerm]) {
        results.push(hash[lowerTerm]);
    } else {
        for (const key in hash) {
            if (key.includes(lowerTerm)) {
                results.push(hash[key]);
            }
        }
    }

    const uniqueResults = Array.from(new Set(results.map((a) => a.id))).map(
        (id) => results.find((a) => a.id === id)
    );

    return uniqueResults;
}
