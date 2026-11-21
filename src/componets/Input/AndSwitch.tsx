import { Switch, Label } from "@heroui/react";

export default function AndSwitch({andSearch, setAndSearch}:{andSearch:boolean, setAndSearch:(value:boolean)=>void}){
    return(
        //toggle the passed in andSearch boolean
        <Switch isSelected={andSearch} onChange={setAndSearch}>
            <Switch.Content>
                {/* Display if currenly toggled to AND or OR */}
                <Label>{andSearch?"AND":"OR"}</Label>
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            </Switch.Content>
        </Switch>
    );
}