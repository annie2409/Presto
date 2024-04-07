import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { updateStore } from '../apis/store';
import { useMutation } from 'react-query';
import { useUserDataContext } from '../context/UserDataContext';
import {
  SLIDE_ELEMENT_CODE,
  SLIDE_ELEMENT_IMAGE,
  SLIDE_ELEMENT_TEXT,
  SLIDE_ELEMENT_VIDEO,
} from '../utils/constants';
import { Delete, ModeEdit } from '@mui/icons-material';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import c from 'highlight.js/lib/languages/c';
import { useTheme } from '@mui/material/styles';
import Dropdown from './Dropdown';

const PaperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const EditElementToolContainer = styled.div`
  position: relative;
`;

export const Slide = ({ presentationId, slideNumber, slideData }) => {
  const theme = useTheme();
  const defaultFontFamily = [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ];

  const { userData, updateUserData } = useUserDataContext();

  const [showEditElementModal, setShowEditElementModal] = useState(false);
  const [elementUpdateErrorMessage, setElementUpdateErrorMessage] =
    useState('');
  const [modalElementToEdit, setModalElementToEdit] = useState('');
  const [elementToEditIdx, setElementToEditIdx] = useState(null);

  const [editTextElementWidth, setEditTextElementWidth] = useState(null);
  const [editTextElementHeight, setEditTextElementHeight] = useState(null);
  const [editTextElementText, setEditTextElementText] = useState('');
  const [editTextElementFontSize, setEditTextElementFontSize] = useState(null);
  const [editTextElementColor, setEditTextElementFontColor] = useState(null);
  const [editTextElementFontFamily, setEditTextElementFontFamily] =
    useState(null);

  const [editElementPosX, setEditElementPosX] = useState(null);
  const [editElementPosY, setEditElementPosY] = useState(null);

  const [editImageElementWidth, setEditImageElementWidth] = useState(null);
  const [editImageElementHeight, setEditImageElementHeight] = useState(null);
  const [editImageElementSrc, setEditImageElementSrc] = useState('');
  const [editImageElementDescription, setEditImageElementDescription] =
    useState('');

  const [editVideoElementWidth, setEditVideoElementWidth] = useState(null);
  const [editVideoElementHeight, setEditVideoElementHeight] = useState(null);
  const [editVideoElementSrc, setEditVideoElementSrc] = useState('');
  const [editVideoElementShouldAutoplay, setEditVideoElementShouldAutoplay] =
    useState(null);

  const [editCodeElementWidth, setEditCodeElementWidth] = useState(null);
  const [editCodeElementText, setEditCodeElementText] = useState(null);
  const [editCodeElementHeight, setEditCodeElementHeight] = useState(null);
  const [editCodeElementFontSize, setEditCodeElementFontSize] = useState(null);

  const [showElementEditTools, setShowElementEditTools] = useState(false);

  const { mutate, isLoading } = useMutation(updateStore, {
    onError: (data) => {
      setElementUpdateErrorMessage(data.message);
    },
  });

  useEffect(() => {
    hljs.highlightAll();
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('c', c);
  }, [slideData, slideNumber]);

  const deleteElement = (idx) => {
    userData
      .getPresentationById(presentationId)
      .getSlideByIndex(slideNumber - 1)
      .elements.splice(idx, 1);
    mutate(userData.toJSON());
    updateUserData(userData);
  };

  const getEditElementModalTitle = () => {
    switch (modalElementToEdit) {
      case SLIDE_ELEMENT_TEXT:
        return 'Edit TEXT';
      case SLIDE_ELEMENT_IMAGE:
        return 'Edit IMAGE';
      case SLIDE_ELEMENT_VIDEO:
        return 'Edit VIDEO';
      case SLIDE_ELEMENT_CODE:
        return 'Edit CODE';
    }
    return 'Unkonwn';
  };

  const closeEditElementModal = () => {
    setShowEditElementModal(false);
  };

  const handleElementUpdate = (e) => {
    e.preventDefault();
    console.log(userData);
    const currentElement = userData
      .getPresentationById(presentationId)
      .getSlideByIndex(slideNumber - 1).elements[elementToEditIdx];

    currentElement.x = editElementPosX;
    currentElement.y = editElementPosY;

    if (modalElementToEdit === SLIDE_ELEMENT_TEXT) {
      currentElement.text = editTextElementText;
      currentElement.fontColor = editTextElementColor;
      currentElement.fontSize = editTextElementFontSize;
      currentElement.height = editTextElementHeight;
      currentElement.width = editTextElementWidth;
      currentElement.fontFamily = editTextElementFontFamily;
    } else if (modalElementToEdit === SLIDE_ELEMENT_IMAGE) {
      currentElement.src = editImageElementSrc;
      currentElement.description = editImageElementDescription;
      currentElement.height = editImageElementHeight;
      currentElement.width = editImageElementWidth;
    } else if (modalElementToEdit === SLIDE_ELEMENT_VIDEO) {
      currentElement.src = editVideoElementSrc;
      currentElement.shouldAutoPlay = editVideoElementShouldAutoplay;
      currentElement.height = editVideoElementHeight;
      currentElement.width = editVideoElementWidth;
    }

    mutate(userData.toJSON());
    updateUserData(userData);
    closeEditElementModal();
  };

  let background = '';
  if (userData) {
    const presentation = userData.getPresentationById(presentationId);
    if (presentation) {
      const slide = presentation.getSlideByIndex(slideNumber - 1);
      if (slide && slide.background) {
        background = slide.background;
      } else if (presentation.defaultTheme) {
        background = presentation.defaultTheme;
      }
    }
  }
  console.log(background, userData);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: '75%',
          height: '65%',
          backgroundColor: background,
          backgroundImage: background,
        }}
      >
        <PaperContainer>
          {slideData.elements.map((ele, index) => {
            if (ele.type === SLIDE_ELEMENT_TEXT) {
              return (
                <Box
                  onContextMenu={(e) => {
                    e.preventDefault();
                    deleteElement(index);
                  }}
                  key={index}
                  position={'absolute'}
                  width={`${ele.width}%`}
                  height={`${ele.height}%`}
                  top={`${parseInt(ele.x)}%`}
                  left={`${parseInt(ele.y)}%`}
                  overflow={'hidden'}
                  textOverflow={'clip'}
                  border={'0.75px solid #ddd'}
                  zIndex={index}
                  onDoubleClick={() => {
                    setElementToEditIdx(index);
                    setModalElementToEdit(ele.type);
                    setEditTextElementFontColor(ele.fontColor);
                    setEditTextElementFontSize(ele.fontSize);
                    setEditTextElementHeight(ele.height);
                    setEditTextElementWidth(ele.width);
                    setEditTextElementText(ele.text);
                    setShowEditElementModal(true);
                    setEditElementPosX(ele.x);
                    setEditElementPosY(ele.y);
                    setEditTextElementFontFamily(ele.fontFamily);
                  }}
                >
                  {ele.fontFamily && (
                    <Typography
                      key={index}
                      fontSize={`${ele.fontSize}em`}
                      color={ele.fontColor}
                      textOverflow={'clip'}
                      sx={{
                        fontFamily: `${ele.fontFamily}`,
                      }}
                    >
                      {ele.text}
                    </Typography>
                  )}
                  {!ele.fontFamily && (
                    <Typography
                      key={index}
                      fontSize={`${ele.fontSize}em`}
                      color={ele.fontColor}
                      textOverflow={'clip'}
                    >
                      {ele.text}
                    </Typography>
                  )}
                </Box>
              );
            } else if (ele.type === SLIDE_ELEMENT_IMAGE) {
              return (
                <Box
                  key={index}
                  position={'absolute'}
                  top={`${parseInt(ele.x)}%`}
                  left={`${parseInt(ele.y)}%`}
                  width={`${ele.width}%`}
                  height={`${ele.height}%`}
                  zIndex={index}
                  onDoubleClick={() => {
                    setElementToEditIdx(index);
                    setModalElementToEdit(ele.type);
                    setEditImageElementDescription(ele.description);
                    setEditImageElementHeight(ele.height);
                    setEditImageElementWidth(ele.width);
                    setEditImageElementSrc(ele.src);
                    setShowEditElementModal(true);
                    setEditElementPosX(ele.x);
                    setEditElementPosY(ele.y);
                  }}
                  onContextMenu={() => deleteElement(index)}
                >
                  <img
                    src={ele.src}
                    alt={ele.description}
                    width={'100%'}
                    height={'100%'}
                  />
                </Box>
              );
            } else if (ele.type === SLIDE_ELEMENT_VIDEO) {
              const url = `${ele.src}?&autoplay=${ele.shouldAutoPlay ? 1 : 0}`;
              return (
                <Box
                  key={index}
                  position={'absolute'}
                  top={`${parseInt(ele.x)}%`}
                  left={`${parseInt(ele.y)}%`}
                  width={`${ele.width}%`}
                  height={`${ele.height}%`}
                  zIndex={index}
                  onMouseEnter={() => setShowElementEditTools(true)}
                  onMouseLeave={() => setShowElementEditTools(false)}
                  onDoubleClick={() => {
                    setElementToEditIdx(index);
                    setModalElementToEdit(ele.type);
                    setEditImageElementDescription(ele.description);
                    setEditImageElementHeight(ele.height);
                    setEditImageElementWidth(ele.width);
                    setEditImageElementSrc(ele.src);
                    setShowEditElementModal(true);
                    setEditElementPosX(ele.x);
                    setEditElementPosY(ele.y);
                  }}
                >
                  <iframe
                    allow="autoplay"
                    width={'100%'}
                    height={'100%'}
                    src={url}
                    allowfullscreen
                  ></iframe>

                  {showElementEditTools && (
                    <EditElementToolContainer>
                      <IconButton
                        position={'absolute'}
                        top={0}
                        left={0}
                        zIndex={index + 1}
                        onClick={() => {
                          setElementToEditIdx(index);
                          setModalElementToEdit(ele.type);
                          setEditImageElementDescription(ele.description);
                          setEditImageElementHeight(ele.height);
                          setEditImageElementWidth(ele.width);
                          setEditImageElementSrc(ele.src);
                          setShowEditElementModal(true);
                          setEditElementPosX(ele.x);
                          setEditElementPosY(ele.y);
                        }}
                      >
                        <ModeEdit />
                      </IconButton>
                      <IconButton
                        aria-label="delete-element"
                        onClick={() => deleteElement(index)}
                      >
                        <Delete />
                      </IconButton>
                    </EditElementToolContainer>
                  )}
                </Box>
              );
            } else if (ele.type === SLIDE_ELEMENT_CODE) {
              return (
                <Box
                  key={index}
                  position={'absolute'}
                  top={`${parseInt(ele.x)}%`}
                  left={`${parseInt(ele.y)}%`}
                  width={`${ele.width}%`}
                  height={`${ele.height}%`}
                  fontSize={`${ele.fontSize}em`}
                  zIndex={index}
                  onDoubleClick={() => {
                    setElementToEditIdx(index);
                    setModalElementToEdit(ele.type);
                    setEditCodeElementHeight(ele.height);
                    setEditCodeElementWidth(ele.width);
                    setEditCodeElementFontSize(ele.fontSize);
                    setEditCodeElementText(ele.code);
                    setShowEditElementModal(true);
                    setEditElementPosX(ele.x);
                    setEditElementPosY(ele.y);
                  }}
                  onContextMenu={() => deleteElement(index)}
                >
                  <pre>
                    <code>{ele.code}</code>
                  </pre>
                </Box>
              );
            } else {
              return <div key={index}>Unknown type</div>;
            }
          })}
          <Box
            maxWidth={50}
            maxHeight={50}
            position={'absolute'}
            bottom={0}
            left={0}
          >
            <Typography fontSize={'1em'}>{slideNumber}</Typography>
          </Box>
        </PaperContainer>
      </Paper>
      <Modal open={showEditElementModal} onClose={closeEditElementModal}>
        <form onSubmit={handleElementUpdate}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              minWidth: 400,
              width: '60%',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              justifyContent: 'center',
              alignContent: 'center',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign={'center'}
            >
              {getEditElementModalTitle()}
            </Typography>
            {elementUpdateErrorMessage !== '' && (
              <Alert severity="error">{elementUpdateErrorMessage}</Alert>
            )}
            <Grid
              container
              spacing={2}
              justifyContent={'center'}
              direction={'row'}
              alignItems={'center'}
              columns={16}
            >
              <Grid item xs={16} sm={8}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignContent={'center'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Typography marginRight={2}>X:</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Width (%)"
                    type="number"
                    required={true}
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                    name="posXOfNewElementTextArea"
                    value={editElementPosX}
                    onChange={(e) => setEditElementPosX(e.target.value)}
                    margin="normal"
                    tabIndex={0}
                    autoFocus
                  />
                </Box>
              </Grid>
              <Grid item xs={16} sm={8}>
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignContent={'center'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                >
                  <Typography marginRight={2}>Y:</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Width (%)"
                    type="number"
                    required={true}
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                    name="posYOfNewElementTextArea"
                    value={editElementPosY}
                    onChange={(e) => setEditElementPosY(e.target.value)}
                    margin="normal"
                    tabIndex={1}
                    autoFocus
                  />
                </Box>
              </Grid>
            </Grid>
            {modalElementToEdit === SLIDE_ELEMENT_TEXT && (
              <Grid
                container
                spacing={2}
                justifyContent={'center'}
                direction={'row'}
                alignItems={'center'}
                columns={16}
              >
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Width:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Width (%)"
                      type="number"
                      required={true}
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="widthOfNewElementTextArea"
                      value={editTextElementWidth}
                      onChange={(e) => setEditTextElementWidth(e.target.value)}
                      margin="normal"
                      tabIndex={2}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Height:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Height (%)"
                      required={true}
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="heightOfNewElementTextArea"
                      value={editTextElementHeight}
                      onChange={(e) => setEditTextElementHeight(e.target.value)}
                      margin="normal"
                      tabIndex={3}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Font size:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Size (em)"
                      type="number"
                      required={true}
                      name="fontSizeOfNewElementTextArea"
                      value={editTextElementFontSize}
                      onChange={(e) =>
                        setEditTextElementFontSize(e.target.value)
                      }
                      margin="normal"
                      tabIndex={4}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Font color:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Color (HEX code)"
                      required={true}
                      name="colorOfNewElementTextArea"
                      value={editTextElementColor}
                      onChange={(e) =>
                        setEditTextElementFontColor(e.target.value)
                      }
                      margin="normal"
                      tabIndex={5}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    fullWidth
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Font Family:</Typography>
                    <Dropdown
                      title={'Select a font family'}
                      options={defaultFontFamily}
                      onSelect={setEditTextElementFontFamily}
                      preSelect={editTextElementFontFamily}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Text:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Text to display"
                      required={true}
                      name="textOfNewElementTextArea"
                      value={editTextElementText}
                      onChange={(e) => setEditTextElementText(e.target.value)}
                      margin="normal"
                      tabIndex={6}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            {modalElementToEdit === SLIDE_ELEMENT_IMAGE && (
              <Grid
                container
                spacing={2}
                justifyContent={'center'}
                direction={'row'}
                alignItems={'center'}
                columns={16}
              >
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Width:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Width (%)"
                      type="number"
                      required={true}
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="widthOEditElementImageArea"
                      value={editImageElementWidth}
                      onChange={(e) => setEditImageElementWidth(e.target.value)}
                      margin="normal"
                      tabIndex={2}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Height:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Height (%)"
                      required={true}
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="heightOfNewElementImageArea"
                      value={editImageElementHeight}
                      onChange={(e) =>
                        setEditImageElementHeight(e.target.value)
                      }
                      margin="normal"
                      tabIndex={3}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Image source:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="URL or base64 image string encoding"
                      required={true}
                      name="imageSrc"
                      value={editImageElementSrc}
                      onChange={(e) => setEditImageElementSrc(e.target.value)}
                      margin="normal"
                      tabIndex={4}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Description:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Image description"
                      required={true}
                      name="imageDescription"
                      value={editImageElementDescription}
                      onChange={(e) =>
                        setEditImageElementDescription(e.target.value)
                      }
                      margin="normal"
                      tabIndex={5}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            {modalElementToEdit === SLIDE_ELEMENT_VIDEO && (
              <Grid
                container
                spacing={2}
                justifyContent={'center'}
                direction={'row'}
                alignItems={'center'}
                columns={16}
              >
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Width:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Width (%)"
                      type="number"
                      required={true}
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="videoWidth"
                      value={editVideoElementWidth}
                      onChange={(e) => setEditVideoElementWidth(e.target.value)}
                      margin="normal"
                      tabIndex={2}
                      autoFocus
                    />
                  </Box>
                </Grid>
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Height:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Height (%)"
                      required={true}
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="videoHeight"
                      value={editVideoElementHeight}
                      onChange={(e) =>
                        setEditVideoElementHeight(e.target.value)
                      }
                      margin="normal"
                      tabIndex={3}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Youtube source:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Youtube embeded URL"
                      required={true}
                      name="videoSrc"
                      value={editVideoElementSrc}
                      onChange={(e) => setEditVideoElementSrc(e.target.value)}
                      margin="normal"
                      tabIndex={4}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Should autoplay:</Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          label="Indicate whether the video will auto play or not"
                          tabIndex={5}
                          margin="normal"
                          checked={editVideoElementShouldAutoplay}
                          onChange={(e) =>
                            setEditVideoElementShouldAutoplay(e.target.checked)
                          }
                        />
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            {modalElementToEdit === SLIDE_ELEMENT_CODE && (
              <Grid
                container
                spacing={2}
                justifyContent={'center'}
                direction={'row'}
                alignItems={'center'}
                columns={16}
              >
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Width:</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Width (%)"
                      type="number"
                      required={true}
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="codeBlockWidth"
                      value={editCodeElementWidth}
                      onChange={(e) => setEditCodeElementWidth(e.target.value)}
                      margin="normal"
                      tabIndex={2}
                      autoFocus
                    />
                  </Box>
                </Grid>
                <Grid item xs={16} sm={8}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Height:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Height (%)"
                      required={true}
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      name="codeBlockHeight"
                      value={editCodeElementHeight}
                      onChange={(e) => setEditCodeElementHeight(e.target.value)}
                      margin="normal"
                      tabIndex={3}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Font size:</Typography>
                    <TextField
                      variant="outlined"
                      fullWidth
                      placeholder="Size (em)"
                      type="number"
                      required={true}
                      name="codeBlockFontSize"
                      value={editCodeElementFontSize}
                      onChange={(e) =>
                        setEditCodeElementFontSize(e.target.value)
                      }
                      margin="normal"
                      tabIndex={4}
                    />
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <Typography marginRight={2}>Code:</Typography>
                    <TextField
                      fullWidth
                      multiline
                      label="code text area"
                      variant="outlined"
                      placeholder="Text to display"
                      required={true}
                      rows={5}
                      name="codeBlockCode"
                      value={editCodeElementText}
                      onChange={(e) => setEditCodeElementText(e.target.value)}
                      margin="normal"
                      tabIndex={5}
                    />
                  </Box>
                </Grid>
              </Grid>
            )}

            <Box display={'flex'} justifyContent={'center'} marginTop={1}>
              <Button
                variant="contained"
                color="warning"
                disabled={isLoading}
                type="submit"
                sx={{
                  marginRight: '0.5em',
                }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginLeft: '0.5em',
                }}
                onClick={closeEditElementModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};
