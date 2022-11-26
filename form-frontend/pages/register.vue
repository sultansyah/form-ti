<template>
    <v-row>
        <v-col cols="10" offset="1" md="4" offset-md="4">
            <v-card>
              <v-toolbar dark color="primary">Register</v-toolbar>

              <v-card-text>
                <v-from>
                  <v-text-field
                  label="Name"
                  :rules="rules.fullname"
                  v-model="form.fullname"
                  required
                  ></v-text-field>

                  <v-text-field
                  label="Email"
                  :rules="rules.email"
                  v-model="form.email"
                  required
                  ></v-text-field>

                  <v-text-field
                  label="Password"
                  :rules="rules.password"
                  v-model="form.password"
                  type="password"
                  required
                  ></v-text-field>

                  <v-text-field
                  label="Confirm Password"
                  v-model="form.password_confirmation"
                  :rules="rules.password_confirmation"
                  type="password"
                  required
                  ></v-text-field>
                </v-from>
              </v-card-text>

              <v-card-actions>
                <v-space></v-space>
                <v-btn color="primary">Register</v-btn>
              </v-card-actions>
            </v-card>

            <div class="d-flex align-baseline">
              <p>Kamu belum punya akun?</p>
              <v-btn
              text
              plain
              :ripple="false"
              to="/login"
              color="primary"
              class="pl-0"
              >Login</v-btn>
            </div>

        </v-col>
    </v-row>
  </template>
  
  <script>
  export default {
    layout: 'auth',
    data() {
      return {
        form: {
          fullname: '',
          email: '',
          password: '',
          password_confirmation: '',
        },

        rules: {
          fullname: [
            v => !!v || "Fullname is required",
          ],
          email: [
            v => !!v || "E-mail is required",
            v => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v) || 'E-mail must be valid',
          ],
          password: [
            v => !!v || 'Password is required',
            v => v.length >= 6 || 'Password must be at least 6 characters'
          ],
          password_confirmation: [
            v => !!v || 'Password confirmation is required',
            v => v === this.form.password || 'Password confirmation must be same with password',
          ],
        },
      }
    }
  }
  </script>
  