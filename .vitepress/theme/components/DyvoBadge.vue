<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeClass } from 'vue'

defineOptions({
  inheritAttrs: false
})

type DyvoBadgeColor =
  | 'info'
  | 'tip'
  | 'warning'
  | 'danger'
  | 'success'

type DyvoBadgeVariant = 'soft' | 'accent' | 'solid' | 'outline' | 'plain'

type DyvoBadgeSize = 'extra-small' | 'small' | 'medium' | 'large'

type DyvoBadgeState = 'interactive' | 'disabled'

const badgeColors = ['info', 'tip', 'warning', 'danger', 'success'] as const
const badgeVariants = ['soft', 'accent', 'solid', 'outline', 'plain'] as const
const badgeSizes = ['extra-small', 'small', 'medium', 'large'] as const
const badgeStates = ['interactive', 'disabled'] as const

const attrs = useAttrs()

const props = withDefaults(defineProps<{
  text?: string
  color?: DyvoBadgeColor
  variant?: DyvoBadgeVariant
  size?: DyvoBadgeSize
  image?: string
  href?: string
  clickable?: boolean
  disabled?: boolean
}>(), {
  text: '',
  color: 'tip',
  variant: 'soft',
  size: 'medium',
  image: '',
  href: undefined,
  clickable: false,
  disabled: false
})

const classTokens = computed(() => {
  const raw = normalizeClass(attrs.class)
  return raw
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
})

const classColor = computed(() => (
  classTokens.value.find((token): token is DyvoBadgeColor => (
    (badgeColors as readonly string[]).includes(token)
  ))
))

const classVariant = computed(() => (
  classTokens.value.find((token): token is DyvoBadgeVariant => (
    (badgeVariants as readonly string[]).includes(token)
  ))
))

const classSize = computed(() => (
  classTokens.value.find((token): token is DyvoBadgeSize => (
    (badgeSizes as readonly string[]).includes(token)
  ))
))

const classStates = computed(() => (
  classTokens.value.filter((token): token is DyvoBadgeState => (
    (badgeStates as readonly string[]).includes(token)
  ))
))

const resolvedColor = computed(() => classColor.value ?? props.color)
const resolvedVariant = computed(() => classVariant.value ?? props.variant)
const resolvedSize = computed(() => classSize.value ?? props.size)
const resolvedDisabled = computed(() => (
  classStates.value.includes('disabled') || props.disabled
))
const forcedInteractive = computed(() => classStates.value.includes('interactive'))

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})

const tagName = computed(() => {
  if (props.href && !resolvedDisabled.value) {
    return 'a'
  }

  return 'span'
})

const isInteractive = computed(() => (
  (Boolean(props.href) || props.clickable || forcedInteractive.value) && !resolvedDisabled.value
))
</script>

<template>
  <component
    :is="tagName"
    v-bind="forwardedAttrs"
    class="dyvo-badge"
    :class="[
      resolvedColor,
      resolvedVariant,
      resolvedSize,
      {
        interactive: isInteractive,
        disabled: resolvedDisabled
      }
    ]"
    :href="tagName === 'a' ? href : undefined"
    :aria-disabled="resolvedDisabled || undefined"
  >
    <span v-if="image || $slots.image" class="dyvo-badge-image" aria-hidden="true">
      <slot name="image">
        <img :src="image" alt="" />
      </slot>
    </span>
    <span class="dyvo-badge-label">
      <slot>{{ text }}</slot>
    </span>
  </component>
</template>

<style>
.dyvo-badge {
  --dyvo-badge-padding-x: var(--dyvo-badge-medium-padding-x, 10px);
  --dyvo-badge-line-height: var(--dyvo-badge-medium-line-height, 22px);
  display: inline-flex;
  align-items: center;
  gap: var(--dyvo-badge-gap, 6px);
  border: var(--dyvo-badge-border-width, 1px) solid transparent;
  border-radius: var(--dyvo-badge-radius, 9999px);
  padding: var(--dyvo-badge-padding-y, 0) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-font-size, 12px);
  font-weight: var(--dyvo-badge-font-weight, 500);
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  overflow: hidden;
  border-color: var(--dyvo-badge-border-color, transparent);
  color: var(--dyvo-badge-text-color, var(--vp-c-text-1));
  background-color: var(--dyvo-badge-bg-color, transparent);
}

.dyvo-badge.small {
  --dyvo-badge-padding-x: var(--dyvo-badge-small-padding-x, 6px);
  --dyvo-badge-line-height: var(--dyvo-badge-small-line-height, 18px);
  padding: var(--dyvo-badge-small-padding-y, 0) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-small-font-size, 10px);
}

