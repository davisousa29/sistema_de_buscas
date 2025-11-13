import React from "react";

export default function DataTable({ data }) {
    return (
        <div className="max-h-80 overflow-y-auto border rounded-lg mb-8 shadow-sm">
            <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        <th className="border px-3 py-2 text-left">ID</th>
                        <th className="border px-3 py-2 text-left">
                            Matrícula
                        </th>
                        <th className="border px-3 py-2 text-left">Nome</th>
                        <th className="border px-3 py-2 text-left">
                            Dia da Semana
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((aluno) => (
                        <tr key={aluno.id} className="hover:bg-gray-50">
                            <td className="border px-3 py-2">{aluno.id}</td>
                            <td className="border px-3 py-2">
                                {aluno.matricula}
                            </td>
                            <td className="border px-3 py-2">{aluno.nome}</td>
                            <td className="border px-3 py-2">
                                {aluno.diaSemana}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
