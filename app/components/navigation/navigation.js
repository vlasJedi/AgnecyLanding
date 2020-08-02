import navigationHTML from "./navigation.html";
export default function Navigation() {
    return {
        template: navigationHTML,
        controller: ["navigationService", function NavigationComtroller(navService) {
            this.navItems = navService.getNavItems();
            this.onClicked = event => this.onClick(event);
        }],
        bindings: {
            onClick: "&"
        }
    };
};