.dyvo-badge.extra-small {
  --dyvo-badge-padding-x: var(--dyvo-badge-extra-small-padding-x, 4px);
  --dyvo-badge-line-height: var(--dyvo-badge-extra-small-line-height, 16px);
  padding: var(--dyvo-badge-extra-small-padding-y, 0) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-extra-small-font-size, 9px);
}

.dyvo-badge.medium {
  --dyvo-badge-padding-x: var(--dyvo-badge-medium-padding-x, 10px);
  --dyvo-badge-line-height: var(--dyvo-badge-medium-line-height, 22px);
  padding: var(--dyvo-badge-padding-y, 0) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-font-size, 12px);
}

.dyvo-badge.large {
  --dyvo-badge-padding-x: var(--dyvo-badge-large-padding-x, 12px);
  --dyvo-badge-line-height: var(--dyvo-badge-large-line-height, 26px);
  padding: var(--dyvo-badge-large-padding-y, 0) var(--dyvo-badge-padding-x);
  line-height: var(--dyvo-badge-line-height);
  font-size: var(--dyvo-badge-large-font-size, var(--vp-custom-block-font-size, 14px));
}

.dyvo-badge.interactive {
  cursor: pointer;
  transition:
    opacity var(--dyvo-badge-transition-duration, 0.15s) ease,
    box-shadow var(--dyvo-badge-transition-duration, 0.15s) ease;
}

.dyvo-badge.interactive:hover {
  opacity: var(--dyvo-badge-hover-opacity, 0.92);
}

.dyvo-badge.interactive:focus-visible {
  outline: var(--dyvo-badge-focus-outline-width, 2px) solid var(--dyvo-badge-focus-outline-color, var(--vp-c-brand-1));
  outline-offset: var(--dyvo-badge-focus-outline-offset, 2px);
}

.dyvo-badge.disabled {
  cursor: not-allowed;
  opacity: var(--dyvo-badge-disabled-opacity, 0.55);
}

.dyvo-badge-image {
  display: inline-flex;
  flex: 0 0 auto;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin-block: calc(-1 * var(--dyvo-badge-border-width, 1px));
  margin-inline-start: calc(-1 * var(--dyvo-badge-padding-x));
}

.dyvo-badge-image img {
  display: block;
  height: var(--dyvo-badge-line-height);
  max-width: none;
  width: auto;
  border-radius: 50%;
}

.dyvo-badge-label {
  display: inline-flex;
  align-items: center;
}

.dyvo-badge.soft {
  --dyvo-badge-text-color: var(--dyvo-badge-soft-text-color, var(--vp-c-text-1));
  --dyvo-badge-bg-color: var(--dyvo-badge-soft-bg-color, transparent);
  --dyvo-badge-border-color: var(--dyvo-badge-soft-border-color, transparent);
}

.dyvo-badge.accent {
  --dyvo-badge-text-color: var(--dyvo-badge-accent-text-color, var(--dyvo-badge-soft-text-color, var(--vp-c-text-1)));
  --dyvo-badge-bg-color: var(--dyvo-badge-accent-bg-color, var(--dyvo-badge-soft-bg-color, transparent));
  --dyvo-badge-border-color: var(--dyvo-badge-accent-border-color, var(--dyvo-badge-outline-border-color, var(--dyvo-badge-accent-text-color, transparent)));
}

