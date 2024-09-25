// Layout.js
import React from 'react';
import styled from 'styled-components';
import Nav from '../../components/nav';


const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const Layout = () => {
    return (
        <>
            <Nav />
            <main>
                <nav>
                    <button
                    >
                        Cerrar sesion
                    </button>
                    <Content />
                </nav>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
