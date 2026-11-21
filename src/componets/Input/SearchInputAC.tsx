import { Autocomplete, Description, SearchField, ListBox, Label } from "@heroui/react";
import { useEffect, useState } from "react";
import AndSwitch from "./AndSwitch";

export default function SearchInputAC({selectionOptions, value, setValue, title, andSearch, setAndSearch, onlyOr}:
    {selectionOptions:string[], value:string[], setValue:(value: string[])=>void, title:string, andSearch:boolean
        ,setAndSearch:(value: boolean)=>void, onlyOr:boolean
    }){

    //the search
    const [search, setSearch] = useState<string>("");

    //maps Listbox items from the selection options, filtering by the current search(lower case for both)
    const selectionOptionList = () => {
    return selectionOptions.filter((type)=>type.toLowerCase().includes(search.toLowerCase()))
    .map((type) => (
        <ListBox.Item key={type} id={type} textValue={type}>
            {type}
            <ListBox.ItemIndicator />
        </ListBox.Item>
    ));
    };
    //if onlyOr is passed in, and search false, other wise defualt to And search
    useEffect(()=>
        onlyOr ? setAndSearch(false) : setAndSearch(true)
    ,[]);

    return(
        <div className="w-full flex flex-row items-center gap-3">
            {/* place holder of 'title...', allow multiple selection, handle setting and getting value */}
            <Autocomplete
                className='w-full h-full'
                placeholder={title + "..."}
                selectionMode="multiple"
                value={value}
                onChange={(keys) => setValue(keys as string[])}
            >
                <Autocomplete.Trigger>
                <Autocomplete.Value>
                    {/* if the length of the input is greater then 0, insert
                    '*AND* or '*OR*' between values depedning on if 'andSearch'
                    is on or not, otherwise, keep it the same*/}
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
                    {/* change the search input */}
                    <SearchField value={search} onChange={setSearch}>
                    <SearchField.Group>
                        <SearchField.SearchIcon />
                        <SearchField.Input/>
                    </SearchField.Group>
                    </SearchField>
                    {/* List all the selection items, already filtered by the search */}
                    <ListBox>
                        {selectionOptionList()}
                    </ListBox>
                </Autocomplete.Filter>
                </Autocomplete.Popover>
            </Autocomplete>
            {/* switch only displayed if onlyOr is false, allowing for togglling of and or searching */}
            {onlyOr?<></>:<AndSwitch andSearch={andSearch} setAndSearch={setAndSearch}/>}
        </div>
    );
}