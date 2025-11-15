export function sequentialSearch(data, term) {
    const lowerTerm = String(term).toLowerCase();

    const results = data.filter((tio) => {
        const matricula = String(tio.matricula).toLowerCase();
        const nome = String(tio.remetente).toLowerCase();
        const dia = String(tio.frequenciaEnvio).toLowerCase();

        return (
            matricula.includes(lowerTerm) ||
            nome.includes(lowerTerm) ||
            dia.includes(lowerTerm)
        );
    });

    return results;
}
