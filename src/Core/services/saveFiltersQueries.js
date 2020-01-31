const saveFiltersQueries = (category, serach)=> {
    if (category || serach) {
        window.history.replaceState({}, "", `${window.location.pathname}?category=${category}&search=${serach}`);
        localStorage["category"] = category;
        localStorage["search"] = serach;
    } else {
        window.history.replaceState({}, "", "/");
        localStorage.removeItem("category");
        localStorage.removeItem("search");
    }
}

export default saveFiltersQueries;
