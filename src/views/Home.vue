<template>
  <v-container class="main-container" fluid>
    <div class="main-container__content">
      <v-card class="main-container__card-container">
        <div>
          <b>Date</b>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                readonly
                v-on="on"
                class="pt-0"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              scrollable
              :min="today"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <b>Guest(s)</b>
        <div class="d-flex flex-row justify-space-between guest-wrapper">
          <div class="d-flex flex-column">
            <label class="text-center small-text">Diver</label>
            <div class="d-flex flex-row">
              <v-icon 
                class="button-icon"
                @click="decreaseDiver(1)"
              >mdi-minus</v-icon>
                <span class="pl-2 pr-2">{{ diver }}</span>
              <v-icon 
                class="button-icon" 
                @click="diver++"
              >mdi-plus</v-icon>
            </div>
          </div>
          <div class="d-flex flex-column">
            <label class="text-center small-text">Non-Diver</label>
            <div class="d-flex flex-row">
              <v-icon 
                class="button-icon" 
                @click="decreaseNonDiver(0)"
              >mdi-minus</v-icon>
                <span class="pl-2 pr-2">{{ nondiver }}</span>
              <v-icon
                class="button-icon" 
                @click="nondiver++"
              >mdi-plus</v-icon>
            </div>
          </div>
        </div>
        <v-btn 
          @click="saveData" 
          class="mt-6 save-button" 
          color="#0F2544"
        >Book Now!</v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    today: new Date().toISOString().substr(0, 10),
    date: new Date().toISOString().substr(0, 10),
    diver: 1,
    nondiver: 0,
    menu: false
  }),
  methods: {
    decreaseDiver(min) { 
      if ( this.diver > min ) this.diver--;
    },
    decreaseNonDiver(min) { 
      if ( this.nondiver > min ) this.nondiver--;
    },
    saveData() {
      localStorage.setItem( 'date', this.date )
      localStorage.setItem( 'diver', this.diver )
      localStorage.setItem( 'nondiver', this.nondiver )
      this.$router.push({ name: 'BookingDetails' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    background-image: url('../assets/main-banner.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    min-height: 100%;
    &__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &__card-container {
      padding: 30px;
    }
    .guest-wrapper {
      border: 1px solid gray;
      border-radius: 5px;
      padding: 5px;
      margin-top: 10px;
    }
    .small-text {
      font-size: 14px;
      color: gray;
    }
    .save-button {
      color: white;
    }
  }
</style>
