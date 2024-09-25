import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100;
  height: 100vh;
  display: flex; 
  position: relative; 
`;

export const LoginLeft = styled.div`
  width: 60%;
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const LoginImage = styled.img`
  width: 90%;
`;

export const LoginImg = styled.img`
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DivFlavor = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom:10px;
  flex-direction: column;
`;

export const ImgFlavor = styled.img`
  width: 65px; 
  height: 65px;
  border-radius: 25px; 
  object-fit: cover;
`;

export const LoginTitle = styled.h2`
  color: #ffffff;
  font-size: 40px;
  text-align: center;
  flex: 2;
  font-weight: 700;
`;

export const LoginRight = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const LoginBox = styled.div`
  width: 65%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content:center;
  padding: 30px;
  border-radius: 8px;
  z-index:2; 
  margin-left: 130px;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #ffffff;
`;


export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 25px;
  border: 1px solid #d1d9e6;
  border-radius: 4px;
  outline: none;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #EA88AB;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #E0A2B4;
    color: white;
  }
`;
