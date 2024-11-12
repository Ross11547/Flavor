import React from 'react'
import styled from 'styled-components';
import { Colors } from '../../style/colors';

const PageContainer = ({ tittle, children }) => {
    return (
        <ContainerGeneral>
            <TituloGeneral>{tittle}</TituloGeneral>
            {children}
        </ContainerGeneral>
    )
}

export default PageContainer

const ContainerGeneral = styled.div`
  width: 100%;
  height: 100%;
`;

const TituloGeneral = styled.h1`
  color: ${Colors.secundary100};
  font-weight: bold;
  font-size: 50px;
`;