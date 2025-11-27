import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function PerformanceChart({ results }) {
    const data = [
        {
            name: "Sequencial",
            tempo: results.sequential.time,
            melhoria: 0,
        },
        {
            name: "Indexada",
            tempo: results.indexed.time,
            melhoria: results.melhoriaIndexada,
        },
        {
            name: "Hash",
            tempo: results.hashResult.time,
            melhoria: results.melhoriaHash,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-xl font-semibold mb-3">
                Comparativo de Desempenho
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) => {
                            const num = Number(value);
                            if (isNaN(num)) return "0%";
                            return `${num.toFixed(2)}%`;
                        }}
                    />
                    <Legend />
                    <Bar dataKey="tempo" fill="#3b82f6" name="Tempo (ms)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
