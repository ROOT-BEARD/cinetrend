import { BarChart } from "recharts";
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import type {SearchData} from "../../types/database";



export default function DataBarChart({data}:{data:SearchData[]}){
    return(
        <div className="w-full h-full">
            <BarChart
                style={{ width: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
                responsive
                data={data}
                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
                >
                    <CartesianGrid/>
                    <XAxis dataKey="name" />
                    <YAxis width="auto" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#181b1e' }}
                        cursor={false}
                    />
                    <Legend />
                    <Bar fill="var(--color-danger)" dataKey="searches" radius={[20, 20, 0, 0]}
                    activeBar={{ stroke: 'rgb(168, 168, 168)', strokeWidth: 5 }} />
            </BarChart>
        </div>
    );
}