<template>
  <div class="about-page">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" class="text-center About-header">
          <h1 class="display-2 font-weight-bold mb-4">About Our Company</h1>
          <p class="subheading-1">
            We are a team of passionate individuals dedicated to creating innovative solutions for
            the future.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-content- align-center">
          <img src="/src/assets/use-1.svg" class="About-image ms-auto" alt="" />
        </v-col>
      </v-row>

      <v-row class="mt-12">
        <v-col cols="12">
          <h2 class="display-1 font-weight-bold text-center mb-8">Our Journey</h2>
          <v-timeline align="start">
            <v-timeline-item
              v-for="(item, i) in timeline"
              :key="i"
              :dot-color="item.color"
              size="small"
            >
              <template v-slot:opposite>
                <div
                  :class="`pt-1 headline font-weight-bold text-${item.color}`"
                  v-text="item.year"
                ></div>
              </template>
              <div>
                <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${item.color}`">
                  {{ item.title }}
                </h2>
                <p>{{ item.description }}</p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>

      <v-row class="mt-12">
        <v-col cols="12">
          <h2 class="display-1 font-weight-bold text-center mb-8">Our Core Values</h2>
        </v-col>
        <v-col v-for="(value, i) in values" :key="i" cols="12" md="4" class="text-center">
          <v-card class="pa-6" outlined>
            <v-icon size="50" :color="value.color">{{ value.icon }}</v-icon>
            <h3 class="title font-weight-bold mt-4">{{ value.title }}</h3>
            <p class="mt-2">{{ value.description }}</p>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-12">
        <v-col cols="12">
          <h2 class="display-1 font-weight-bold text-center mb-8">Meet Our Team</h2>
        </v-col>
        <v-col v-for="(member, i) in team" :key="i" cols="12" md="4">
          <v-card class="text-center pa-6" outlined>
            <v-avatar size="120" class="mb-4">
              <img :src="member.avatar" :alt="member.name" />
            </v-avatar>
            <h3 class="title font-weight-bold">{{ member.name }}</h3>
            <p class="subheading-1">{{ member.title }}</p>
            <p class="mt-4">{{ member.bio }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const timeline = [
  {
    year: '2015',
    color: 'cyan',
    title: 'Company Founded',
    description:
      'Our journey began with a small team of passionate individuals who wanted to make a difference.',
  },
  {
    year: '2017',
    color: 'green',
    title: 'First Major Project',
    description:
      'We launched our first major project, which was a huge success and helped us establish our reputation.',
  },
  {
    year: '2020',
    color: 'pink',
    title: 'Expansion and Growth',
    description:
      'We expanded our team and moved into a new office to accommodate our growing business.',
  },
  {
    year: '2023',
    color: 'amber',
    title: 'Future Innovations',
    description:
      'We are constantly exploring new technologies and ideas to shape the future of our industry.',
  },
]

const values = [
  {
    icon: 'mdi-lightbulb-on-outline',
    color: 'amber',
    title: 'Innovation',
    description:
      'We are committed to pushing the boundaries of what is possible and creating innovative solutions.',
  },
  {
    icon: 'mdi-account-group-outline',
    color: 'green',
    title: 'Collaboration',
    description: 'We believe in the power of teamwork and collaboration to achieve our goals.',
  },
  {
    icon: 'mdi-heart-outline',
    color: 'pink',
    title: 'Integrity',
    description: 'We are committed to the highest standards of integrity and ethical behavior.',
  },
]

const team = [
  {
    name: 'John Doe',
    title: 'CEO & Founder',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'John is a visionary leader with a passion for innovation.',
  },
  {
    name: 'Jane Smith',
    title: 'Chief Technology Officer',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    bio: 'Jane is a brilliant engineer with a deep understanding of technology.',
  },
  {
    name: 'Peter Jones',
    title: 'Chief Operating Officer',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    bio: 'Peter is an experienced operations executive with a proven track record of success.',
  },
]
</script>

<style scoped>
.about-page {
  width: 100%;
  height: auto;
  padding: 0;

  & .About-header {
    width: 100%;
    height: 91vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .About-image {
    width: 100%;
    border: 2px solid #323232;
    border-radius: 10px;
    transition: transform 0.3s ease;
  }
}

.v-timeline-item .v-timeline-item__body {
  max-width: 100%;
}
</style>
