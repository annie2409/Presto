import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Box,
  CardActions,
  CardHeader,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';

export const PresentationCard = ({ presentation }) => {
  const isSmallScreen = useMediaQuery('(max-width:300px)');
  const isTinyScreen = useMediaQuery('(max-width:230px)');
  console.log(isSmallScreen);

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minWidth: 100, // Set the minimum width
        maxWidth: 300, // Set the maximum width
        aspectRatio: 2,
        overflow: 'hidden',
        backgroundImage:
          presentation.getThumbnail() === null
            ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiZGBgaGAgAjAxEAlGFVJHIUAAAABJRU5ErkJggg==")'
            : 'todo',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Tooltip title={presentation.title}>
        <CardHeader
          title={presentation.title}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1, // Number of lines before truncation
            WebkitBoxOrient: 'vertical',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        ></CardHeader>
      </Tooltip>

      {!isSmallScreen && (
        <CardContent
          sx={{
            marginTop: '-30px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              maxHeight: '3em',
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2, // Number of lines before truncation
              WebkitBoxOrient: 'vertical',
            }}
          >
            {presentation.description}
          </Typography>
        </CardContent>
      )}
      {!isTinyScreen && (
        <CardActions>
          <Box display={'flex'} alignItems={'center'} marginTop={'0.5em'}>
            <Tooltip title="Number of slides" arrow>
              <SlideshowIcon aria-label="number-of-slides" />
            </Tooltip>
            {presentation.slides.length}
          </Box>
        </CardActions>
      )}
    </Card>
  );
};