.dyvo-badge.solid {
  --dyvo-badge-text-color: var(--dyvo-badge-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-bg-color: var(--dyvo-badge-solid-bg-color, var(--vp-c-text-1));
  --dyvo-badge-border-color: var(--dyvo-badge-solid-border-color, var(--dyvo-badge-solid-bg-color, transparent));
}

.dyvo-badge.outline {
  --dyvo-badge-text-color: var(--dyvo-badge-outline-text-color, var(--vp-c-text-1));
  --dyvo-badge-bg-color: var(--dyvo-badge-outline-bg-color, transparent);
  --dyvo-badge-border-color: var(--dyvo-badge-outline-border-color, var(--dyvo-badge-outline-text-color, transparent));
}

.dyvo-badge.plain {
  border-width: 0;
  border-radius: 0;
  padding: 0;
  --dyvo-badge-text-color: var(--dyvo-badge-plain-text-color, var(--vp-c-text-1));
  --dyvo-badge-bg-color: var(--dyvo-badge-plain-bg-color, transparent);
  --dyvo-badge-border-color: var(--dyvo-badge-plain-border-color, transparent);
}

.dyvo-badge.plain .dyvo-badge-image {
  margin-inline-start: 0;
}

.dyvo-badge.info {
  --dyvo-badge-soft-text-color: var(--dyvo-badge-info-text-color, var(--vp-badge-info-text, var(--vp-c-text-1)));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-info-bg-color, var(--vp-badge-info-bg, var(--vp-c-default-soft)));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-info-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-info-accent-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-info-accent-bg-color, var(--dyvo-badge-soft-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-info-accent-border-color, var(--dyvo-badge-info-border-color, var(--dyvo-badge-soft-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-info-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-info-solid-bg-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-info-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-info-outline-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-info-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-info-outline-border-color, var(--dyvo-badge-info-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-info-plain-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-info-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-info-plain-border-color, transparent);
}

.dyvo-badge.tip {
  --dyvo-badge-soft-text-color: var(--dyvo-badge-tip-text-color, var(--vp-badge-tip-text, var(--vp-c-tip-1)));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-tip-bg-color, var(--vp-badge-tip-bg, var(--vp-c-tip-soft)));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-tip-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-tip-accent-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-tip-accent-bg-color, var(--dyvo-badge-soft-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-tip-accent-border-color, var(--dyvo-badge-tip-border-color, var(--dyvo-badge-soft-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-tip-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-tip-solid-bg-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-tip-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-tip-outline-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-tip-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-tip-outline-border-color, var(--dyvo-badge-tip-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-tip-plain-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-tip-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-tip-plain-border-color, transparent);
}

.dyvo-badge.warning {
  --dyvo-badge-soft-text-color: var(--dyvo-badge-warning-text-color, var(--vp-badge-warning-text, var(--vp-c-warning-1)));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-warning-bg-color, var(--vp-badge-warning-bg, var(--vp-c-warning-soft)));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-warning-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-warning-accent-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-warning-accent-bg-color, var(--dyvo-badge-soft-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-warning-accent-border-color, var(--dyvo-badge-warning-border-color, var(--dyvo-badge-warning-outline-text-color, #b87400)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-warning-solid-text-color, #5f3b00);
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-warning-solid-bg-color, #f2c14e);
  --dyvo-badge-solid-border-color: var(--dyvo-badge-warning-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-warning-outline-text-color, #b87400);
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-warning-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-warning-outline-border-color, var(--dyvo-badge-warning-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-warning-plain-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-warning-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-warning-plain-border-color, transparent);
}

.dyvo-badge.danger {
  --dyvo-badge-soft-text-color: var(--dyvo-badge-danger-text-color, var(--vp-badge-danger-text, var(--vp-c-danger-1)));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-danger-bg-color, var(--vp-badge-danger-bg, var(--vp-c-danger-soft)));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-danger-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-danger-accent-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-danger-accent-bg-color, var(--dyvo-badge-soft-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-danger-accent-border-color, var(--dyvo-badge-danger-border-color, var(--dyvo-badge-soft-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-danger-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-danger-solid-bg-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-danger-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-danger-outline-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-danger-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-danger-outline-border-color, var(--dyvo-badge-danger-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-danger-plain-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-danger-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-danger-plain-border-color, transparent);
}

.dyvo-badge.success {
  --dyvo-badge-soft-text-color: var(--dyvo-badge-success-text-color, var(--vp-c-success-1));
  --dyvo-badge-soft-bg-color: var(--dyvo-badge-success-bg-color, var(--vp-c-success-soft));
  --dyvo-badge-soft-border-color: var(--dyvo-badge-success-soft-border-color, transparent);
  --dyvo-badge-accent-text-color: var(--dyvo-badge-success-accent-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-accent-bg-color: var(--dyvo-badge-success-accent-bg-color, var(--dyvo-badge-soft-bg-color));
  --dyvo-badge-accent-border-color: var(--dyvo-badge-success-accent-border-color, var(--dyvo-badge-success-border-color, var(--dyvo-badge-soft-text-color)));
  --dyvo-badge-solid-text-color: var(--dyvo-badge-success-solid-text-color, var(--vp-c-bg));
  --dyvo-badge-solid-bg-color: var(--dyvo-badge-success-solid-bg-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-solid-border-color: var(--dyvo-badge-success-solid-border-color, var(--dyvo-badge-solid-bg-color));
  --dyvo-badge-outline-text-color: var(--dyvo-badge-success-outline-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-outline-bg-color: var(--dyvo-badge-success-outline-bg-color, transparent);
  --dyvo-badge-outline-border-color: var(--dyvo-badge-success-outline-border-color, var(--dyvo-badge-success-border-color, var(--dyvo-badge-outline-text-color)));
  --dyvo-badge-plain-text-color: var(--dyvo-badge-success-plain-text-color, var(--dyvo-badge-soft-text-color));
  --dyvo-badge-plain-bg-color: var(--dyvo-badge-success-plain-bg-color, transparent);
  --dyvo-badge-plain-border-color: var(--dyvo-badge-success-plain-border-color, transparent);
}

</style>
