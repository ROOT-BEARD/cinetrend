import { ComboBox, Input, ListBox } from "@heroui/react";

export default function SelecetionBox({selectionOptions, value, setValue, title}:
    {selectionOptions:string[], value:string|null, setValue:(value:string|null)=>void, title:string}){

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
            className='w-full'
            selectedKey={value}
            onSelectionChange={(e) => {setValue(e as string)}}>
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