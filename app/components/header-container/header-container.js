import headerHTML from "./header-container.html";
export default function HeaderContainer() {
    return {
        template: headerHTML,
        controller: ["navigationService", function HeaderContainerController(navigationService){
            this.changeLocationPathTo = function(event, navDTO) {navigationService.navigateTo(navDTO.path)};
        }]
    };
};