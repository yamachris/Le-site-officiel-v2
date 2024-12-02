import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTheme } from '@mui/material/styles';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const testimonials = [
  {
    text: "Un jeu qui mêle stratégie et amusement, je ne peux plus m'en passer !",
    author: "Joueur1",
    avatar: "/avatars/player1.png"
  },
  {
    text: "Les tournois sont incroyables et la compétition me pousse à donner le meilleur.",
    author: "Joueur2",
    avatar: "/avatars/player2.png"
  },
  {
    text: "La communauté est super active et toujours prête à aider les nouveaux joueurs.",
    author: "Joueur3",
    avatar: "/avatars/player3.png"
  }
];

const Testimonials = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: 'linear-gradient(180deg, rgba(10,25,41,0.95) 0%, rgba(19,47,76,0.95) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              mb: 6,
              fontFamily: 'Orbitron',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Ce que nos joueurs pensent de UNIT
          </Typography>
        </motion.div>

        <Box sx={{ mb: 6 }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      px: { xs: 2, md: 8 },
                      py: 4,
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="p"
                      sx={{
                        mb: 3,
                        fontStyle: 'italic',
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box
                      component="img"
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        mb: 2,
                        border: '2px solid #FFD700',
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#FFD700',
                        fontWeight: 'bold',
                      }}
                    >
                      {testimonial.author}
                    </Typography>
                  </Box>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontFamily: 'Orbitron',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FFA500, #FFD700)',
                },
              }}
            >
              Essayez UNIT et rejoignez la communauté !
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;
