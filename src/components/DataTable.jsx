import React from "react";

export default function DataTable({ data }) {
    return (
        <div className="max-h-80 overflow-y-auto rounded-lg mb-8 shadow-xl">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-300 sticky top-0">
                    <tr>
                        <th className=" px-3 py-2 text-left">
                            Matrícula
                        </th>
                        <th className=" px-3 py-2 text-left">Tio(a)</th>
                        <th className=" px-3 py-2 text-left">
                            Frenquência
                        </th>
                        <th className=" px-3 py-2 text-left">
                            Tipo de corrente
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((tio) => (
                        <tr key={tio.id} className="hover:bg-gray-300 border-b-2 border-gray-300 transition-all ease-in-out duration-300">
                            <td className=" px-3 py-2">
                                {tio.matricula}
                            </td>
                            <td className=" px-3 py-2">{tio.remetente}</td>
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
    );
}
