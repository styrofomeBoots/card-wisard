<script setup lang="ts">
import { ref, watch } from "vue";
import {
  PlusIcon,
  XMarkIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/vue/24/outline";
import { CardData } from "../types/cardWisard.types.ts";

const props = defineProps({
  canRemove: { type: Boolean, required: true },
  cardIndex: { type: Number, required: true },
  lastUph: { type: Number, required: true },
  lastAph: { type: Number, required: true },
  lastLoi: { type: Number, required: true },
});
const emit = defineEmits(["remove"]);
const model = defineModel<CardData>();

const breakTime = ref<string>("");
const timePeriod = ref<"AM" | "PM">("AM");
const sections = ref([""]);

watch([breakTime, timePeriod], () => {
  if (!breakTime.value) {
    model.value!.breakTime = "";
    return;
  }
  model.value!.breakTime = `Break at: ${breakTime.value} ${timePeriod.value}`;
});

watch(
  sections,
  () => {
    model.value!.sections = sections.value;
  },
  { deep: true }
);

const addSection = (index: number): void => {
  sections.value.splice(index + 1, 0, "");
};
const removeSection = (index: number): void => {
  sections.value.splice(index, 1);
};

const useLastKpis = (): void => {
  model.value!.uph = props.lastUph;
  model.value!.aph = props.lastAph;
  model.value!.loi = props.lastLoi;
};
</script>

<template>
  <div class="flex max-w-[36rem] flex-col gap-1 rounded-lg border-2 p-2">
    <div class="flex justify-end">
      <button
        class="btn btn-circle btn-error btn-sm"
        :disabled="!props.canRemove"
        @click="emit('remove')"
      >
        <XMarkIcon class="size-8" />
      </button>
    </div>
    <div id="nameRow" class="flex gap-2">
      <label class="form-control flex-grow">
        <div class="label">
          <span class="label-text">Name</span>
        </div>
        <input
          :id="`name-${cardIndex}`"
          v-model="model!.name"
          type="text"
          class="input input-bordered"
          autocomplete="off"
        />
      </label>
      <div class="flex gap-2">
        <label class="form-control w-36">
          <div class="label">
            <span class="label-text">Break Time</span>
          </div>
          <input
            :id="`breakTime-${cardIndex}`"
            v-model="breakTime"
            type="string"
            class="input input-bordered w-36"
          />
        </label>
        <div class="flex flex-col justify-end">
          <div class="form-control w-16">
            <label class="label cursor-pointer pb-0">
              <span class="label-text">AM</span>
              <input
                v-model="timePeriod"
                type="radio"
                name="radio"
                class="radio"
                value="AM"
                :disabled="!breakTime"
              />
            </label>
          </div>
          <div class="form-control w-16">
            <label class="label cursor-pointer pb-0 pt-1">
              <span class="label-text">PM</span>
              <input
                v-model="timePeriod"
                type="radio"
                name="radio"
                class="radio"
                value="PM"
                :disabled="!breakTime"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
    <div id="kpiRow" class="flex items-end gap-2 *:flex-grow">
      <label class="form-control min-w-0">
        <div class="label">
          <span class="label-text">UPH</span>
        </div>
        <input
          :id="`uph-${cardIndex}`"
          v-model="model!.uph"
          type="number"
          class="input input-bordered min-w-0"
        />
      </label>
      <label class="form-control min-w-0">
        <div class="label">
          <span class="label-text">APH</span>
        </div>
        <input
          :id="`aph-${cardIndex}`"
          v-model="model!.aph"
          type="number"
          class="input input-bordered min-w-0"
        />
      </label>
      <label class="form-control min-w-0">
        <div class="label">
          <span class="label-text">LOI</span>
        </div>
        <input
          :id="`loi-${cardIndex}`"
          v-model="model!.loi"
          type="number"
          class="input input-bordered min-w-0"
        />
      </label>
      <button class="btn btn-square btn-primary" @click="useLastKpis">
        <ArrowPathRoundedSquareIcon class="size-8" />
      </button>
    </div>
    <div id="sectionsRow" class="flex flex-col gap-2">
      <div
        v-for="(_section, index) in sections"
        :key="`i-${index}`"
        class="flex items-end gap-2"
      >
        <label class="form-control flex-grow">
          <div v-if="index === 0" class="label">
            <span class="label-text">Sections</span>
          </div>
          <input
            :id="`name-${index}-${cardIndex}`"
            v-model="sections[index]"
            type="text"
            class="input input-bordered"
          />
        </label>
        <button class="btn btn-circle btn-success" @click="addSection(index)">
          <PlusIcon class="size-8" />
        </button>
        <button
          class="btn btn-circle btn-error"
          :disabled="sections.length === 1"
          @click="removeSection(index)"
        >
          <XMarkIcon class="size-8" />
        </button>
      </div>
    </div>
  </div>
</template>
