// import { ReactNode } from 'react';
import PropTypes from 'prop-types';
// import isString from 'lodash/isString';
import { useDropzone } from 'react-dropzone';

// @mui
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Image from 'src/components/Image';
// type
  //
// import Iconify from '../Iconify';
// import RejectionFiles from './RejectionFiles';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: 144,
  height: 144,
  margin: 'auto',
  borderRadius: '50%',
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}));

const DropZoneStyle = styled('div')({
  zIndex: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '50%',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { width: '100%', height: '100%' },
  '&:hover': {
    cursor: 'pointer',
    '& .placeholder': {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function UploadImage({ error, value, sx, ...other}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, 
    // fileRejections 
  } = useDropzone({
    multiple: false,
    ...other,
  });
  return (
    <>
      <RootStyle
        sx={{
          ...((isDragReject || error) && {
            borderColor: 'error.light',
          }),
          ...sx,
        }}
      >
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
          }}
        >
          <input {...getInputProps()} />
          {value && (
            <Image alt="avatar" src={typeof value === 'string' ? 
              `${import.meta.env.VITE_BACKEND_URL}/products/${value}` 
              : 
              value.preview} sx={{ zIndex: 8 }} />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(value && {
                opacity: 0,
                color: 'common.white',
                bgcolor: 'grey.900',
                '&:hover': { opacity: 0.72 },
              }),
              ...((isDragReject || error) && {
                bgcolor: 'error.lighter',
              }),
            }}
          >
            {/* <Iconify icon={'ic:round-add-a-photo'} sx={{ width: 24, height: 24, mb: 1 }} /> */}
            <Typography variant="caption">{value ? 'Update Photo' : 'Upload Photo'}</Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      {/* {helperText && helperText} */}

      {/* {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />} */}
    </>
  );
}

UploadImage.propTypes = {
  error: PropTypes.any,
  value: PropTypes.any,
  sx: PropTypes.any,
};
