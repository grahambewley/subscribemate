import SmallCard from "./SmallCard";

const Sidebar = ({ latest }) => {
    return (
        <div className='SidebarWrapper'>
            <aside className='Sidebar'>
                <h3 className='SidebarHeader'>Added Just Now</h3>
                <div className='SmallCardColumn'>
                    { latest.map(entity => {
                        return (
                            <SmallCard entity={entity}/>
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
                background-color: #f7f7f7;
                padding: 14px;
                width: 100%;
                border-radius: 10px;
                border: 1px solid #ddd;
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