<script setup lang="ts">
import { computed } from 'vue'

type DyvoBadgeType =
  | 'info'
  | 'tip'
  | 'warning'
  | 'danger'
  | 'success'
  | 'neutral'
  | 'brand'

type DyvoBadgeSize = 'xs' | 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  text?: string
  type?: DyvoBadgeType
  size?: DyvoBadgeSize
  icon?: string
  href?: string
  clickable?: boolean
  disabled?: boolean
}>(), {
  text: '',
  type: 'tip',
  size: 'md',
  icon: '',
  href: undefined,
  clickable: false,
  disabled: false
})

const tagName = computed(() => {
  if (props.href && !props.disabled) {
    return 'a'
  }

  return 'span'
})

const isInteractive = computed(() => (
  (Boolean(props.href) || props.clickable) && !props.disabled
))
</script>

<template>
  <component
    :is="tagName"
    class="DyvoBadge"
    :class="[
      type,
      `DyvoBadge--${type}`,
      `DyvoBadge--${size}`,
      {
        small: size === 'sm',
        'DyvoBadge--interactive': isInteractive,
        'DyvoBadge--disabled': disabled
      }
    ]"
    :href="tagName === 'a' ? href : undefined"
    :aria-disabled="disabled || undefined"
  >
    <span v-if="icon || $slots.icon" class="DyvoBadge__icon" aria-hidden="true">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span class="DyvoBadge__label">
      <slot>{{ text }}</slot>
    </span>
  </component>
</template>

<style>
.DyvoBadge {
  display: inline-flex;
  align-items: center;
  gap: var(--dyvo-badge-gap, 6px);
  margin-left: var(--dyvo-badge-margin-left, 2px);
  border: var(--dyvo-badge-border-width, 1px) solid transparent;
  border-radius: var(--dyvo-badge-radius, 12px);
  padding: var(--dyvo-badge-padding-y, 0) var(--dyvo-badge-padding-x, 10px);
  line-height: var(--dyvo-badge-line-height, 22px);
  font-size: var(--dyvo-badge-font-size, 12px);
  font-weight: var(--dyvo-badge-font-weight, 500);
  transform: translateY(var(--dyvo-badge-translate-y, -2px));
  text-decoration: none;
  white-space: nowrap;
  vertical-align: baseline;
}

.DyvoBadge.small,
.DyvoBadge--sm {
  padding: var(--dyvo-badge-small-padding-y, 0) var(--dyvo-badge-small-padding-x, 6px);
  line-height: var(--dyvo-badge-small-line-height, 18px);
  font-size: var(--dyvo-badge-small-font-size, 10px);
  transform: translateY(var(--dyvo-badge-small-translate-y, -8px));
}

.DyvoBadge--xs {
  padding: var(--dyvo-badge-xs-padding-y, 0) var(--dyvo-badge-xs-padding-x, 4px);
  line-height: var(--dyvo-badge-xs-line-height, 16px);
  font-size: var(--dyvo-badge-xs-font-size, 9px);
  transform: translateY(var(--dyvo-badge-xs-translate-y, -8px));
}

.DyvoBadge--md {
  padding: var(--dyvo-badge-padding-y, 0) var(--dyvo-badge-padding-x, 10px);
  line-height: var(--dyvo-badge-line-height, 22px);
  font-size: var(--dyvo-badge-font-size, 12px);
  transform: translateY(var(--dyvo-badge-translate-y, -2px));
}

.DyvoBadge--lg {
  padding: var(--dyvo-badge-lg-padding-y, 0) var(--dyvo-badge-lg-padding-x, 12px);
  line-height: var(--dyvo-badge-lg-line-height, 26px);
  font-size: var(--dyvo-badge-lg-font-size, var(--vp-custom-block-font-size, 14px));
  transform: translateY(var(--dyvo-badge-lg-translate-y, -2px));
}

.DyvoBadge--interactive {
  cursor: pointer;
  transition:
    opacity var(--dyvo-badge-transition-duration, 0.15s) ease,
    box-shadow var(--dyvo-badge-transition-duration, 0.15s) ease;
}

.DyvoBadge--interactive:hover {
  opacity: var(--dyvo-badge-hover-opacity, 0.92);
}

