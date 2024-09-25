<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

// Define props
const props = defineProps({
  url: {
    type: String,
    default: "",
    required: true,
  },
  params: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  method: {
    type: String,
    required: true,
    default: "get",
  },
  body: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  extraInfo: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

// Define emits
const emit = defineEmits(["stateRequest", "errorHandler", "requestFinished"]);

// Define reactive variables
const pending = ref(false);
const error = ref(false);
const data = ref(null);

// Watchers
watch(
  () => props.url,
  () => {
    init();
  },
);
watch(
  () => props.params,
  () => {
    if (!pending.value) {
      init();
    }
  },
  { deep: true },
);
watch(pending, (newValue) => {
  emit("stateRequest", newValue);
});

// onMounted lifecycle hook
onMounted(() => {
  init();
});

// Methods
const init = () => {
  setDefaultValues();
  requestData();
};

const requestData = async () => {
  pending.value = true;
  try {
    if (props.method === "postFile" || props.method === "getFile") {
      await requestFile();
    } else if (props.method === "postPDF") {
      await requestPDF(props.extraInfo?.year);
    } else if (props.method === "get") {
      const response = await axios.get(props.url, { headers: props.params });
      data.value = response.data;
    } else {
      const response = await axios.post(props.url, props.body, {
        headers: props.params,
      });
      data.value = response.data;
    }
    error.value = false;
  } catch (e) {
    data.value = null;
    error.value = e;
  } finally {
    pending.value = false;
    emit("errorHandler", error.value);
    emit("requestFinished", data.value);
  }
};

const requestFile = async () => {
  if (props.method === "postFile") {
    await axios
      .post(props.url, props.body, {
        responseType: "arraybuffer",
        headers: props.params,
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/zip",
        });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "Muestras.zip"); // any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
        return true;
      });
  } else {
    await axios
      .get(props.url, {
        responseType: "arraybuffer",
        headers: props.params,
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/zip",
        });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "Muestras.zip"); // any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
        return true;
      });
  }
  data.value = [];
};

const requestPDF = async (year) => {
  await axios
    .post(props.url, props.body, {
      responseType: "blob",
      headers: props.params,
    })
    .then((response) => {
      downloadPDF(response, `Informe PDF - ${year}.pdf`);
      return true;
    });
};

const downloadPDF = (pdf, name) => {
  const urlFile = window.URL.createObjectURL(pdf.data);
  const link = document.createElement("a");
  link.href = urlFile;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

const setDefaultValues = () => {
  error.value = false;
  data.value = null;
};
</script>

<template>
  <div></div>
</template>
