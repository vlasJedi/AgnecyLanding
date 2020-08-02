import app from "./app/app";
import homePage from "./pages/home/home";
import navigation from "./navigation/navigation";
import navigationMobile from "./navigation/mobile/navigation-mobile";
import headerContainer from "./header-container/header-container";

const baseComps = [
    {name: "navigationMobile", comp: navigationMobile},
    {name: "navigation", comp: navigation},
    {name: "headerContainer", comp: headerContainer},
    {name: "appComponent", comp: app},
];
const homeComps = [
    {name: "home", comp: homePage}
];
const pages = {
    "base": baseComps,
    "home": homeComps
};
export default function ComponentsProvider(name) {
    return pages[name];
}