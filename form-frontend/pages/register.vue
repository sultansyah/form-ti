<template>
    <v-row>
        <v-col cols="10" offset="1" md="4" offset-md="4">
            <v-card class="mb-2">
                <v-toolbar color="primary" dark>Register</v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-radio-group
                            label="Level"
                            v-model="form.level"
                            mandatory
                        >
                            <v-radio
                                label="Admin"
                                value="admin"
                            />
                            <v-radio
                                label="Mahasiswa"
                                value="mahasiswa"
                            />
                            <v-radio
                                label="Dosen"
                                value="dosen"
                            />
                        </v-radio-group>
                        <v-text-field
                            name="fullname"
                            label="Full Name"
                            type="text"
                            :rules="rules.fullname"
                            v-model="form.fullname"
                        />
                        <v-text-field
                            name="jurusan"
                            label="Jurusan"
                            type="text"
                            :rules="rules.jurusan"
                            v-model="form.jurusan"
                        />
                        <v-text-field
                            name="prodi"
                            label="Prodi"
                            type="text"
                            :rules="rules.prodi"
                            v-model="form.prodi"
                        />
                        <v-text-field
                            name="kotaLahir"
                            label="Kota Lahir"
                            type="text"
                            :rules="rules.kotaLahir"
                            v-model="form.kotaLahir"
                        />
                        <v-text-field
                            name="tanggalLahir"
                            label="Tanggal Lahir"
                            type="date"
                            :rules="rules.tanggalLahir"
                            v-model="form.tanggalLahir"
                        />
                        <v-text-field
                            name="noInduk"
                            label="Nomor Induk"
                            type="text"
                            :rules="rules.noInduk"
                            v-model="form.noInduk"
                            @keydown="checkNoIndukExist"
                            @input="setPassword"
                        />
                        <v-text-field
                            name="password"
                            label="Password"
                            type="password"
                            :rules="rules.password"
                            v-model="form.password"
                            @keydown.enter="onSubmit"
                        />
                        <v-badge 
                            content="Password terisi otomatis dengan Nomor Induk"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        :loading="isDisable"
                        color="primary"
                        @click="onSubmit"
                    >
                        Register
                    </v-btn>
                </v-card-actions>
            </v-card>
            <div>
                <p class="d-flex align-baseline">
                    Kamu sudah punya akun ?
                    <v-btn
                        to="/login"
                        class="pl-2 btn-no-height btn-auth"
                        plain
                        text
                        :ripple="false"
                        >Login</v-btn
                    >
                </p>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    layout: 'auth',
    middleware: ['unauthenticated'],
    data() {
        return {
            noIndukExist: false,
            isDisable: false,
            form: {
                fullname: '',
                noInduk: '',
                password: '',
                level: '',
                jurusan: '',
                prodi: '',
                kotaLahir: '',
                tanggalLahir: '',
            },
            rules: {
                fullname: [
                    (v) =>
                        !!v || this.$t('FIELD_REQUIRED', { field: 'Fullname' }),
                ],
                jurusan: [
                    (v) =>
                        !!v || this.$t('FIELD_REQUIRED', { field: 'Jurusan' }),
                ],
                prodi: [
                    (v) =>
                        !!v || this.$t('FIELD_REQUIRED', { field: 'Prodi' }),
                ],
                kotaLahir: [
                    (v) =>
                        !!v || this.$t('FIELD_REQUIRED', { field: 'Kota Lahir' }),
                ],
                tanggalLahir: [
                    (v) =>
                        !!v || this.$t('FIELD_REQUIRED', { field: 'Tanggal Lahir' }),
                ],
                noInduk: [
                    (v) => !!v || this.$t('FIELD_REQUIRED', { field: 'Nomor Induk' }),,
                    (v) => !this.noIndukExist || this.$t('NO_INDUK_EXIST'),
                ],
                password: [
                    (v) =>
                        !!v || this.$t('FIELD_REQUIRED', { field: 'Password' }),
                    // (v) =>
                    //     v.length >= 6 ||
                    //     this.$t('FIELD_MIN', { field: 'Password', min: 6 }),
                ],
            },
        }
    },
    methods: {
        setPassword(e) {
            this.form.password = this.form.noInduk
        },
        checkNoIndukExist() {
            this.noIndukExist = false
        },
        onSubmit() {
            if (this.$refs.form.validate()) {
                this.isDisable = true

                this.$axios
                    .$post('http://localhost:3000/auth/register', this.form)
                    .then((response) => {
                        this.isDisable = false

                        //REDIRECT TO LOGIN PAGE
                        this.$router.push('/login')
                    })
                    .catch((error) => {
                        if (error.response.data.message == 'NO_INDUK_EXIST') {
                            this.noIndukExist = true
                            this.$refs.form.validate()
                        }

                        this.isDisable = false
                    })
            }
        },
    },
}
</script>
