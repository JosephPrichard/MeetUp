import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { BasePage } from './pages/base/base.page';
import { GroupPage } from './pages/group/group.page';

export const HOME = "/";
export const GROUP = "/group/:id";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={GROUP} element={<GroupPage/>}/>
                    <Route path={HOME} element={<BasePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
