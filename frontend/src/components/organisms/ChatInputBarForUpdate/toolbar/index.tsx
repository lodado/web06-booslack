import React, { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCodeSlash,
  BsLink45Deg,
  BsBlockquoteLeft,
  BsEmojiSmile,
} from 'react-icons/bs';
import {
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdSend,
} from 'react-icons/md';
import { BiCodeBlock } from 'react-icons/bi';
import {
  Container,
  ToolbarMiddle,
  ToolbarSuffix,
  ToolBarIconButton,
} from './styles';

interface Props {
  threadId: string;
  message: string;
  focused: boolean;
  setUpdateState: Dispatch<SetStateAction<boolean>>;
}

const updateMessage = async (
  threadId: string,
  message: string,
  setUpdateState: Dispatch<SetStateAction<boolean>>,
): Promise<any> => {
  const res = await axios.put(`/api/threads/${threadId}`, {
    message,
  });
  if (res.status === 200) {
    setUpdateState(false);
  }
};

const Toolbar = ({
  threadId,
  message,
  focused,
  setUpdateState,
}: Props): JSX.Element => {
  const sendable = message !== '<p><br></p>' && message.length > 8;

  return (
    <Container>
      <ToolbarMiddle focused={focused}>
        <ToolBarIconButton onClick={() => {}} icon={BsTypeBold} />
        <ToolBarIconButton onClick={() => {}} icon={BsTypeItalic} />
        <ToolBarIconButton onClick={() => {}} icon={BsTypeStrikethrough} />
        <ToolBarIconButton onClick={() => {}} icon={BsCodeSlash} />
        <ToolBarIconButton onClick={() => {}} icon={BsLink45Deg} />
        <ToolBarIconButton onClick={() => {}} icon={BsLink45Deg} />
        <ToolBarIconButton onClick={() => {}} icon={MdFormatListNumbered} />
        <ToolBarIconButton onClick={() => {}} icon={MdFormatListBulleted} />
        <ToolBarIconButton onClick={() => {}} icon={BsBlockquoteLeft} />
        <ToolBarIconButton onClick={() => {}} icon={BiCodeBlock} />
      </ToolbarMiddle>
      <ToolbarSuffix>
        <ToolBarIconButton onClick={() => {}} icon={BsEmojiSmile} />
        {/* 파일 붙이기는 나중에 인풋 타입으로 바꿔야함  */}
        <ToolBarIconButton
          onClick={() => {
            updateMessage(threadId, message, setUpdateState);
          }}
          icon={MdSend}
          className={sendable ? 'sendButtonActive' : 'sendButtonDisable'}
          disabled={!sendable}
        />
      </ToolbarSuffix>
    </Container>
  );
};

export default Toolbar;