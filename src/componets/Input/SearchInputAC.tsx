import { Autocomplete, Description, SearchField, ListBox, Label } from "@heroui/react";
import { useEffect, useState } from "react";
import AndSwitch from "./AndSwitch";

export default function SearchInputAC({selectionOptions, value, setValue, title, andSearch, setAndSearch, onlyOr}:
    {selectionOptions:string[], value:string[], setValue:(value: string[])=>void, title:string, andSearch:boolean
        ,setAndSearch:(value: boolean)=>void, onlyOr:boolean
    }){

    const [search, setSearch] = useState<string>("");

    
    const selectionOptionList = () => {
    return selectionOptions.filter((type)=>type.toLowerCase().includes(search.toLowerCase()))
    .map((type) => (
        <ListBox.Item key={type} id={type} textValue={type}>
            {type}
            <ListBox.ItemIndicator />
        </ListBox.Item>
    ));
    };
    
    useEffect(()=>
        onlyOr ? setAndSearch(false) : setAndSearch(true),[]);

    return(
        <div className="w-full flex flex-row items-center gap-3">
            <Autocomplete
                className='w-full h-full'
                placeholder={title + "..."}
                selectionMode="multiple"
                value={value}
                onChange={(keys) => setValue(keys as string[])}
            >
                <Label />
                <Autocomplete.Trigger>
                <Autocomplete.Value>
                    {({defaultChildren})=>
                        value.length > 0 ? (
                            <span>
                                {value.join(andSearch ? " *AND* " : " *OR* ")}
                            </span>
                        ) :(
                            defaultChildren
                        )}
                </Autocomplete.Value>
                <Autocomplete.ClearButton />
                <Autocomplete.Indicator />
                </Autocomplete.Trigger>
                <Description />
                <Autocomplete.Popover>
                <Autocomplete.Filter>
                    <SearchField value={search} onChange={setSearch}>
                    <SearchField.Group>
                        <SearchField.SearchIcon />
                        <SearchField.Input/>
                    </SearchField.Group>
                    </SearchField>
                    <ListBox>
                        {selectionOptionList()}
                    </ListBox>
                </Autocomplete.Filter>
                </Autocomplete.Popover>
            </Autocomplete>
            {onlyOr?<></>:<AndSwitch andSearch={andSearch} setAndSearch={setAndSearch}/>}
        </div>
    );
}