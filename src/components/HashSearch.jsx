export function createHash(data) {
    const hash = {};

    data.forEach((tio) => {
        hash[String(tio.matricula).toLowerCase()] = tio;
        hash[String(tio.remetente).toLowerCase()] = tio;
        hash[String(tio.frequenciaEnvio).toLowerCase()] = tio;
        hash[String(tio.tipoCorrente).toLowerCase()] = tio;
    });

    return hash;
}

export function hashSearch(hash, term) {
    const lowerTerm = String(term).toLowerCase();

    if (hash[lowerTerm]) {
        return [hash[lowerTerm]];
    }

    return [];
}
