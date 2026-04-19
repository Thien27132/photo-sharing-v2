import React, { useState, useEffect } from 'react';
import { Typography, Card, CardHeader, CardMedia, CardContent, Divider, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';
import './styles.css';

function UserPhotos({ setContext }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        setPhotos(response.data);
        // Cập nhật ngữ cảnh cho Header
        if (setContext && response.data.length > 0) {
          setContext(`Ảnh của người dùng ID: ${userId}`);
        }
      })
      .catch((err) => console.error("Lỗi lấy ảnh:", err));
  }, [userId, setContext]);

  if (photos.length === 0) {
    return <Typography sx={{ p: 2 }}>Người dùng này chưa có ảnh nào hoặc đang tải...</Typography>;
  }

  return (
    <Box>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 4, maxWidth: '100%' }}>
          <CardHeader title={`Đăng lúc: ${new Date(photo.date_time).toLocaleString()}`} />
          
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`} // Đường dẫn tới thư mục ảnh của Backend
            alt="User post"
            sx={{ objectFit: 'contain', maxHeight: 500, bgcolor: '#000' }}
          />

          <CardContent>
            <Typography variant="h6">Bình luận</Typography>
            <Divider />
            <List>
              {photo.comments ? photo.comments.map((comment) => (
                <ListItem key={comment._id} alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Link to={`/users/${comment.user._id}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: '#1976d2' }}>
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary" sx={{ display: 'block', my: 0.5 }}>
                          {comment.comment}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(comment.date_time).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              )) : <Typography variant="body2">Chưa có bình luận nào.</Typography>}
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;