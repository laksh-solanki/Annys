<template>
  <v-container class="about-page bg-style" fluid>
    <v-responsive class="align-center text-center fill-height">
      <h1 class="text-h2 font-weight-bold">About Us</h1>
      <div class="py-4" />
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12">
          <p class="text-body-1">
            Welcome to our website! We are a company dedicated to providing the best services to our
            customers. Our team is composed of passionate and experienced professionals who are
            always ready to help you. Feel free to contact us for any inquiries or questions.
          </p>
        </v-col>
      </v-row>
    </v-responsive>

    <v-divider class="my-8"></v-divider>

    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold text-center">Our Mission</h2>
        <p class="text-body-1 text-center mt-4">
          Our mission is to deliver innovative and high-quality solutions that exceed our clients'
          expectations. We are committed to continuous improvement and to making a positive impact
          on the world.
        </p>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold text-center">Our Team</h2>
      </v-col>
      <v-col v-for="(member, i) in team" :key="i" cols="12" md="4">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="member.avatar" height="200px"></v-img>
          <v-card-title class="text-center">{{ member.name }}</v-card-title>
          <v-card-subtitle class="text-center">{{ member.title }}</v-card-subtitle>
          <v-card-text>{{ member.bio }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-8"></v-divider>

    <v-row>
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold text-center">Why Choose Us?</h2>
        <v-list lines="two" class="mt-4">
          <v-list-item
            v-for="(feature, i) in features"
            :key="i"
            :title="feature.title"
            :subtitle="feature.subtitle"
          ></v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const team = [
  {
    name: 'John Doe',
    title: 'CEO & Founder',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'John is a visionary leader with a passion for innovation. He founded the company with the goal of making a positive impact on the world.',
  },
  {
    name: 'Jane Smith',
    title: 'Chief Technology Officer',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Jane is a brilliant engineer with a deep understanding of technology. She leads our team of talented developers and engineers.',
  },
  {
    name: 'Peter Jones',
    title: 'Chief Operating Officer',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Peter is an experienced operations executive with a proven track record of success. He is responsible for the day-to-day operations of the company.',
  },
]

const features = [
  {
    title: 'Innovative Solutions',
    subtitle: 'We provide cutting-edge solutions tailored to your needs.',
  },
  {
    title: 'Dedicated Support',
    subtitle: 'Our team is available 24/7 to assist you with any issues.',
  },
  {
    title: 'Proven Track Record',
    subtitle: 'We have a long history of delivering successful projects for our clients.',
  },
]
</script>

<style scoped>
.about-page {
  background-color: #f5f5f5;
  padding: 2rem;
}

h1,
h2 {
  font-family: 'Georgia', serif;
}

p {
  margin-bottom: 1rem;
}

.bg-style {
  background:
    linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
    linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
    linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
    linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
    linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
    linear-gradient(
      #1d1d1d 25%,
      #1a1a1a 25%,
      #1a1a1a 50%,
      transparent 50%,
      transparent 75%,
      #242424 75%,
      #242424
    );
  background-color: #131313;
  color: #ffffff;
  background-size: 20px 20px;
}
</style>
