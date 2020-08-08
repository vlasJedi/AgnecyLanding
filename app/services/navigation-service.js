export default function NavigationService() {
    const constructor = function NavService($location) {
        return {
            getNavItems: () => {
                return [
                {name: "home", path: "home", displayName: "HOME", onClick: () => {}},
                {name: "about-us", path: "about-us", displayName: "ABOUT US", onClick: () => {}},
                {name: "portfolio", path: "portfolio", displayName: "PORTFOLIO", onClick: () => {}},
                {name: "contact", path: "contact", displayName: "CONTACT", onClick: () => {}}
            ];
            },
            navigateTo: (routePath) => {
                $location.path(routePath);
            }
        }
    };
    return {
        serviceId: "navigationService",
        export: ["$location", constructor]
    };
}