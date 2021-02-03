import navigationHTML from "./navigation.html";
import './navigation.scss';
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