.DyvoBadge--interactive:focus-visible {
  outline: var(--dyvo-badge-focus-outline-width, 2px) solid var(--dyvo-badge-focus-outline-color, var(--vp-c-brand-1));
  outline-offset: var(--dyvo-badge-focus-outline-offset, 2px);
}

.DyvoBadge--disabled {
  cursor: not-allowed;
  opacity: var(--dyvo-badge-disabled-opacity, 0.55);
}

.DyvoBadge__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: var(--dyvo-badge-icon-line-height, 1);
}

.DyvoBadge__label {
  display: inline-flex;
  align-items: center;
}

.DyvoBadge.info,
.DyvoBadge--info {
  border-color: var(--dyvo-badge-info-border, var(--vp-badge-info-border, transparent));
  color: var(--dyvo-badge-info-text, var(--vp-badge-info-text, var(--vp-c-text-2)));
  background-color: var(--dyvo-badge-info-bg, var(--vp-badge-info-bg, var(--vp-c-default-soft)));
}

.DyvoBadge.tip,
.DyvoBadge--tip {
  border-color: var(--dyvo-badge-tip-border, var(--vp-badge-tip-border, transparent));
  color: var(--dyvo-badge-tip-text, var(--vp-badge-tip-text, var(--vp-c-tip-1)));
  background-color: var(--dyvo-badge-tip-bg, var(--vp-badge-tip-bg, var(--vp-c-tip-soft)));
}

.DyvoBadge.warning,
.DyvoBadge--warning {
  border-color: var(--dyvo-badge-warning-border, var(--vp-badge-warning-border, transparent));
  color: var(--dyvo-badge-warning-text, var(--vp-badge-warning-text, var(--vp-c-warning-1)));
  background-color: var(--dyvo-badge-warning-bg, var(--vp-badge-warning-bg, var(--vp-c-warning-soft)));
}

.DyvoBadge.danger,
.DyvoBadge--danger {
  border-color: var(--dyvo-badge-danger-border, var(--vp-badge-danger-border, transparent));
  color: var(--dyvo-badge-danger-text, var(--vp-badge-danger-text, var(--vp-c-danger-1)));
  background-color: var(--dyvo-badge-danger-bg, var(--vp-badge-danger-bg, var(--vp-c-danger-soft)));
}

.DyvoBadge--success {
  border-color: var(--dyvo-badge-success-border, var(--dyvo-badge-tip-border, var(--vp-badge-tip-border, transparent)));
  color: var(--dyvo-badge-success-text, var(--dyvo-badge-tip-text, var(--vp-badge-tip-text, var(--vp-c-tip-1))));
  background-color: var(--dyvo-badge-success-bg, var(--dyvo-badge-tip-bg, var(--vp-badge-tip-bg, var(--vp-c-tip-soft))));
}

.DyvoBadge--neutral {
  border-color: var(--dyvo-badge-neutral-border, var(--vp-c-divider, #c2c2c4));
  color: var(--dyvo-badge-neutral-text, var(--vp-c-text-2, #6a6a71));
  background-color: var(--dyvo-badge-neutral-bg, var(--vp-c-bg-soft, #f6f6f7));
}

.DyvoBadge--brand {
  border-color: var(--dyvo-badge-brand-border, var(--vp-c-brand-1, #2b50c9));
  color: var(--dyvo-badge-brand-text, var(--vp-c-brand-1, #2b50c9));
  background-color: var(--dyvo-badge-brand-bg, var(--vp-c-brand-soft, rgba(43, 80, 201, 0.14)));
}

.VPDocFooter .DyvoBadge {
  display: none;
}

.vp-doc h1 > .DyvoBadge {
  margin-top: 4px;
  vertical-align: top;
}

.vp-doc h2 > .DyvoBadge {
  margin-top: 3px;
  padding: 0 8px;
  vertical-align: top;
}

.vp-doc h3 > .DyvoBadge {
  vertical-align: middle;
}

.vp-doc h4 > .DyvoBadge,
.vp-doc h5 > .DyvoBadge,
.vp-doc h6 > .DyvoBadge {
  vertical-align: middle;
  line-height: 18px;
}
</style>
