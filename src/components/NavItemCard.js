import React, { PureComponent } from 'react';
import {
  Grid,
  Box,
  Link,
  Avatar,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { getSkeletonList } from '../services';

class NavItemCard extends PureComponent {

  /**
   * render nav category item
   * @param  {String} tag_en navList.item_tag_en
   * @return {ReactNode}
   */
  renderNavCard = (tag_en) => {
    const { navList, language } = this.props;
    if (!(navList || []).length) {
      let skeletonList = getSkeletonList();
      return (
        (skeletonList).map((key, index) => (
          <Grid item xs={6} sm={4} md={3} key={`${key}-${index}`}>
            <Box display="flex" flexDirection="row" p={{ xs: 0, sm: 1 }}>
              <Box mr={1}>
                <Skeleton variant="circle" width={30} height={30} />
              </Box>
              <Box flex="1">
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Box>
            </Box>
          </Grid>
        ))
      )
    }
    return (navList || [])
      .filter((item) => item.tag_en.indexOf(tag_en) > -1)
      .map((item, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Link
            color="textPrimary"
            href={`${item.website}?utm_resource=eth123.org`}
            target="_blank"
            underline='none'>
            <Box
              className='cardItem'
              display="flex"
              flexDirection="row"
              p={{ xs: 0, sm: 1 }}
              borderRadius={8}>
              <Box mr={{ xs: 1, sm: 1 }}>
                {this.renderItemLogo(item, language)}
              </Box>
              <Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center">
                  <Typography
                    variant="body1"
                    className="cardItem_title"
                    style={{ fontWeight: 500 }}>
                    {language === 'zh' ? item.name : (item.name_en || item.name)}
                  </Typography>
                </Box>
                <Box style={{ lineHeight: '20px' }}>
                  <Typography
                    variant="caption"
                    style={{ color: '#999', wordBreak: 'break-all' }}>
                    {this.renderDesc(item, language)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        </Grid>
      ));
  }

  // render nav item logo
  renderItemLogo = (item, language) => {
    const { logo, name, name_en } = item;
    const size = 30;
    if (logo) {
      return (
        <Avatar
          style={{
            height: item.logoHeightAuto ? 'auto' : size,
            width: item.logoWidthAuto ? 'auto' : size
          }}
          src={item.logo}
        />
      )
    }
    return (
      <Avatar style={{ height: size, width: size }}>
        {(language === 'zh' ? name : (name_en || name)).slice(0, 1)}
      </Avatar>
    )
  }

  // render item desc
  renderDesc = (item, language) => {
    const { desc, desc_en, website } = item;
    if (language === 'zh' && desc) {
      return desc;
    } else if (language === 'en' && desc_en) {
      return desc_en;
    }
    let url = (website || '').replace(/htt(p|ps):\/\//, '');
    if (url.slice('-1') === '/') {
      url = url.slice(0, url.length - 1);
    }
    return url;
  }

  render() {
    console.log('NavItemCard');
    const { tagList, language } = this.props;
    if (!(tagList || []).length) {
      let skeletonList = getSkeletonList();
      return skeletonList.map((key) => (
        <Box
          bgcolor="white"
          borderRadius={16}
          mb={2}
          key={`${key}-index`}
          px={{ xs: 2, sm: 2, md: 3 }}
        >
          <Box
            py={2}
            border={1}
            borderTop={0}
            borderRight={0}
            borderLeft={0}
            borderColor="grey.100"
          >
            <Skeleton variant="text" width={100} />
          </Box>
          <Box py={{ xs: 2, sm: 2, md: 3 }}>
            <Grid container spacing={2}>
              {this.renderNavCard(key)}
            </Grid>
          </Box>
        </Box>
      ))
    }
    return (tagList || []).slice(1).map((item) => (
      <Box
        bgcolor="white"
        borderRadius={16}
        mb={2}
        key={item.tag_en}
        id={encodeURI(item.tag_en)}
        px={{ xs: 2, sm: 2, md: 3 }}
      >
        <Box
          py={2}
          border={1}
          borderTop={0}
          borderRight={0}
          borderLeft={0}
          borderColor="grey.100"
        >
          <Typography>
            {language === 'zh' ? item.tag : item.tag_en}
          </Typography>
        </Box>
        <Box py={{ xs: 2, sm: 2, md: 3 }}>
          <Grid container spacing={2}>
            {this.renderNavCard(item.tag_en)}
          </Grid>
        </Box>
      </Box>
    ));
  }

}

export default NavItemCard;
