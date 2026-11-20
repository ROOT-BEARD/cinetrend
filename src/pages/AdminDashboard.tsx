import SearchLineChart from "../componets/SearchLineChart";
import type {LineChartPoint} from "../types/charts";

export default function AdminDashboard(){
    const points: LineChartPoint[] = [
        { x: "2026-11-01", weight: 185, reps: 8 },
        { x: "2026-11-08", weight: 190, reps: 6 },
        { x: "2026-11-15", weight: 195, reps: 5 },
    ];

    return(
        <div>
            <SearchLineChart
            points={points}/>
        </div>
    );
}