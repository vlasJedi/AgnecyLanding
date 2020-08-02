import app from "./app/app";
import navigation from "./navigation/navigation";
import headerContainer from "./header-container/header-container";

const mainPageComps = [
    {
        name: "navigation",
        comp: navigation
    },
    {
        name: "headerContainer",
        comp: headerContainer
    },
    {
        name: "appComponent",
        comp: app
    },
];
const pages = {
    "main": mainPageComps
};
export default function ComponentsProvider(name) {
    return pages[name];
}