export default {
  mounted(el, binding) {
    // eslint-disable-next-line no-undef
    M.Tooltip.init(el, { html: binding.value, position: "left" });
  },
  unmounted(el) {
    // eslint-disable-next-line no-undef
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip && tooltip.destroy) tooltip.destroy();
  },
};
