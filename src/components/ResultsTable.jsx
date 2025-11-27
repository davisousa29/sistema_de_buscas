import React from "react";

export default function ResultsTable({ results }) {
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-xl font-semibold mb-3">
                Resultados das buscas
            </h2>
            <div className="max-h-80 w-full overflow-y-auto rounded-lg mb-8 shadow-xl">
                <table className="w-full">
                    <thead className="bg-gray-300 sticky top-0">
                        <tr>
                            <th className=" px-3 py-2 text-left">
                                Tipo de Busca
                            </th>
                            <th className=" px-3 py-2 text-left">
                                Tempo (ms)
                            </th>
                            <th className=" px-3 py-2 text-left">
                                Melhoria em relação ao tipo de busca Sequencial
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-300 transition-all ease-in-out duration-300">
                            <td className=" px-3 py-2">Sequencial</td>
                            <td className=" px-3 py-2">
                                {results.sequential.time}
                            </td>
                            <td className=" px-3 py-2">-</td>
                        </tr>
                        <tr className="hover:bg-gray-300 transition-all ease-in-out duration-300">
                            <td className=" px-3 py-2">Indexada</td>
                            <td className=" px-3 py-2">
                                {results.indexed.time}
                            </td>
                            <td className=" px-3 py-2">
                                {results.melhoriaIndexada.toFixed(2)}%
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-300 transition-all ease-in-out duration-300">
                            <td className=" px-3 py-2">Hash</td>
                            <td className=" px-3 py-2">
                                {results.hashResult.time}
                            </td>
                            <td className=" px-3 py-2">
                                {results.melhoriaHash.toFixed(2)}%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
