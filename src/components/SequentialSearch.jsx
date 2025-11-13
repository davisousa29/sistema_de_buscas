export function sequentialSearch(data, term) {
    const lowerTerm = String(term).toLowerCase();

    const results = data.filter((aluno) => {
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
