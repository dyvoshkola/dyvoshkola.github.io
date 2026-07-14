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

  if (props.clickable) {
    return 'button'
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
      `DyvoBadge--${type}`,
      `DyvoBadge--${size}`,
      {
        'DyvoBadge--interactive': isInteractive,
        'DyvoBadge--disabled': disabled
      }
    ]"
    :href="tagName === 'a' ? href : undefined"
    :type="tagName === 'button' ? 'button' : undefined"
    :disabled="tagName === 'button' ? disabled : undefined"
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

<style scoped>
.DyvoBadge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
}

.DyvoBadge--interactive {
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
}

.DyvoBadge--interactive:hover {
  opacity: 0.92;
}

.DyvoBadge--interactive:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.DyvoBadge--interactive:active {
  transform: translateY(1px);
}

.DyvoBadge--disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.DyvoBadge--xs {
  padding: 0.125rem 0.375rem;
  font-size: 0.625rem;
  line-height: 0.875rem;
}

.DyvoBadge--sm {
  padding: 0.1875rem 0.5rem;
  font-size: 0.6875rem;
  line-height: 1rem;
}

.DyvoBadge--md {
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  line-height: 1.125rem;
}

.DyvoBadge--lg {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.DyvoBadge--info {
  background: #eef4ff;
  border-color: #cddcff;
  color: #2447a5;
}

.DyvoBadge--tip {
  background: #edf9f1;
  border-color: #bfe8cc;
  color: #16643a;
}

.DyvoBadge--warning {
  background: #fff6e8;
  border-color: #ffd79a;
  color: #9a5a00;
}

.DyvoBadge--danger {
  background: #fff0f0;
  border-color: #f0b7b7;
  color: #a12828;
}

.DyvoBadge--success {
  background: #eaf8ee;
  border-color: #b8e2c4;
  color: #17603a;
}

.DyvoBadge--neutral {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
}

.DyvoBadge--brand {
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, white);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, white);
  color: var(--vp-c-brand-1);
}

.dark .DyvoBadge--brand {
  background: color-mix(in srgb, var(--vp-c-brand-1) 20%, black);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 42%, black);
}

.DyvoBadge__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.DyvoBadge__label {
  display: inline-flex;
  align-items: center;
}
</style>
