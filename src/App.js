import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';

import { useOnClickOutside } from './useOnClickOutside';

function App() {
  return (
    <NavBar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<CaretIcon />} dropdown={<DropdownMenu />} />
    </NavBar>
  );
}

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const DropdownItem = ({ leftIcon, rightIcon, children, goToMenu }) => {
    return (
      <span
        className="menu-item"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        {leftIcon && <span className="icon-button">{leftIcon}</span>}
        {children}
        {rightIcon && (
          <span className="icon-button icon-right">{rightIcon}</span>
        )}
      </span>
    );
  };

  return (
    <div
      className="dropdown"
      style={{ height: `calc(${menuHeight}px + 2rem)` }}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" />
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

const NavBar = ({ children }) => (
  <nav className="navbar">
    <ul className="navbar-nav">{children}</ul>
  </nav>
);

const NavItem = ({ icon, dropdown }) => {
  const [open, setOpen] = useState(true);
  const navItemRef = useRef(null);
  useOnClickOutside(navItemRef, () => setOpen(false));

  return (
    <li className="nav-item" ref={navItemRef}>
      <span className="icon-button" onClick={() => setOpen((open) => !open)}>
        {icon}
      </span>

      {open && dropdown}
    </li>
  );
};

export default App;
