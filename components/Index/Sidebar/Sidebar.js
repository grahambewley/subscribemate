import SmallCard from "./SmallCard";

const Sidebar = ({ latest, triggerDetailModal }) => {
    return (
        <div className='SidebarWrapper'>
            <aside className='Sidebar'>
                <h3 className='SidebarHeader'>Added Just Now</h3>
                <div className='SmallCardColumn'>
                    { latest.map(entity => {
                        return (
                            <SmallCard entity={entity} triggerDetailModal={triggerDetailModal} key={entity.id}/>
                        );
                    })}
                </div>
            </aside>

            <style jsx>{`
            .SidebarWrapper {
                grid-column: 2 / span 1;
                width: 100%;
            }
            @media(max-width: 991px) {
                .SidebarWrapper {
                    display: none;
                }
            }
            .Sidebar {
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                background-color: #fff;
                padding: 14px;
                width: 100%;
                border-radius: 10px;
                box-shadow: 0 1px 2px rgba(0,0,0,.1);
            }
            .SidebarHeader {
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                font-weight: 600;
                font-size: 1rem;
                text-align: center;
            }
            .SmallCardColumn {
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 16px;
            }
            `}</style>
        </div>
    );
}

export default Sidebar;