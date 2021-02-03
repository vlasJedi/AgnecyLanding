import app from "@app/components/app/app";
import homePage from "@app/components/pages/home/home";
import contactPage from "@app/components/pages/contact/contact";
import aboutUsPage from "@app/components/pages/about-us/about-us";
import portfolioPage from "@app/components/pages/portfolio/portfolio";

import navigation from "@app/components/navigation/navigation";
import navigationMobile from "@app/components/navigation/mobile/navigation-mobile";
import headerContainer from "@app/components/header-container/header-container";

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