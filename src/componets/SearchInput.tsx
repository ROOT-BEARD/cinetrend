import { SearchField } from "@heroui/react";

export default function SearchInput({icon, title, value, setValue}:{icon:boolean, title:string, value:string, setValue:(v : string)=>void}){

    return(
        <SearchField className='w-full' name='search'>
            <SearchField.Group>
            {icon?<SearchField.SearchIcon />:<></>}
            <SearchField.Input placeholder={title + "..."} value={value} onChange={(e) => { setValue(e.target.value) }} />
            <SearchField.ClearButton onClick={e => setValue('')} />
            </SearchField.Group>
        </SearchField>
    );
}