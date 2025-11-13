import React from "react";

export default function ResultsTable({ results }) {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">
                Resultados das Buscas
            </h2>
            <table className="min-w-full border border-gray-300 text-sm rounded-lg overflow-hidden shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-4 py-2 text-left">
                            Tipo de Busca
                        </th>
                        <th className="border px-4 py-2 text-left">
                            Tempo (ms)
                        </th>
                        <th className="border px-4 py-2 text-left">
                            Melhoria em relação ao tipo de busca Sequencial
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">Sequencial</td>
                        <td className="border px-4 py-2">
                            {results.sequential.time}
                        </td>
                        <td className="border px-4 py-2">-</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Indexada</td>
                        <td className="border px-4 py-2">
                            {results.indexed.time}
                        </td>
                        <td className="border px-4 py-2">
                            {results.melhoriaIndexada.toFixed(2)}%
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Hash</td>
                        <td className="border px-4 py-2">
                            {results.hashResult.time}
                        </td>
                        <td className="border px-4 py-2">
                            {results.melhoriaHash.toFixed(2)}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
