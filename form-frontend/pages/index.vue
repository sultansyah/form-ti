<template>
    <v-container class="mt-3">
        <v-row>
            <v-col cols="12" class="text-right">
                <BtnCreateNewForm />
            </v-col>
        </v-row>
        
        <Forms />
    </v-container>
</template>

<script>
export default {
    middleware: ['authenticated'],
    head () {
        return {
            title: 'Home',
        }
    },
    beforeMount() {
        this.$store.commit('alerts/reset')
        this.$store.commit('saves/reset')
    },
    methods: {
        async fetch() {
            try {
                const response = await this.$store.dispatch('forms/index')
            } catch (err) {
                if (err.response) {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t(err.response.data.message),
                    })
                } else {
                    this.$store.commit('alerts/show', {
                        type: 'error',
                        message: this.$i18n.t('SERVER_ERROR'),
                    })
                }
            }
        },
    }
}
</script>