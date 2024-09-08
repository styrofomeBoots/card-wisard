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
    tbt: null,
    aph: null,
    loi: null,
    sections: [""],
  },
]);

const lastTbt = ref<number | null>(null);
const lastAph = ref<number | null>(null);
const lastLoi = ref<number | null>(null);

watch(
  cards,
  () => {
    lastTbt.value = cards.value.at(-2)?.tbt ?? lastTbt.value;
    lastAph.value = cards.value.at(-2)?.aph ?? lastAph.value;
    lastLoi.value = cards.value.at(-2)?.loi ?? lastLoi.value;
  },
  { deep: true }
);

const addCard = (): void => {
  cards.value.push({
    name: "",
    breakTime: "",
    tbt: null,
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
      v-for="(_card, index) in cards"
      :key="`i=${index}`"
      v-model="cards[index]"
      :can-remove="cards.length > 1"
      :card-index="index"
      :last-tbt="lastTbt"
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
