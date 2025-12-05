import React from 'react';
import { Calendar, Clock, Users, X } from 'lucide-react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    Box,
    Button,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Chip
} from '@mui/material';

const EventDetailModal = ({ isOpen, onClose, event }) => {
    if (!event) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 3 }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="div" fontWeight="bold">
                    Event Details
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                    <X size={20} />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 3 }}>
                <Box mb={3}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
                        {event.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {event.description || 'No description provided.'}
                    </Typography>
                </Box>

                <Box display="flex" flexDirection="column" gap={2} mb={4}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Calendar className="text-indigo-500" size={20} />
                        <Typography variant="body1" fontWeight="medium">
                            {event.date}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Clock className="text-indigo-500" size={20} />
                        <Typography variant="body1" fontWeight="medium">
                            {event.start_time} - {event.end_time}
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        <Users className="text-indigo-500" size={20} />
                        <Typography variant="h6" fontWeight="bold">
                            Participants
                        </Typography>
                        <Chip label={event.participants ? event.participants.length : 0} size="small" color="primary" variant="outlined" />
                    </Box>

                    {event.participants && event.participants.length > 0 ? (
                        <List sx={{ bgcolor: 'background.paper', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                            {event.participants.map((participant, index) => (
                                <React.Fragment key={participant.id}>
                                    <ListItem alignItems="center">
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                {participant.name.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle2" fontWeight="bold">
                                                    {participant.name}
                                                </Typography>
                                            }
                                            secondary={participant.email}
                                        />
                                    </ListItem>
                                    {index < event.participants.length - 1 && <Divider variant="inset" component="li" />}
                                </React.Fragment>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            No specific participants tagged.
                        </Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #f0f0f0' }}>
                <Button onClick={onClose} variant="outlined" color="inherit">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EventDetailModal;
