import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

interface TopAppBarProps {
    children: JSX.Element
}

const TopAppBar = (props: TopAppBarProps) => {

    const [openDrawer, setOpenDrawer] = useState(false)
    const navigate = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const list = [
        {
            name: 'Stock Information',
            route: '/stock-information'
        },
        {
            name: 'Stock Financials',
            route: '/stock-financials'
        }
    ]

    const stockInformationNavigate = (route: string) => {
        navigate(`${route}`)
    }
    const isCollapsedEnabled = () => {
        return true
    }
    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={() => setOpenDrawer(true)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <IconButton
                            onClick={() => navigate('/')}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{mr: 2}}
                        >
                            <HomeIcon/>
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{display: {xs: 'none', sm: 'block'}}}
                        >
                            MUI
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItemButton dense onClick={() => {
                        isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true)
                    }}>
                        <ListItemIcon>
                            <SearchIcon/>
                            <ListItemText primary={'Search'}/>
                        </ListItemIcon>
                        {isCollapsedEnabled() ? <ExpandMore/> : <ExpandLess/>}
                    </ListItemButton>
                    <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                        {
                            list.map((listItem, index) =>
                                (
                                    <div key={index}>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => stockInformationNavigate(listItem.route)}
                                                            key={index}>
                                                <ListItemText primary={listItem.name}/>
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                )
                            )}
                    </Collapse>

                </List>
            </Drawer>
            {props.children}
        </>
    )
}

export default TopAppBar