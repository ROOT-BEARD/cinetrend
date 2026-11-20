import { ResponsiveContainer, CartesianGrid, YAxis, Tooltip, Legend, Line, LineChart } from "recharts";
import type { LineChartPoint } from "../types/charts";

interface LineChartProps {
    points:LineChartPoint[]
};

export default function SearchLineChart({points}:LineChartProps){
    return(
        <div className="h-svh">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={points}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <YAxis yAxisId='leftY' stroke="var(--color-text-3)" domain={[0, 'auto']} />
                    <Tooltip
                        cursor={{stroke: 'var(--color-border-2)'}}
                    />
                    <Legend/>
                    <Line 
                    type='monotone'
                    dataKey='reps'
                    yAxisId="rightY"
                    stroke="#f16363" 
                    strokeWidth={5}
                    dot={{
                    r: 5, 
                    fill: 'var(--color-surface-base)',
                    }}
                    activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}