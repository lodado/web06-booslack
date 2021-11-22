import React, { Suspense, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WorkspaceHeader from '@organisms/WorkspaceHeader';
import WorkspaceSidebar from '@organisms/WorkspaceSidebar';
import CreateChannelModal from '@organisms/CreateChannelModal';
import ChannelInfoModal from '@organisms/ChannelInfoModal';
import ChannelDescriptionModal from '@organisms/ChannelDescriptionModal';
import SidebarChannelInfoModal from '@organisms/SidebarChannelInfoModal';
import PreferenceModal from '@organisms/PreferenceModal';
import {
  channelCreateModalState,
  channelDescriptionModalState,
  channelInfoModalState,
  preferenceModalState,
  sidebarChannelInfoModalState,
} from '@state/modal';
import { useWorkspaceQuery } from '@hook/useWorkspace';
import userState from '@state/user';
import { RowDiv } from './styles';

interface Props {
  Content: JSX.Element;
}

const WorkspaceTemplate = ({ Content }: Props): JSX.Element => {
  const channelCreateModal = useRecoilValue(channelCreateModalState);
  const channelInfoModal = useRecoilValue(channelInfoModalState);
  const channelDescriptionModal = useRecoilValue(channelDescriptionModalState);
  const sidebarChannelModal = useRecoilValue(sidebarChannelInfoModalState);
  const preferenceModal = useRecoilValue(preferenceModalState);

  const { workspaceId, channelId }: { workspaceId: string; channelId: string } =
    useParams();
  const [user, setUser] = useRecoilState(userState);
  useWorkspaceQuery(workspaceId);

  useEffect(() => {
    const getUserHasWorkspace = async () => {
      const res = await axios.get(
        `/api/userHasWorkspaces?userId=${user.id}&workspaceId=${workspaceId}`,
      );
      const { id, nickname, description, theme } = res.data.userHasWorkspace;

      setUser((prevState) => ({
        ...prevState,
        userHasWorkspaceId: id,
        nickname,
        description,
        theme,
      }));
    };
    getUserHasWorkspace();
  }, [workspaceId]);

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <WorkspaceHeader />
        <RowDiv>
          <WorkspaceSidebar />
          {Content}
        </RowDiv>
      </Suspense>
      {channelCreateModal && <CreateChannelModal />}
      {channelInfoModal && <ChannelInfoModal />}
      {channelDescriptionModal && <ChannelDescriptionModal />}
      {sidebarChannelModal && <SidebarChannelInfoModal />}
      {preferenceModal && <PreferenceModal />}
    </>
  );
};

export default WorkspaceTemplate;
