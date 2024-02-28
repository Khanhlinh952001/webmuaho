import SearchAppBar from "../Navbar";
import Sidebar from "../Sidebar";
import Box from '@mui/material/Box';

function DashLayout({ children }) {
    return (
        <div>
            <SearchAppBar />
            <Box height={20} />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {children}

                </Box>
            </Box>
        </div>
    )
}

export default DashLayout

