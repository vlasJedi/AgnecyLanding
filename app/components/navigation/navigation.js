import navigationHTML from "./navigation.html";
export default function Navigation() {
    return {
        template: navigationHTML,
        controller: ["navigationService", function NavigationComtroller(navService) {
            this.navItems = navService.getNavItems();
            this.onClicked = (event, navItem) => {
                this.clickCallback({event: event, navItem: navItem});
            }
        }],
        bindings: {
            clickCallback: "&"
        }
    };
};