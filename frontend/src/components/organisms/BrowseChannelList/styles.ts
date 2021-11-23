import { RoundScrollBar } from '@global/mixin';
import BrowseChannelHeader from '@molecules/BrowseChannelHeader';
import styled from 'styled-components';

interface Props {
  width?: number;
}

export const Container = styled.div<Props>`
  display: flex;

  width: ${({ width }) => {
    if (width) return `${width}vw`;
    return 'inherit';
  }};
  flex-direction: column;
`;

export const ScrollBox = styled.div<Props>`
  width: ${({ width }) => {
    if (width) return `${width}vw`;
    return 'inherit';
  }};
`;

export const MarginBottomDiv = styled.div<{ margin?: number }>`
  margin-bottom: ${({ margin }) => margin || 2}vh;
`;

export const CenterAlignedDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ChannelListBackground = styled.div<Props>`
  height: 80vh;
  max-height: inherit;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${RoundScrollBar}
  overflow: scroll;
  overflow-x: hidden;
`;

export const MarginedDiv = styled.div`
  display: flex;
  position: relative;

  & > button {
    margin: 0 5px 0 5px;
  }
`;

export const StyledBrowseChannelHeader = styled(BrowseChannelHeader)`
  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  border-bottom 1px solid rgba(0, 0, 0, 0.12);
`;

export default Container;
