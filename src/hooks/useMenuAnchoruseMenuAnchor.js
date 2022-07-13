import { useState } from 'react';

const useMenuAnchor = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const toggleMenu = (e) => setAnchorEl(e.currentTarget);

    const handleClose = () => {
        setAnchorEl(null);
    };
    return { anchorEl, openMenu, toggleMenu, handleClose };
};

export default useMenuAnchor;