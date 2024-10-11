import { Box } from "@mui/material";
import { ChatState } from "../context/ChatProvider";
import SideDrawr from "../components/miscellaneous/SideDrawr";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";


export default function ChatPage() {
    const { user } = ChatState();
    return (
        <div style={{width: '100%'}}>
            {user && <SideDrawr />}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                height: '90vh',
                backgroundColor: '#f5f5f5',
                padding: '10px'
            }}>
                {user && <MyChats />}
                {user && <ChatBox />}

            </Box>
        </div>
    );
}