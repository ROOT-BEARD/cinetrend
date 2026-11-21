import { ComboBox, Input, ListBox } from "@heroui/react";

//takes in a list of options, a current value, a function to set it's value on change, and title
export default function SelecetionBox({selectionOptions, value, setValue, title}:
    {selectionOptions:string[], value:string|null, setValue:(value:string|null)=>void, title:string}){
    

    //maps selection options to ListBox Items
    const selectionOptionList = () => {
    return selectionOptions.map((type) => (
        <ListBox.Item key={type} id={type} textValue={type}>
        {type}
        <ListBox.ItemIndicator />
        </ListBox.Item>
    ));
    };

    return(
            //change the selection to the selected value on value change
            <ComboBox
            className='w-full'
            selectedKey={value}
            onSelectionChange={(e) => {setValue(e as string)}}>
                <ComboBox.InputGroup>
                    {/* Place holder text = to title + "...", EX. 'Search...'  */}
                    <Input placeholder={title + "..."}/>
                    <ComboBox.Trigger/>
                </ComboBox.InputGroup>
                <ComboBox.Popover>
                    {/* display the selection options */}
                    <ListBox>
                        {selectionOptionList()}
                    </ListBox>
                </ComboBox.Popover>
            </ComboBox>
    );
}