import { useEffect, useState } from "react";
import { searchSerive } from "../services/searchService";
import { Card } from "@heroui/react";
import DataBarChart from "../componets/Charts/DataBarChart";
import type { SearchData } from "../types/database";
import SelecetionBox from "../componets/Input/SelectionBox";

export default function AdminDashboard(){
    const [actors, setActors] = useState<SearchData[]>([]);
    const [genre, setGenres] = useState<SearchData[]>([]);

    const [picked, setPicked] = useState<string|null>("");

    const getActors = async () => {
         const data = await searchSerive.getMostSearchedActors();
         setActors(data);
     };

    const getGenres = async () => {
        const data = await searchSerive.getMostSearchedGenres();
        setGenres(data);
    };

    const options = [
        "Genre",
        "Actors",
        "Directors"
    ]

    useEffect(()=>{
        getActors();
        getGenres();
    }, []);

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <Card variant="secondary" className="flex items-center h-3/4 w-3/4 items-center">
                <SelecetionBox
                    title="Picked" 
                    value={picked}
                    setValue={setPicked}
                    selectionOptions={options}      
                />
                <DataBarChart data={picked=="Genre"?genre:picked=="Actors"?actors:genre}/>
            </Card>
        </div>
    );
}