import {
  Alert,
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { updateStore } from '../apis/store';
import { useMutation } from 'react-query';
import { useUserDataContext } from '../context/UserDataContext';
import { SLIDE_ELEMENT_IMAGE, SLIDE_ELEMENT_TEXT } from '../utils/constants';

const PaperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Slide = ({ presentationId, slideNumber, slideData }) => {
  console.log(slideData);

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

  const [editElementPosX, setEditElementPosX] = useState(null);
  const [editElementPosY, setEditElementPosY] = useState(null);

  const [editImageElementWidth, setEditImageElementWidth] = useState(null);
  const [editImageElementHeight, setEditImageElementHeight] = useState(null);
  const [editImageElementSrc, setEditImageElementSrc] = useState('');
  const [editImageElementDescription, setEditImageElementDescription] =
    useState('');

  const { mutate, isLoading } = useMutation(updateStore, {
    onError: (data) => {
      setElementUpdateErrorMessage(data.message);
    },
  });

  const getEditElementModalTitle = () => {
    switch (modalElementToEdit) {
      case SLIDE_ELEMENT_TEXT:
        return 'Edit TEXT';
      case SLIDE_ELEMENT_IMAGE:
        return 'Edit IMAGE';
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
    } else if (modalElementToEdit === SLIDE_ELEMENT_IMAGE) {
      currentElement.src = editImageElementSrc;
      currentElement.description = editImageElementDescription;
      currentElement.height = editImageElementHeight;
      currentElement.width = editImageElementWidth;
    }

    mutate(userData.toJSON());
    updateUserData(userData);
    closeEditElementModal();
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: '75%',
          height: '65%',
        }}
      >
        <PaperContainer>
          {slideData.elements.map((ele, index) => {
            if (ele.type === SLIDE_ELEMENT_TEXT) {
              return (
                <Box
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
                  }}
                >
                  <Typography
                    key={index}
                    fontSize={`${ele.fontSize}em`}
                    color={ele.fontColor}
                    textOverflow={'clip'}
                  >
                    {ele.text}
                  </Typography>
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
                >
                  <img
                    src={ele.src}
                    alt={ele.description}
                    width={'100%'}
                    height={'100%'}
                  />
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
