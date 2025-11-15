import React from "react";

export default function DataTable({ data }) {
    return (
        <div className="max-h-80 overflow-y-auto border rounded-lg mb-8 shadow-sm">
            <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        <th className="border px-3 py-2 text-left">
                            Matrícula
                        </th>
                        <th className="border px-3 py-2 text-left">Tio(a)</th>
                        <th className="border px-3 py-2 text-left">
                            Tipo de corrente
                        </th>
                        <th className="border px-3 py-2 text-left">
                            Frenquência
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((tio) => (
                        <tr key={tio.id} className="hover:bg-gray-50">
                            <td className="border px-3 py-2">
                                {tio.matricula}
                            </td>
                            <td className="border px-3 py-2">{tio.remetente}</td>
                            <td className="border px-3 py-2">
                                {tio.frequenciaEnvio}
                            </td>
                            <td className="border px-3 py-2">
                                {tio.tipoCorrente}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
