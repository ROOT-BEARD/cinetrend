import { Button, Drawer } from "@heroui/react";
import { Link } from "react-router-dom";
import {Bars, House, Magnifier, Person, ChartColumnStacked} from '@gravity-ui/icons';

export default function MenuDrawer(){
    return(
        <Drawer>
            <Button variant="primary" size="lg" className='h-15 w-15 fixed bottom-4 right-4 z-10'><Bars className="size-10"/></Button>
            <Drawer.Backdrop className="data-[state=closed]:pointer-events-none">
                <Drawer.Content placement="bottom">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                        </Drawer.Header>
                        <Drawer.Body className="w-full justify-center flex flex-row gap-6">
                            <Link to={'/'}><Button variant="ghost"><House className="size-8"/></Button></Link>
                            <Link to={'/search_page'}><Button variant="ghost"><Magnifier className="size-8"/></Button></Link>
                            <Link to={'/authentication_page'}><Button variant="ghost"><Person className="size-8"/></Button></Link>
                            <Link to={'/admin_dashboard'}><Button variant="ghost"><ChartColumnStacked className="size-8"/></Button></Link>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}