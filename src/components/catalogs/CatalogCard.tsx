import React, { ReactNode } from 'react';
import styled from 'styled-components';

import useLanguage from '@/components/common/hooks/useLanguage';

import checkLn from '@/utils/categoryLn';

interface Category {
  id: number;
  name: string;
  image_url: string;
  thumbnail_url: string;
  trasnlatedName?: string;
}

interface Props {
  icon?: ReactNode;
  data: Category;
}

const CatalogCard: React.FC<Props> = ({ data, icon }) => {
  const [{ catalogs }] = useLanguage();

  return (
    <Wrapper>
      <BackgroundImg src={data.thumbnail_url} alt={data.name} />
      <View>
        <Text>{data.trasnlatedName ? data.trasnlatedName : checkLn(data.name, catalogs)}</Text>
        {icon}
      </View>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 6px;
  height: 72px;
  display: flex;
  cursor: pointer;
`;

const BackgroundImg = styled.img`
  max-width: 96px;
  min-width: 96px;
  border-radius: 6px 0px 0px 6px;
  object-fit: cover;
  background: #dbdbdb;
`;

const View = styled.div`
  border: solid 1px #dae1e8;
  border-radius: 0px 6px 6px 0px;
  border-left: none;
  padding: 13px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #21272e;
`;

export default CatalogCard;
