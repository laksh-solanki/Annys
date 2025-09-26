<template>
  <div>
    <div class="about-page">
      <section class="hero">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1 class="hero-title">About Our Company</h1>
              <p class="hero-subtitle">We are a team of passionate individuals dedicated to creating innovative solutions.</p>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section class="company-overview">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h2 class="section-title">Our Story</h2>
              <p class="section-content">Founded in 2024, our company has been on a mission to revolutionize the industry. We started with a small team of dedicated professionals and have since grown into a thriving organization with a global reach. Our success is built on a foundation of innovation, collaboration, and a commitment to excellence.</p>
            </v-col>
            <v-col cols="12" md="6">
              <v-img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Our Office" class="company-image"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section class="mission-statement">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h2 class="section-title">Our Mission</h2>
              <p class="mission-text">Our mission is to empower businesses with cutting-edge technology and innovative solutions. We strive to be a trusted partner for our clients, helping them to achieve their goals and stay ahead of the competition. We are committed to delivering the highest quality products and services, and to making a positive impact on the world.</p>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <section class="team">
        <v-container>
          <h2 class="section-title">Meet Our Team</h2>
          <v-row>
            <v-col cols="12" md="4">
              <v-card class="team-member-card" flat>
                <v-avatar size="150" class="team-member-avatar">
                  <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTSVbrfHfzhNAOXt0S5eJ_mOlz4nMIc9A32dO3DqNW7ZztuljtCc9APAWsI4f0wXvIpA&usqp=CAU" alt="Team Member 1"></v-img>
                </v-avatar>
                <v-card-title class="team-member-name">John Doe</v-card-title>
                <v-card-subtitle class="team-member-title">CEO & Founder</v-card-subtitle>
                <v-card-text class="team-member-bio">John is a visionary leader with a passion for innovation. He founded the company with the goal of making a positive impact on the world.</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="team-member-card" flat>
                <v-avatar size="150" class="team-member-avatar">
                  <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTSVbrfHfzhNAOXt0S5eJ_mOlz4nMIc9A32dO3DqNW7ZztuljtCc9APAWsI4f0wXvIpA&usqp=CAU" alt="Team Member 2"></v-img>
                </v-avatar>
                <v-card-title class="team-member-name">Jane Smith</v-card-title>
                <v-card-subtitle class="team-member-title">Chief Technology Officer</v-card-subtitle>
                <v-card-text class="team-member-bio">Jane is a brilliant engineer with a deep understanding of technology. She leads our team of talented developers and engineers.</v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="team-member-card" flat>
                <v-avatar size="150" class="team-member-avatar">
                  <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTSVbrfHfzhNAOXt0S5eJ_mOlz4nMIc9A32dO3DqNW7ZztuljtCc9APAWsI4f0wXvIpA&usqp=CAU" alt="Team Member 3"></v-img>
                </v-avatar>
                <v-card-title class="team-member-name">Peter Jones</v-card-title>
                <v-card-subtitle class="team-member-title">Chief Operating Officer</v-card-subtitle>
                <v-card-text class="team-member-bio">Peter is an experienced operations executive with a proven track record of success. He is responsible for the day-to-day operations of the company.</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
  name: "About",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped>
.about-page {
  font-family: 'Poppins', sans-serif;
  color: #4f4f4f;
}

.hero {
  background-color: #f9f9f9;
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
}

.company-overview {
  padding: 6rem 0;
}

.section-title {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
}

.section-content {
  font-size: 1.1rem;
  line-height: 1.8;
}

.company-image {
  border-radius: 8px;
}

.mission-statement {
  background-color: #f9f9f9;
  padding: 6rem 0;
  text-align: center;
}

.mission-text {
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto;
}

.team {
  padding: 6rem 0;
}

.team-member-card {
  background-color: transparent;
  text-align: center;
}

.team-member-avatar {
  margin-bottom: 1.5rem;
}

.team-member-name {
  font-size: 1.5rem;
  font-weight: 600;
}

.team-member-title {
  font-size: 1rem;
  color: #1976D2;
  margin-bottom: 1rem;
}

.team-member-bio {
  font-size: 1rem;
  line-height: 1.6;
}
</style>
