import React from 'react';
import styled from 'styled-components';
import PlusFileIcon from './common/icons/items/PlusFileIcon';

interface Props {
  getImages?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: React.FC<Props> = ({ getImages }) => (
  <Label>
    <File type="file" accept="image/*" onChange={getImages} />
    <Icon>
      <PlusFileIcon />
    </Icon>
  </Label>
);

const Label = styled.label`
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: dashed 1px #b4babf;
  background-color: #fcfcfc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Icon = styled.div`
  width: 27px;
  height: 27px;
`;

const File = styled.input`
  display: none;
`;

export default InputFile;
