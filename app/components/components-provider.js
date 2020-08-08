import app from "./app/app";
import homePage from "./pages/home/home";
import contactPage from "./pages/contact/contact";
import aboutUsPage from "./pages/about-us/about-us";
import portfolioPage from "./pages/portfolio/portfolio";

import navigation from "./navigation/navigation";
import navigationMobile from "./navigation/mobile/navigation-mobile";
import headerContainer from "./header-container/header-container";

const allComps = [
    {name: "navigationMobile", comp: navigationMobile},
    {name: "navigation", comp: navigation},
    {name: "headerContainer", comp: headerContainer},
    {name: "appComponent", comp: app},
    
    /** Watch that NO kebab, only camelcase for components names */
    {name: "home", comp: homePage},
    {name: "contact", comp: contactPage},
    {name: "aboutUs", comp: aboutUsPage},
    {name: "portfolio", comp: portfolioPage}
];
export default function ComponentsProvider() {
    return allComps;
}