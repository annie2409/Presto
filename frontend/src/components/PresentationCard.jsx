import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
  Box,
  CardActions,
  // CardHeader,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { useNavigate } from 'react-router-dom';
import { editPresentationPageFor } from '../utils/routes';

export const PresentationCard = ({ presentation }) => {
  const isSmallScreen = useMediaQuery('(max-width:290px)');
  const isTinyScreen = useMediaQuery('(max-width:230px)');
  const navigation = useNavigate();

  return (
    <Card
      variant="outlined"
      onClick={() => navigation(editPresentationPageFor(presentation.id))}
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
        cursor: 'pointer',
      }}
    >
      <CardContent
        sx={{
          marginTop: '-10px',
        }}
      >
        <Tooltip title={presentation.title}>
          <Typography
            variant="h5"
            sx={{
              maxHeight: '2em',
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1, // Number of lines before truncation
              WebkitBoxOrient: 'vertical',
            }}
          >
            {presentation.title}
          </Typography>
        </Tooltip>
        {!isSmallScreen && (
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
        )}
      </CardContent>

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
