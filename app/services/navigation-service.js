export default function NavigationService() {
    return {
        serviceId: "navigationService",
        instance: () => {
            return {
                getNavItems: () => {
                    return [
                    {name: "home", path: "home", displayName: "HOME", onClick: () => {}},
                    {name: "about-us", path: "about-us", displayName: "ABOUT US", onClick: () => {}},
                    {name: "portfolio", path: "portfolio", displayName: "PORTFOLIO", onClick: () => {}},
                    {name: "contact", path: "contact", displayName: "CONTACT", onClick: () => {}}
                ];
                }
            }
        }
    };
}