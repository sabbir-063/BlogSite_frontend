import { useNavigate } from "react-router-dom";

const navigateLinks = {
    home: '/',
    services: '/services',
    about: '/about',
    contact: '/contact',
    blog: '/blog',
    login: '/login',
    register: '/register',
};

const useNavigation = (path) => {
    const navigate = useNavigate();
    if (path === navigateLinks.home) navigate(navigateLinks.home);
    else if (path === navigateLinks.services) navigate(navigateLinks.services);
    else if (path === navigateLinks.about) navigate(navigateLinks.about);
    else if (path === navigateLinks.contact) navigate(navigateLinks.contact);
    else if (path === navigateLinks.blog) navigate(navigateLinks.blog);
    else if (path === navigateLinks.login) navigate(navigateLinks.login);
    else if (path === navigateLinks.register) navigate(navigateLinks.register);
    else navigate(navigateLinks.home);
};

export default useNavigation;