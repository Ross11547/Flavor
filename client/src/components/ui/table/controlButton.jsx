import styled from "styled-components";
import { Colors } from '../../../style/colors';

const ControlButton = ({
  icon,
  text,
  btnType = "secondary",
  hideOnScreen = false,
  full,
  ...props
}) => {
  return (
    <StyledButton {...props} btnType={btnType} full={full}>
      {text && (
        <StyledParagraph hideOnScreen={hideOnScreen}>{text}</StyledParagraph>
      )}
      <DivUno>{icon}</DivUno>
    </StyledButton>
  );
};

export default ControlButton;

const DivUno = styled.div`
height: 100%;           
  aspect-ratio: 1 / 1;     
  padding: 0.25rem;   
`;

const StyledButton = styled.button`
  display: flex;
  font-size: 0.875rem;
  border: 1px solid transparent;
  height: 2rem;
  border-radius: 0.5rem;
  align-items: center;
  padding: 0 0.75rem;
  gap: 0.5rem;
  outline: none;
  transition: all 0.3s;
  ring-inset: 0;
  position: relative;

  &:focus {
    ring: 2px solid;
  }

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    background-color: ${Colors.gray200};
    border-color: ${Colors.gray200};
    color:${Colors.primary300};
    opacity: 1;
  }

  ${({ btnType }) =>
    btnType === "secondary"
      ? `
        color: ${Colors.primary700}; 
        background-color:${Colors.primary300}; 
        border-color: ${Colors.gray200}; 
        ring: 2px solid rgba(59, 130, 246, 0.5);
      `
      : `
        color: ${Colors.primary300}; 
        background-color: ${Colors.primary700}; 
        border-color: ${Colors.primary700}; 
        ring: 2px solid ${Colors.primary300}; 
      `}

  ${({ full }) =>
    full &&
    `
      flex: 1; 
      justify-content: center; 
    `}
`;

const StyledParagraph = styled.p`
  white-space: nowrap;
  font-weight: 600;

  ${({ hideOnScreen }) =>
    hideOnScreen &&
    `
      @media (max-width: 1024px) { 
        display: none;
      }
    `}
`;
