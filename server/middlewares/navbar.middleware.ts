import { Request } from 'express';

//        _   _____ _    __   __  __________    ____  __________
//       / | / /   | |  / /  / / / / ____/ /   / __ \/ ____/ __ \
//      /  |/ / /| | | / /  / /_/ / __/ / /   / /_/ / __/ / /_/ /
//     / /|  / ___ | |/ /  / __  / /___/ /___/ ____/ /___/ _, _/
//    /_/ |_/_/  |_|___/  /_/ /_/_____/_____/_/   /_____/_/ |_|
//
// Class to create objects which pass data to
// the handlebars templates for them to interact
// with said data
export type DataObject = {
    props: unknown; // Property information to pass to the renderer
    navbar: unknown; // Navbar section to highlight
    assignNavActive(req: Request): void; // Method assign nav
    action: unknown; // Action that we are perfonming
    session: unknown; // Cookie handler
    assignSession(req: Request): void; // Method assign cookie to data object
};

export const data = {} as DataObject;

data.assignSession = (req: Request): void => {
    const userid = req.session?.userId;
    const loggedUser = req.session?.loggedUser;
    data.session = { userid, loggedUser };
};

data.assignNavActive = (req: Request): void => {
    // extract the last word of the url path
    const navActive = req.path.slice(req.path.lastIndexOf('/') + 1);
    console.log(navActive);
    data.navbar = { [navActive]: true };
};
