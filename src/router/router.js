import React from 'react'
import { Route, Routes} from 'react-router-dom'
import ModelEdit from "../pages/modelEdit";
import HomePage from "../pages/HomePage";
import ModelEditView from "../pages/modelEditView";

export default function RouterConfig() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/model/edit/" element={<ModelEdit />} />
            <Route path="/model/view/" element={<ModelEditView />} />
        </Routes>
    )
}
