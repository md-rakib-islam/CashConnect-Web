import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
  categoryId,
}) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);

  const boxStyle = {
    cursor: "pointer",
    backgroundColor: isHover ? "#e84262" : "#ffffff",
    borderRadius: isHover ? "5px" : "5px",
    transition: isHover ? "background 1s" : "background 2s",
  };
  const textStyle = {
    color: isHover ? "#ffffff" : "#7D879C",
    transition: isHover ? "color 1s" : "color 3s",
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

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
          <a
            style={boxStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FlexBox
              p={"5px"}
              style={textStyle}
              alignItems="center"
              ml="0.5rem"
            >
              <SemiSpan style={textStyle} mr="0.5rem">
                View all
              </SemiSpan>
              <Icon size="12px" style={textStyle}>
                right-arrow
              </Icon>
            </FlexBox>
          </a>
        </Link>
      )}
      {categoryId && (
        <a
          style={boxStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            router.push({
              pathname: "/product/search/search_for",
              query: { categoryId: categoryId },
            });
          }}
        >
          <FlexBox p={"5px"} alignItems="center" ml="0.5rem" style={textStyle}>
            <SemiSpan style={textStyle} mr="0.5rem">
              View all
            </SemiSpan>
            <Icon size="12px" style={textStyle}>
              right-arrow
            </Icon>
          </FlexBox>
        </a>
      )}
    </FlexBox>
  );
};

export default CategorySectionHeader;
