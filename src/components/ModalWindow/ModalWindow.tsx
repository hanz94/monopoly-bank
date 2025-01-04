import { Modal, Box, Typography, IconButton, useTheme, styled } from '@mui/material';
import { lighten } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWindowProps {
  open: boolean;
  onClose: () => void;
  modalContent: {
    title: string;
    content: JSX.Element;};
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
}));

const ModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
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
      // aria-labelledby="theme-aware-modal-title"
      // aria-describedby="theme-aware-modal-description"
    >
      <ModalContent>
        <ModalHeader>
          <Typography variant="h6" component="h2" id="theme-aware-modal-title">
            {modalContent.title}
          </Typography>
          <IconButton
            // aria-label="close"
            onClick={onClose}
            sx={{
              color: theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </ModalHeader>
        <Typography id="theme-aware-modal-description" sx={{ mt: 2 }}>
          {modalContent.content}
        </Typography>
      </ModalContent>
    </Modal>
  );
}