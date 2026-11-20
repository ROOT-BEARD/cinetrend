import { Button, Drawer } from "@heroui/react";
import { Link } from "react-router-dom";

export default function MenuDrawer(){
    return(
        <Drawer>
            <Button variant="primary" size="lg" className='fixed bottom-4 right-4 z-10'>HOME</Button>
            <Drawer.Backdrop className="data-[state=closed]:pointer-events-none">
                <Drawer.Content placement="bottom">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>MENU</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body className="w-full justify-center flex flex-row gap-12">
                            <Link to={'/'}><Button variant="ghost">HOME</Button></Link>
                            <Link to={'/search_page'}><Button variant="ghost">SEARCH</Button></Link>
                            <Link to={'/authentication_page'}><Button variant="ghost">ACCOUNT</Button></Link>
                            <Link to={'/admin_dashboard'}><Button variant="ghost">ADMIN DASHBOARD</Button></Link>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}