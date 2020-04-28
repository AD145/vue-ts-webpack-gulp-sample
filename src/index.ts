import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

@Component({
  template: `
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-card-text>
      <div>Word of the Day</div>
      <p class="display-1 text--primary">
        be•nev•o•lent
      </p>
      <p>adjective</p>
      <div class="text--primary">
        well meaning and kindly.<br>
        "a benevolent smile"
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Learn More
      </v-btn>
    </v-card-actions>
  </v-card>`
})
class App extends Vue {
  @Prop()
  public id: string;
}

const el: Element = document.createElement('div');
el.id = 'app';
document.body.insertAdjacentElement('afterbegin',el);

new Vue({
  el: el,
  render: h => h(App)
});
