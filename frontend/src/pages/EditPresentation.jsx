import React from 'react';
import { useParams } from 'react-router-dom';

export const EditPresentation = () => {
  const { presentationId } = useParams();
  return <div>Presentaiton Page for {presentationId}</div>;
};
