import { BASE_URL, Site_Setting_All } from '@data/constants';
import React, { useEffect, useState } from 'react';
import Container from '../Container';
import FlexBox from '../FlexBox';
import Icon from '../icon/Icon';
import Image from '../Image';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import NavLink from '../nav-link/NavLink';
import { Small } from '../Typography';
import StyledTopbar from './Topbar.style';

const Topbar: React.FC = () => {
  const [currency, setCurrency] = useState(currencyList[0]);
  const [language, setLanguage] = useState(languageList[0]);

  const [logo, setLogo] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  const handleCurrencyClick = (curr) => () => {
    setCurrency(curr);
  };

  const handleLanguageClick = (lang) => () => {
    setLanguage(lang);
  };


  useEffect(() => {
    fetch(`${Site_Setting_All}`).then(res => res.json()).then(res => {
      const data = res?.general_settings[0]
      setLogo(data?.logo)
      setPhone(data?.phone)
      setEmail(data?.email)
    })
  }, [])

  return (
    <StyledTopbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <FlexBox className="topbar-left">
          <div className="logo">
            <img src={`${BASE_URL}${logo}`} alt="logo" height="30" width="auto" style={{ borderRadius: "50%" }} />
          </div>
          <FlexBox alignItems="center">
            <Icon size="14px">phone-call</Icon>
            <span>{phone}</span>
          </FlexBox>
          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px">mail</Icon>
            <span>{email}</span>
          </FlexBox>
        </FlexBox>
        <FlexBox className="topbar-right" alignItems="center">
          <NavLink className="link" href="/faq">
            Theme FAQ"s
          </NavLink>
          <NavLink className="link" href="/help">
            Need Help?
          </NavLink>
          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
                mr="1.25rem"
              >
                <Image src={language.imgUrl} alt={language.title} />
                <Small fontWeight="600">{language.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {languageList.map((item) => (
              <MenuItem key={item.title} onClick={handleLanguageClick(item)}>
                <Image
                  src={item.imgUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>
          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
              >
                <Image src={currency.imgUrl} alt={currency.title} />
                <Small fontWeight="600">{currency.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {currencyList.map((item) => (
              <MenuItem key={item.title} onClick={handleCurrencyClick(item)}>
                <Image
                  src={item.imgUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>
        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};

const languageList = [
  {
    title: 'EN',
    imgUrl: '/assets/images/flags/usa.png',
  },
  {
    title: 'BN',
    imgUrl: '/assets/images/flags/bd.png',
  },
  {
    title: 'HN',
    imgUrl: '/assets/images/flags/in.png',
  },
];

const currencyList = [
  {
    title: 'USD',
    imgUrl: '/assets/images/flags/usa.png',
  },
  {
    title: 'EUR',
    imgUrl: '/assets/images/flags/uk.png',
  },
  {
    title: 'BDT',
    imgUrl: '/assets/images/flags/bd.png',
  },
  {
    title: 'INR',
    imgUrl: '/assets/images/flags/in.png',
  },
];

export default Topbar;
