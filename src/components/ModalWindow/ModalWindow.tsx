import { Modal, Box, Typography, IconButton, useTheme, styled } from '@mui/material';
import { lighten } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWindowProps {
  open: boolean;
  onClose: () => void;
  modalContent: {
    title: string;
    content: JSX.Element;
    //enable custom scroll - for long content, if true - setting 100% height for modal content (falls back to 80vh), enabling custom scroll management for modal content (default false)
    enableCustomScroll?: boolean;
  };
}

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '85%',
  backgroundColor: lighten(theme.palette.background.paper, 0.125),
  boxShadow: theme.shadows[24],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2.5),
  outline: 'none',
  maxHeight: '80vh',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '@supports (height: 100dvh)': {
    maxHeight: '80dvh',
  },
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  flexShrink: 0,
}));

export default function ModalWindow({
  open,
  onClose,
  modalContent
}: ModalWindowProps) {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <ModalContent sx={{ height: modalContent.enableCustomScroll ? '100%' : 'auto' }}>
        <ModalHeader>
          <Typography variant="h6" component="h2" id="theme-aware-modal-title">
            {modalContent.title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <Box
          id="theme-aware-modal-description"
          sx={{
            flex: 1,
            pr: 1,
            display: modalContent.enableCustomScroll ? 'flex' : 'block',
            flexDirection: 'column',
            minHeight: 0
          }}
        >
          {modalContent.content}
        </Box>
      </ModalContent>
    </Modal>
  );
}