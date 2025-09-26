<template>
  <v-container>
    <v-card class="pa-5" elevation="1">
      <v-card-title class="text-h5 text-center">Student Registration Form</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="12">
              <h3 class="text-h6">Personal Details</h3>
              <v-divider class="my-3"></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Full Name" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Email" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Student Mobile No." variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Parents Mobile No." variant="outlined"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12">
              <h3 class="text-h6">Academic Details</h3>
              <v-divider class="my-3"></v-divider>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="PRN No." variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Roll No." variant="outlined"></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-5">
            <v-col cols="12" class="text-center">
              <v-btn color="primary" class="mr-4">Submit</v-btn>
              <v-btn color="secondary">Reset</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup></script>

<style scoped>
.v-card {
  border-radius: 10px;
}
</style>
