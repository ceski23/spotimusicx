import styled from '@emotion/styled';

export const Button = styled('button')`
  text-transform: uppercase;
  padding: 15px 30px;
  font-weight: 600;
  background: #484848;
  border: none;
  border-radius: 50px;
  color: rgba(255, 255, 255, 0.74);
  margin-top: 40px;
  transition: 0.3s;
  cursor: pointer;
  box-shadow: 0 0 10px #00000026;
  outline: none;

  &:hover {
    box-shadow: 0 5px 15px #0000005c;
    transform: scale(1.1);
  }
`;
