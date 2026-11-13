import { ComboBox, Input, Label, ListBox } from "@heroui/react";

export default function SelecetionBox({selectionOptions, value, setValue, title}:
    {selectionOptions:string[], value:string, setValue:(value:string)=>void, title:string}){

    const selectionOptionList = () => {
    return selectionOptions.map((type) => (
        <ListBox.Item key={type} id={type} textValue={type}>
        {type}
        <ListBox.ItemIndicator />
        </ListBox.Item>
    ));
    };

    return(
        <ComboBox
        className='w-[7rem]'
        selectedKey={value}
        onSelectionChange={(e) => {setValue(e as string)}}>
            <Label>{title}</Label>
            <ComboBox.InputGroup>
                <Input placeholder={title + "..."}/>
                <ComboBox.Trigger/>
            </ComboBox.InputGroup>
            <ComboBox.Popover>
                <ListBox>
                    {selectionOptionList()}
                </ListBox>
            </ComboBox.Popover>
        </ComboBox>
    );
}