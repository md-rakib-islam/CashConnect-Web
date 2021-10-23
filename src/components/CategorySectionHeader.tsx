import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FlexBox from "./FlexBox";
import Icon from "./icon/Icon";
import { H2, SemiSpan } from "./Typography";

export interface CategorySectionHeaderProps {
  title?: string;
  seeMoreLink?: string;
  iconName?: string;
  categoryId?: any;
}

const CategorySectionHeader: React.FC<CategorySectionHeaderProps> = ({
  title,
  seeMoreLink,
  iconName,
  categoryId
}) => {
  const router = useRouter()

  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <FlexBox alignItems="center">
        {iconName && (
          <Icon defaultcolor="auto" mr="0.5rem">
            {iconName}
          </Icon>
        )}
        <H2 fontWeight="bold" lineHeight="1">
          {title}
        </H2>
      </FlexBox>

      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <a>
            <FlexBox alignItems="center" ml="0.5rem" color="text.muted">
              <SemiSpan mr="0.5rem">View all</SemiSpan>
              <Icon size="12px" defaultcolor="currentColor">
                right-arrow
              </Icon>
            </FlexBox>
          </a>
        </Link>
      )}
      {categoryId && (<a style={{ cursor: "pointer" }} onClick={() => {
        router.push({
          pathname: '/product/search/search_for',
          query: { categoryId: categoryId },
        })
      }}>
        <FlexBox alignItems="center" ml="0.5rem" color="text.muted">
          <SemiSpan mr="0.5rem">View all</SemiSpan>
          <Icon size="12px" defaultcolor="currentColor">
            right-arrow
          </Icon>
        </FlexBox>
      </a>)}
    </FlexBox>
  );
};

export default CategorySectionHeader;
