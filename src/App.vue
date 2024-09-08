<script setup lang="ts">
import { ref, watch } from "vue";
import { PlusIcon, DocumentIcon } from "@heroicons/vue/24/outline";
import CardForm from "./components/CardForm.vue";
import { usePdf } from "./composables/usePDF.ts";
import { CardData } from "./types/cardWisard.types.ts";

const { createPdf } = usePdf();
const cards = ref<CardData[]>([
  {
    name: "",
    breakTime: "",
    uph: null,
    aph: null,
    loi: null,
    sections: [""],
  },
]);

const lastUph = ref(0);
const lastAph = ref(0);
const lastLoi = ref(0);

watch(
  cards,
  () => {
    lastUph.value = cards.value.at(-1).uph ?? lastUph.value;
    lastAph.value = cards.value.at(-1).aph ?? lastAph.value;
    lastLoi.value = cards.value.at(-1).loi ?? lastLoi.value;
  },
  { deep: true }
);

const addCard = (): void => {
  cards.value.push({
    name: "",
    breakTime: "",
    uph: null,
    aph: null,
    loi: null,
    sections: [""],
  });
};

const removeCard = (index: number): void => {
  cards.value.splice(index, 1);
};
</script>
<template>
  <div class="m-10 mx-auto flex w-fit flex-col gap-2">
    <CardForm
      v-for="(card, index) in cards"
      :key="`i=${index}`"
      v-model="cards[index]"
      :can-remove="cards.length > 1"
      :card-index="index"
      :last-uph="lastUph"
      :last-aph="lastAph"
      :last-loi="lastLoi"
      @remove="removeCard(index)"
    />
    <div class="flex gap-2 self-end">
      <button class="btn btn-circle btn-primary">
        <DocumentIcon class="size-8" @click="createPdf(cards)" />
      </button>
      <button class="btn btn-circle btn-success">
        <PlusIcon class="size-8" @click="addCard" />
      </button>
    </div>
  </div>
</template>
