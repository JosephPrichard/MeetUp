import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { BasePage } from './pages/base/Base.page';
import { GroupPage } from './pages/group/Group.page';
import { MantineProvider } from '@mantine/core';

export const HOME = "/";
export const GROUP = "/group";

function App() {

    return (
        <MantineProvider
            theme={{
                colorScheme: "dark"
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path={GROUP + "/:id"} element={<GroupPage/>}/>
                    <Route path={HOME} element={<BasePage/>}/>
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
function createBrowserHistory() {
    throw new Error('Function not implemented.');
}

