export function createIndex(data) {
    const index = {};
    data.forEach((tio, i) => {
        const key = String(tio.remetente?.[0] || "").toLowerCase();
        if (!index[key]) index[key] = [];
        index[key].push(i);
    });
    return index;
}

export function indexedSearch(index, data, term) {
    const lowerTerm = String(term).toLowerCase();
    const key = lowerTerm[0];
    const candidates = index[key] ? index[key].map((i) => data[i]) : [];

    const results = candidates.filter((tio) => {
        const matricula = String(tio.matricula).toLowerCase();
        const remetente = String(tio.remetente).toLowerCase();
        const frequencia = String(tio.frequenciaEnvio).toLowerCase();
        const tipoCorrente = String(tio.tipoCorrente).toLowerCase();

        return (
            matricula.includes(lowerTerm) ||
            remetente.includes(lowerTerm) ||
            frequencia.includes(lowerTerm) ||
            tipoCorrente.includes(lowerTerm)
        );
    });

    return results;
}
