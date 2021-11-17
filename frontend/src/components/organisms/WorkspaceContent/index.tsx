import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import Label from '@atoms/Label';
import LabeledDefaultButton from '@atoms/LabeledDefaultButton';
import ChatHeader from '@molecules/ChatHeader';
import ChatInputBackground from '@organisms/ChatInputBackground';
import ChatContent from '@organisms/ChatContent';
import ChannelJoinFooter from '@organisms/ChannelJoinFooter';
import userState from '@state/user';
import { channelListState } from '@state/Channel';
import { Container, MarginedDiv } from './style';

const getChannelById = (id: string) => {
  const [channel, setChannel] = useState();
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/channels/${id}`);
      setChannel(response.data.channel);
    })();
  }, [id]);

  return { channel /* loading, error */ };
};

const WorkspaceContent = (): JSX.Element => {
  const user = useRecoilValue(userState);
  const [channelList, setChannelList] = useRecoilState(channelListState);

  useEffect(() => {
    if (!user.workspaceId) return;
    const getChannelList = async () => {
      const res = await axios.get(
        `/api/channels/channelsThatUserIn?userId=${user.id}&workspaceId=${user.workspaceId}`,
      );
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, [user.workspaceId]);

  const isUserInCurrentChannel = channelList.find(
    (channel) => String(channel.id) === user.channelId,
  );

  const currentChannel = getChannelById(user.channelId);
  const channelTitleText = currentChannel.channel
    ? currentChannel.channel.name
    : '로딩';

  const ChannelTitle: JSX.Element = <Label text={`# ${channelTitleText}`} />;
  const ExplainContent: JSX.Element | null = (
    <Label color="grey" text="channel explain " />
  );

  const Title: JSX.Element = (
    <MarginedDiv>
      {ChannelTitle}
      {ExplainContent}
    </MarginedDiv>
  );

  const InputBar: JSX.Element = isUserInCurrentChannel ? (
    <ChatInputBackground />
  ) : (
    <ChannelJoinFooter channelName={channelTitleText} />
  );
  const RightButton = (
    <LabeledDefaultButton
      text="무야호"
      onClick={() => {}}
      width={30}
      height={30}
      color={'black'}
      backgroundColor={'white'}
    />
  );

  return (
    <Container>
      <ChatHeader title={Title} content={null} rightButton={RightButton} />
      <ChatContent inputBar={InputBar} />
    </Container>
  );
};

export default WorkspaceContent;
