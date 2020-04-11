<template>
  <v-container class="pa-8">
    <div class="mb-4">
      <v-icon @click="goToHome">mdi-arrow-left</v-icon>
      Home
    </div>
    <div class="main-container">
      <div class="col-md-4 col-sm-12 wrapper">
        <v-card class="d-flex flex-column pa-6">
          <img src="../assets/main-banner.jpg" height="120px" alt="">
          <h1>Two Fish</h1>
          <div class="d-flex align-center">
            <v-icon class="mr-2">mdi-calendar</v-icon>
            {{ date }}
          </div>
          <div class="d-flex align-center mt-2 mb-2">
            <v-icon class="mr-2">mdi-account</v-icon>
            {{ totalGuest }} Guest(s)
          </div>
          <v-divider class="mt-3 mb-3" v-if="totalDiverSelected > 0 || nondiver > 0"></v-divider>
          <div 
            v-if="chillPackage.packageSelected > 0"
            class="d-flex justify-space-between"
          >
            <span>Chill Package x{{chillPackage.packageSelected}}</span>
            <b>${{ chillPackageTotal }}</b>
          </div>
          <div 
            v-if="explorePackage.packageSelected > 0"
            class="d-flex justify-space-between"
          >
            <span>Explore Package x{{explorePackage.packageSelected}}</span>
            <b>${{ explorePackageTotal }}</b>
          </div>
          <div 
            v-if="nonDiverPackage.packageSelected > 0"
            class="d-flex justify-space-between"
          >
            <span>Non-diver x{{nonDiverPackage.packageSelected}}</span>
            <b>${{ nonDiverPackageTotal }}</b>
          </div>
          <v-divider class="mt-3 mb-3" v-if="totalPrice > 0"></v-divider>
          <div class="d-flex justify-space-between" v-if="totalPrice > 0">
            <b>Total Price (USD)</b>
            <b>{{ totalPrice }}</b>
          </div>
        </v-card>
      </div>
      <v-stepper 
        v-model="e1"
        class="col-md-8 col-sm-12"
      >
        <v-stepper-header>
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
          >
            Activities
          </v-stepper-step>
    
          <v-divider></v-divider>
    
          <v-stepper-step
            :complete="e1 > 2"
            step="2"
          >
            Details
          </v-stepper-step>
    
          <v-divider></v-divider>
    
          <v-stepper-step
            step="3"
          >
            Review
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content 
            step="1"
            class="pl-8 pr-8"
          >
            <div>
              <h1>What will you do?</h1>
              <div class="d-flex flex-row">
                <h3 class="mb-3">{{ totalDiverSelected }}/{{ diver }} Diver(s)</h3>
              </div>
              <div class="mb-12 card-container">
                <v-card class="d-flex flex-column pa-6 card-container__wrapper" outlined>
                  <h1>Chill</h1>
                  <b>2 Dives</b>
                  <small>include equipment</small>
                  <b class="mt-2">${{ chillPackage.price }}/guest</b>
                  <small class="mb-2">include transport</small>
                  <v-row class="ml-0 align-center">
                    <v-btn 
                      @click="chillPackage.packageSelected--" 
                      :disabled="chillPackage.packageSelected === 0"
                      x-small
                      outlined
                    >
                      <v-icon style="font-size: 12px;">mdi-minus</v-icon>
                    </v-btn>
                      <b class="ml-2 mr-2">{{ chillPackage.packageSelected }}</b>
                    <v-btn 
                      @click="chillPackage.packageSelected++"
                      :disabled="totalDiverSelected === parseInt(diver)"
                      outlined
                      x-small
                    >
                      <v-icon style="font-size: 12px;">mdi-plus</v-icon>
                    </v-btn>
                    <span class="ml-2">Guest(s)</span>
                  </v-row>
                </v-card>

                <v-card class="d-flex flex-column pa-6 card-container__wrapper" outlined>
                  <h1>Explore</h1>
                  <b>3 Dives</b>
                  <small>include equipment</small>
                  <b class="mt-2">${{ explorePackage.price }}/guest</b>
                  <small class="mb-2">include transport and lunch</small>
                  <v-row class="ml-0 align-center">
                    <v-btn 
                      @click="explorePackage.packageSelected--" 
                      :disabled="explorePackage.packageSelected === 0"
                      outlined
                      x-small
                    >
                      <v-icon style="font-size: 12px;">mdi-minus</v-icon>
                    </v-btn>
                      <b class="ml-2 mr-2">{{ explorePackage.packageSelected }}</b>
                    <v-btn 
                      @click="explorePackage.packageSelected++"
                      :disabled="totalDiverSelected === parseInt(diver)"
                      x-small
                    >
                      <v-icon style="font-size: 12px;">mdi-plus</v-icon>
                    </v-btn>
                    <span class="ml-2">Guest(s)</span>
                  </v-row>
                </v-card>
              </div>
              <h3 class="mb-3" v-if="nondiver > 0">{{ nondiver }} Non-diver(s)</h3>
              <v-card 
                class="d-flex flex-column pa-6 col-md-6 col-sm-12"
                outlined
                v-if="nondiver > 0"
              >
                <h1>Non-diver</h1>
                <b>2 x 1h Snorkeling</b>
                <small>include equipment</small>
                <b class="mt-2">${{ nonDiverPackage.price }}/guest</b>
                <small class="mb-2">include transport</small>
                <b>{{ nonDiverPackage.packageSelected }} Guest(s)</b>
              </v-card>
            </div>

            <v-btn
              color="primary"
              @click="nextStep(1)"
              :disabled="totalDiverSelected < diver"
              class="mt-6"
            >
              Continue
            </v-btn>
            <br>
            <small 
              style="color: red;"
              class="mt-6"
              v-if="totalDiverSelected < diver"
            >Less packages are selected than guests</small>
          </v-stepper-content>
          <v-stepper-content
            step="2"
          >
            <div>
              <div class="mb-8 form-container">
                <v-text-field
                  v-model="firstName"
                  label="First Name *"
                  :rules="[v => !!v || 'First name is required']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="lastName"
                  label="Last Name *"
                  :rules="[v => !!v || 'Last name is required']"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  label="Email *"
                  @change="validateEmail(email)"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-select
                  v-model="country"
                  :items="countryOption"
                  :rules="[v => !!v || 'Country is required']"
                  label="Country *"
                  required
                ></v-select>
                <v-text-field
                  v-model="phoneNumber"
                  label="Phone Number *"
                  class="mb-2"
                  @change="validatePhoneNumber(phoneNumber)"
                  :rules="phoneNumberRules"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="notes"
                  label="Special Request"
                  outlined
                  row="3"
                >
                </v-textarea>
              </div>
            </div>

            <v-btn
              color="primary"
              @click="nextStep(2)"
              :disabled="!step2Filled"
            >
              Continue
            </v-btn>

            <v-btn text @click="back(2)">Back</v-btn>
          </v-stepper-content>
          <v-stepper-content
            step="3"
          >
            <div class="detail-container">
              <div class="d-flex flex-column">
                <h3>Let's finalise your trip!</h3>
                <span class="mt-3 mb-2">{{ totalGuest }} Guest(s)</span>
                <span class="mb-2">On {{ date }}</span>
                <v-divider class="mb-3"></v-divider>
                <div 
                  v-if="chillPackage.packageSelected > 0"
                  class="mb-2"
                >
                  <span>{{chillPackage.packageSelected}} Chill Package</span>
                </div>
                <div 
                  v-if="explorePackage.packageSelected > 0"
                  class="mb-2"
                >
                  <span>{{explorePackage.packageSelected}} Explore Package</span>
                </div>
                <div 
                  v-if="nonDiverPackage.packageSelected > 0"
                  class="mb-2"
                >
                  <span>{{nonDiverPackage.packageSelected}} Chill Package</span>
                </div>
                <v-divider class="mb-3"></v-divider>
                <span class="mb-2">For {{ firstName }} {{ lastName }} ({{ email}})</span>
                <v-divider class="mb-3"></v-divider>
                <h3 class="mb-4">Total (USD) : ${{ totalPrice }}</h3>
              </div>
            </div>

            <v-btn
              color="#0F2544"
              @click="submitData"
              class="action-button"
            >
              Send Enquiry
            </v-btn>

            <v-btn text @click="back(3)">Back</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
    <v-dialog
      v-model="dataSubmitted"
      persistent
      color="transparent"
      max-width="500px"
    >
      <v-card class="pa-6 text-center">
        <h1 class="monsterrat">We received your enquiry!</h1>
        <p>
          One of our travel expertes will contact you <br>
          in the next few hours to finalise your booking
        </p>
        <v-btn 
          @click="goToHome"
          color="#0F2544"
          class="action-button"
        >
          Back to resort
        </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  data: () => ({
    diver: 0,
    nondiver: 0,
    date: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    country: '',
    email: '',
    notes: '',
    countryOption: [
      'Indonesia', 'Thailand', 'Singapore', 'Malaysia', 'Vietnam', 'Myanmar', 'Australia'
    ],
    phoneNumberRules: [
      v => !!v || "Phone number is required",
      v => (v && v.length >= 11 && v.length <= 13) || "Phone number is not valid",
      v => /^[0-9]+$/.test(v) || "Phone number is not valid"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || 'E-mail is not valid'
    ],
    e1: 1,
    steps: 3,
    valid: true,
    dataSubmitted: false,
    chillPackage: {
      packageSelected: 0,
      price: 100
    },
    explorePackage: {
      packageSelected: 0,
      price: 300
    },
    nonDiverPackage: {
      packageSelected: localStorage.getItem("nondiver"),
      price: 50
    },
  }),
  created() {
    this.date = moment(localStorage.getItem("date")).format("DD MMM YYYY")
    this.diver = localStorage.getItem("diver")
    this.nondiver = localStorage.getItem("nondiver")
  },
  computed: {
    totalGuest() {
      return parseInt(this.diver) + parseInt(this.nondiver)
    },
    totalDiverSelected() {
      return parseInt(this.chillPackage.packageSelected) + parseInt(this.explorePackage.packageSelected)
    },
    chillPackageTotal() {
      return parseInt(this.chillPackage.packageSelected) * parseInt(this.chillPackage.price)
    },
    explorePackageTotal() {
      return parseInt(this.explorePackage.packageSelected) * parseInt(this.explorePackage.price)
    },
    nonDiverPackageTotal() {
      return parseInt(this.nonDiverPackage.packageSelected) * parseInt(this.nonDiverPackage.price)
    },
    totalPrice() {
      return parseInt(this.chillPackageTotal) + parseInt(this.explorePackageTotal) + parseInt(this.nonDiverPackageTotal)
    },
    step2Filled() {
      if ( this.firstName !== '' && this.lastName !== '' && this.email !== '' && this.phoneNumber !== '' 
           && this.country !== '' && this.validateEmail(this.email) && this.validatePhoneNumber(this.phoneNumber) ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push({name: 'Home'})
    },
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },
    back( n ) {
      this.e1 = n - 1
    },
    validateEmail( email ){
      return /.+@.+\..+/.test(String(email).toLowerCase());
    },
    validatePhoneNumber( number ){
      if( number.length < 10 || number.length > 13 ) return false;
      return /^\d+$/.test(number);
    },
    submitData() {
      this.dataSubmitted = true
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: row;
}
.wrapper {
  padding-right: 20px;
}
.card-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  &__wrapper {
    width: 100%;
  }
  &__wrapper:first-of-type {
    margin-right: 20px;
  }
}
.monsterrat {
  font-family: monsterrat, sans-serif;
  color: #0F2544;
}
.action-button {
  color: white;
}
.small {
  font-weight: lighter;
}
@media screen and (max-width: 767px) {
  .main-container {
    flex-direction: column;
  }
  .card-container {
    flex-direction: column;
    &__wrapper:last-child {
      margin-top: 50px;
    }
  }
  .wrapper {
    padding: 0 !important;
    margin-bottom: 50px;
  }
}
</style>