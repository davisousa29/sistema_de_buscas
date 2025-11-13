import React, { useState, useEffect } from "react";
import { generateData } from "./utils/generateData";
import { measureTime } from "./utils/measureTime";
import { sequentialSearch } from "./components/SequentialSearch";
import { createIndex, indexedSearch } from "./components/IndexedSearch";
import { createHash, hashSearch } from "./components/HashSearch";

// Componentes desacoplados
import DataTable from "./components/DataTable";
import ResultsTable from "./components/ResultsTable";
import PerformanceChart from "./components/PerformanceChart";

function App() {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState({});
    const [hash, setHash] = useState({});
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);
    const [foundData, setFoundData] = useState([]); // resultados encontrados
    const [searchPerformed, setSearchPerformed] = useState(false); // ✅ novo estado para saber se já foi feita uma busca

    // Gera a base inicial
    useEffect(() => {
        const alunos = generateData();
        setData(alunos);
        setIndex(createIndex(alunos));
        setHash(createHash(alunos));
    }, []);

    // Executa as buscas
    const handleSearch = () => {
        if (!input) return alert("Digite algo para buscar!");
        setSearchPerformed(true);

        const sequential = measureTime(() => sequentialSearch(data, input));
        const indexed = measureTime(() => indexedSearch(index, data, input));
        const hashResult = measureTime(() => hashSearch(hash, input));

        // resultados encontrados
        setFoundData(sequential.result || []);

        // cálculos de melhoria
        const melhoriaIndexada =
            sequential.time > 0
                ? 100 - (indexed.time / sequential.time) * 100
                : 0;

        const melhoriaHash =
            sequential.time > 0
                ? 100 - (hashResult.time / sequential.time) * 100
                : 0;

        setResults({
            sequential,
            indexed,
            hashResult,
            melhoriaIndexada,
            melhoriaHash,
        });
    };

    // Gera nova base
    const handleGenerate = () => {
        const alunos = generateData();
        setData(alunos);
        setIndex(createIndex(alunos));
        setHash(createHash(alunos));
        setResults(null);
        setFoundData([]);
        setSearchPerformed(false);
    };

    return (
        <div className="p-10 font-sans">
            <h1 className="text-2xl font-bold mb-2">
                Comparador de Algoritmos de Busca
            </h1>
            <p className="text-gray-700 mb-6">
                Simulação com {data.length} registros de alunos
            </p>

            <div className="mb-6 flex gap-2">
                <input
                    placeholder="Digite matrícula, nome ou dia da semana"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 rounded w-96"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                    Executar buscas
                </button>
                <button
                    onClick={handleGenerate}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                    Gerar nova base
                </button>
            </div>

            {/* ✅ Tabela de dados completa */}
            <DataTable data={data} />

            {/* ✅ Resultados da busca */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">
                    Resultados da Busca
                </h2>

                {searchPerformed && foundData.length === 0 ? (
                    <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                        Nenhum registro encontrado com o valor informado.
                    </p>
                ) : null}

                {foundData.length > 0 && (
                    <>
                        <div className="overflow-y-auto max-h-64 border rounded-lg shadow">
                            <table className="min-w-full border-collapse bg-white">
                                <thead className="bg-gray-100 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2 border text-left">
                                            ID
                                        </th>
                                        <th className="px-4 py-2 border text-left">
                                            Matrícula
                                        </th>
                                        <th className="px-4 py-2 border text-left">
                                            Nome
                                        </th>
                                        <th className="px-4 py-2 border text-left">
                                            Dia da Semana
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foundData.map((aluno) => (
                                        <tr
                                            key={aluno.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-2 border">
                                                {aluno.id}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {aluno.matricula}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {aluno.nome}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {aluno.diaSemana}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                            {foundData.length} resultado(s) encontrado(s)
                        </p>
                    </>
                )}
            </div>

            {/* ✅ Resultados de desempenho */}
            {results && (
                <div className="mt-10 space-y-6">
                    <ResultsTable results={results} />
                    <PerformanceChart results={results} />
                </div>
            )}
        </div>
    );
}

export default App;
