import { FC } from 'react';
import styled from 'styled-components';
import { fontSize } from './constants/index';
type Props = { text: string; className?: string };
const Wrapper = styled.p`
  font-size: ${fontSize.m};
`;
export const Text: FC<Props> = ({ text, className = '' }) => {
  return <Wrapper className={className}>{text}</Wrapper>;
};
