<template>
  <div :class="$style.Test">
    <h1>{{ _ID }}</h1>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue';
import {
  Component,
  Prop
} from 'vue-property-decorator';

@Component({

})
export default class VTest extends Vue {
  @Prop({
    default: 'FOOBAR'
  })
  public _ID: string;
}
</script>
<style lang='scss' module>
.Test {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
