import React, { useState, useEffect } from "react";
import { generateData } from "./utils/generateData";
import { measureTime } from "./utils/measureTime";
import { sequentialSearch } from "./components/SequentialSearch";
import { createIndex, indexedSearch } from "./components/IndexedSearch";
import { createHash, hashSearch } from "./components/HashSearch";

import Carousel from "./components/Carousel";
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
        <div className="p-5 lg:p-10 font-sans flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-2 flex flex-row">
                Lista de <p className="text-green-500">"Tios do WhatsApp"</p> e
                suas Correntes
            </h1>
            <p className="text-gray-700 mb-6">
                A lista é composta por {data.length} tios que já espalharam
                alguma corrente do whatsapp
            </p>

            <div className="lg:mx-96 bg-white p-6 rounded-lg shadow-lg w-full flex flex-col gap-6 shadow-neutral-700">
                <Carousel />

                <div className="mb-6 flex flex-col lg:flex-row gap-2 items-center justify-center">
                    <input
                        placeholder="Digite a matrícula do tio, ou o nome, ou a frenquência"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border p-2 rounded w-full lg:w-96 text-xs lg:text-sm"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full lg:w-52 rounded transition"
                    >
                        Executar buscas
                    </button>
                    <button
                        onClick={handleGenerate}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 w-full lg:w-52 rounded transition"
                    >
                        Gerar nova base
                    </button>
                </div>

                <DataTable data={data} />

                <div className="flex flex-col items-center justify-center w-full">
                    <h2 className="text-xl font-semibold mb-3">
                        Resultado(s) encontrado(s)
                    </h2>

                    {searchPerformed && foundData.length === 0 ? (
                        <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                            Nenhum registro encontrado com o valor informado.
                        </p>
                    ) : null}

                    {foundData.length > 0 && (
                        <>
                            <div className="max-h-80 w-full overflow-y-auto rounded-lg mb-8 shadow-xl">
                                <table className="w-full">
                                    <thead className="bg-gray-300 sticky top-0">
                                        <tr>
                                            <th className=" px-3 py-2 text-left">
                                                Matrícula
                                            </th>
                                            <th className=" px-3 py-2 text-left">
                                                Tio(a)
                                            </th>
                                            <th className=" px-3 py-2 text-left">
                                                Tipo de corrente
                                            </th>
                                            <th className=" px-3 py-2 text-left">
                                                Frenquência
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foundData.map((tio) => (
                                            <tr
                                                key={tio.id}
                                                className="hover:bg-gray-300 transition-all ease-in-out duration-300"
                                            >
                                                <td className=" px-3 py-2">
                                                    {tio.matricula}
                                                </td>
                                                <td className=" px-3 py-2">
                                                    {tio.remetente}
                                                </td>
                                                <td className=" px-3 py-2">
                                                    {tio.frequenciaEnvio}
                                                </td>
                                                <td className=" px-3 py-2">
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

                {results && (
                    <div className="space-y-6">
                        <ResultsTable results={results} />
                        <PerformanceChart results={results} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
