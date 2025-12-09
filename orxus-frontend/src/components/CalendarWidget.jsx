import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';
import apiClient from '../api';
import EventDetailModal from './modals/EventDetailModal';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    AvatarGroup,
    Box,
    CircularProgress,
    Button,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    border: '1px solid #f1f5f9',
}));

const DateBox = styled(Box)(({ theme }) => ({
    width: 48,
    height: 48,
    backgroundColor: '#e0e7ff',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4338ca',
    marginRight: theme.spacing(2),
}));

const CalendarWidget = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiClient.get('/calendar/events');
                const now = new Date();
                const upcoming = response.data
                    .filter(e => e.type === 'event')
                    .filter(e => {
                        const eventDate = new Date(`${e.date}T${e.start_time}`);
                        return eventDate >= now;
                    })
                    .sort((a, b) => new Date(`${a.date}T${a.start_time}`) - new Date(`${b.date}T${b.start_time}`))
                    .slice(0, 4);

                setEvents(upcoming);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events', error);
                setLoading(false);
            }
        };

        fetchEvents();
        const interval = setInterval(fetchEvents, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    return (
        <>
            <StyledCard>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Box p={1} bgcolor="indigo.50" borderRadius={2} display="flex">
                                <CalendarIcon size={20} className="text-indigo-600" />
                            </Box>
                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                Upcoming Events
                            </Typography>
                        </Box>
                        <Button
                            component={Link}
                            to="/calendar"
                            endIcon={<ChevronRight size={16} />}
                            sx={{ textTransform: 'none', fontWeight: 500, color: 'indigo.600' }}
                        >
                            View Calendar
                        </Button>
                    </Box>

                    {loading ? (
                        <Box display="flex" justifyContent="center" py={4}>
                            <CircularProgress size={30} sx={{ color: 'indigo.600' }} />
                        </Box>
                    ) : events.length > 0 ? (
                        <List disablePadding>
                            {events.map((event, index) => (
                                <React.Fragment key={event.id}>
                                    <ListItem
                                        onClick={() => handleEventClick(event)}
                                        alignItems="flex-start"
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            cursor: 'pointer',
                                            '&:hover': { bgcolor: 'indigo.50' }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <DateBox>
                                                <Typography variant="caption" sx={{ textTransform: 'uppercase', fontWeight: 'bold', lineHeight: 1 }}>
                                                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                                </Typography>
                                                <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 'bold' }}>
                                                    {new Date(event.date).getDate()}
                                                </Typography>
                                            </DateBox>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="subtitle1" fontWeight="bold" color="text.primary" noWrap>
                                                    {event.title}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography component="span" variant="body2" color="text.secondary">
                                                    <Box component="span" display="flex" alignItems="center" gap={0.5} mt={0.5} mb={1}>
                                                        <Clock size={14} className="text-slate-500" />
                                                        <Typography component="span" variant="caption" color="text.secondary" fontWeight="medium">
                                                            {event.start_time} - {event.end_time}
                                                        </Typography>
                                                    </Box>
                                                    {event.participants && event.participants.length > 0 && (
                                                        <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 10 }, justifyContent: 'flex-start' }}>
                                                            {event.participants.map((p) => (
                                                                <Avatar key={p.id} alt={p.name} src="/static/images/avatar/1.jpg">
                                                                    {p.name.charAt(0)}
                                                                </Avatar>
                                                            ))}
                                                        </AvatarGroup>
                                                    )}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                    {index < events.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 9 }} />}
                                </React.Fragment>
                            ))}
                        </List>
                    ) : (
                        <Box textAlign="center" py={4} bgcolor="grey.50" borderRadius={2} border="1px dashed #e2e8f0">
                            <Typography variant="body2" color="text.secondary">
                                No upcoming events
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </StyledCard>

            <EventDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
            />
        </>
    );
};

export { CalendarWidget };