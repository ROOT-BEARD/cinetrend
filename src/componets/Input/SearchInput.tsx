import { SearchField } from "@heroui/react";

export default function SearchInput({icon, title, value, setValue}:{icon:boolean, title:string, value:string, setValue:(v : string)=>void}){

    return(
        <SearchField className='w-full' name='search'>
            <SearchField.Group>
            {/* if icon is true, so the search icon in the bar */}
            {icon?<SearchField.SearchIcon />:<></>}
            {/* display the title... as a place holder, handle setting of the inputted value */}
            <SearchField.Input placeholder={title + "..."} value={value} onChange={(e) => { setValue(e.target.value) }} />
            {/* clears the input when pressed */}
            <SearchField.ClearButton onClick={e => setValue('')} />
            </SearchField.Group>
        </SearchField>
    );
}