import { useState } from "react";
import { searchSerive } from "../services/searchService";
import { Button, Card, IconSearch } from "@heroui/react";
import DataBarChart from "../componets/Charts/DataBarChart";
import type { SearchData } from "../types/database";
import SelecetionBox from "../componets/Input/SelectionBox";

export default function AdminDashboard(){
    // the current parameter to search for
    const [currentSearch, setCurrentSearch] = useState<SearchData[]>([]);
    // the picked paremeter, the picked timerange, the picked top amout
    const [picked, setPicked] = useState<string|null>("");
    // the time range is kept as a integer amount, to show how many months back to look
    const [timeRange, setTimeRange] = useState<string|null>("");
    // used to pick the top 'topAmount' of the filed in parameter, EX. the top '3' actors
    const [topAmount, setTopAmount] = useState<string|null>("");


    //gets search data for search parameters, and sets it to the current search to display in the bar chart 
    const getActors = async () => {
        //if there is no inputted topamount or time range, return empty array
        if(!topAmount || !timeRange) return [];
        //searchs for the most search actor, passing in the topAmount and timeRange parsed as Integer values
        const data = await searchSerive.getMostSearchedActors(parseInt(topAmount), parseInt(timeRange));
        setCurrentSearch(data);
    };
    const getGenres = async () => {
        //refer to get Actors for logic
        if(!topAmount || !timeRange) return [];
        const data = await searchSerive.getMostSearchedGenres(parseInt(topAmount), parseInt(timeRange));
        setCurrentSearch(data);
    };
    const getDirectors = async () => {
        if(!topAmount || !timeRange) return [];
        const data = await searchSerive.getMostSearchedDirectors(parseInt(topAmount), parseInt(timeRange));
        setCurrentSearch(data);
    };

    //changes the current search based on the picked search parameter 
    const handleSearch = async () => {
        switch(picked){
            case "Genre":
                await getGenres();
                break;
            case "Actors":
                await getActors();
                break;
            case "Directors":
                await getDirectors();
                break;
            default:
                break;
        }
    }

    //options for SelectionBoxes
    const options = [
        "Genre",
        "Actors",
        "Directors"
    ]
    const timeOptions = [
        "1",
        "3",
        "6",
        "9",
        "12"
    ]
    const topOptions = [
        "3",
        "5",
        "10"
    ]

    return(
        <div className="w-screen md:h-screen h-full flex justify-center items-center">
            <Card variant="secondary" className="flex items-center md:h-7/8 md:w-3/4 w-full items-center">
                <div className="flex md:flex-row flex-col w-full gap-6">
                    {/* used to get the paremeter to search for */}
                    <SelecetionBox
                        title="Picked" 
                        value={picked}
                        setValue={setPicked}
                        selectionOptions={options}      
                    />
                    {/* used to get the top amout */}
                    <div className="flex flex-row h-full items-center gap-2">
                        TOP
                        <SelecetionBox
                        title="Top" 
                        value={topAmount}
                        setValue={setTopAmount}
                        selectionOptions={topOptions}      
                        />
                    </div>
                </div>
                    {/* used to the the amount of months to look back at */}
                    <div className="flex flex-row h-full items-center gap-2">
                        PAST
                        <SelecetionBox
                            title="Time Range" 
                            value={timeRange}
                            setValue={setTimeRange}
                            selectionOptions={timeOptions}      
                        />
                        MONTH(S)
                    </div>
                {/* Sets data for the barchar to display equal to the current
                search */}
                <DataBarChart data={currentSearch}/>
                <Button onClick={handleSearch}><IconSearch/></Button>
            </Card>
        </div>
    );
}