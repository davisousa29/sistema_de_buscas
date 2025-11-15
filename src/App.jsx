import React, { useState, useEffect } from "react";
import { generateData } from "./utils/generateData";
import { measureTime } from "./utils/measureTime";
import { sequentialSearch } from "./components/SequentialSearch";
import { createIndex, indexedSearch } from "./components/IndexedSearch";
import { createHash, hashSearch } from "./components/HashSearch";

import DataTable from "./components/DataTable";
import ResultsTable from "./components/ResultsTable";
import PerformanceChart from "./components/PerformanceChart";

function App() {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState({});
    const [hash, setHash] = useState({});
    const [input, setInput] = useState("");
    const [results, setResults] = useState(null);
    const [foundData, setFoundData] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        const tios = generateData();
        setData(tios);
        setIndex(createIndex(tios));
        setHash(createHash(tios));
    }, []);

    const handleSearch = () => {
        if (!input) return alert("Digite algo para buscar!");
        setSearchPerformed(true);

        const sequential = measureTime(() => sequentialSearch(data, input));
        const indexed = measureTime(() => indexedSearch(index, data, input));
        const hashResult = measureTime(() => hashSearch(hash, input));

        setFoundData(sequential.result || []);

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

    const handleGenerate = () => {
        const tios = generateData();
        setData(tios);
        setIndex(createIndex(tios));
        setHash(createHash(tios));
        setResults(null);
        setFoundData([]);
        setSearchPerformed(false);
    };

    return (
        <div className="p-10 font-sans">
            <h1 className="text-2xl font-bold mb-2">
                Lista de "Tios do WhatsApp" e suas Correntes
            </h1>
            <p className="text-gray-700 mb-6">
                A lista é composta por {data.length} tios que já espalharam alguma corrente do whatsapp
            </p>

            <div className="mb-6 flex gap-2">
                <input
                    placeholder="Digite a matrícula do tio, ou o nome, ou a frenquência"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border p-2 rounded w-96 text-sm"
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

            <DataTable data={data} />

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
                                            Matrícula
                                        </th>
                                        <th className="px-4 py-2 border text-left">
                                            Tio(a)
                                        </th>
                                        <th className="px-4 py-2 border text-left">
                                            Tipo de corrente
                                        </th>
                                        <th className="px-4 py-2 border text-left">
                                            Frenquência
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {foundData.map((tio) => (
                                        <tr
                                            key={tio.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-2 border">
                                                {tio.matricula}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {tio.remetente}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {tio.frequenciaEnvio}
                                            </td>
                                            <td className="px-4 py-2 border">
                                                {tio.tipoCorrente}
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
